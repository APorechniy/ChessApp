import { api } from "../../../axios";
import type { Report } from "../types";
import { getFilenameFromHeader } from "../../../utils/get-filename-from-header";

export type CreateCoachReportParams = {
    coachId: string,
}

type Response = {
    currentReport: Report
}

type CreateCoachReport = ({ coachId }: CreateCoachReportParams) => Promise<Response>;

const createCoachReport: CreateCoachReport = async ({ coachId }) => {
    const response = await api.post(`/coach-reports/`, {
        coachId: coachId
    }, {
        headers: {

        },
        responseType: "blob"
    });

    return {
        currentReport: {
            reportFile: response.data,
            reportFileName: getFilenameFromHeader(response.headers['content-disposition'])
        }
    }
};

export default createCoachReport;
