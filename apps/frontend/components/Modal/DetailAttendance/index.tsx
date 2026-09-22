import { useAppSelector } from "../../../store/store"
import { MainAttendance } from "./main-attendance";
import { PresetAttendance } from "./preset-attendance";

export const DetailAttendance = () => {
    const { selectedAttendance } = useAppSelector(({ attendance }) => attendance);

    if (selectedAttendance) {
        if ('isPreset' in selectedAttendance) {
            return <PresetAttendance selectedAttendance={selectedAttendance} />
        } else {
            return <MainAttendance selectedAttendance={selectedAttendance} />
        }
    } else {
        return null
    }
}