import { type Repository, type DataSource } from "typeorm";
import { AttendancePreset } from "@/entities/attendance-preset.entity";
import { AttendancePresetView } from "@/entities/attendance-preset-view.entity";

export class AttendancePresetRepository {
    private tableRepo: Repository<AttendancePreset>;
    private viewRepo: Repository<AttendancePresetView>;

    constructor(dataSource: DataSource) {
        this.tableRepo = dataSource.getRepository(AttendancePreset);
        this.viewRepo = dataSource.getRepository(AttendancePresetView);
    }

    private isDateMatchesRRule(
        rruleStr: string,
        dateStr: string,
    ): boolean {
        try {
            // Парсим правило
            const startDate = rruleStr.slice(8, 16);

            const days = rruleStr.split("BYDAY=")[1].split(',')

            const date = new Date(dateStr);
            const weekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
            return days.includes(weekdays[date.getUTCDay()]) && startDate < dateStr.split('-').join("")
        } catch (error) {
            console.error('Ошибка парсинга RRule:', error);
            return false;
        }
    }

    async getAttendancePresetsList() {
        const attendancePresetsList = await this.viewRepo.find();

        return attendancePresetsList;
    }

    async getAttendancePresetsByDate(searchDate: string) {
        const attendancePresetsList = await this.viewRepo.createQueryBuilder("apv")
            .where("apv.endDate >= :searchDate", { searchDate })
            .andWhere("NOT JSON_CONTAINS(excludedDates, JSON_QUOTE(:searchDate))", { searchDate })
            .getMany();
        const filteredPresetsList = attendancePresetsList.filter(ap => ap.rrule && this.isDateMatchesRRule(ap.rrule, searchDate))

        return filteredPresetsList;
    }

    async createAttendancePreset(attendancePreset: AttendancePreset) {
        const createdAttendancePreset = this.tableRepo.create(attendancePreset);

        return Boolean(await this.tableRepo.save(createdAttendancePreset));
    }

    async addExcludedDate(attendancePresetId: string, excludedDate: string) {
        const isUpdated = await this.tableRepo.update({ id: attendancePresetId }, {
            excludedDates: () => `JSON_ARRAY_APPEND(excluded_dates, '$', '${excludedDate}')`
        })

        return Boolean(isUpdated)
    }

    async updateAttendancePreset(attendancePreset: AttendancePreset) {
        const isUpdated = await this.tableRepo.update({ id: attendancePreset.id }, attendancePreset)

        return Boolean(isUpdated);
    }

    async removeAttendancePreset(attendancePresetId: string) {
        const isDeleted = await this.tableRepo.delete({ id: attendancePresetId })

        return Boolean(isDeleted);
    }
}
