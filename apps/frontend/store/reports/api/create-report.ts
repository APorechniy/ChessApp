import { api } from "../../../axios";
import type { Report } from "../types";
import { getFilenameFromHeader } from "../../../utils/get-filename-from-header";

export type CreateReportParams = {
    studentId: string,
}

type Response = {
    currentReport: Report
}

type CreateReport = ({ studentId }: CreateReportParams) => Promise<Response>;

const createReport: CreateReport = async ({ studentId }) => {
    const response = await api.post(`/reports/`, {
        studentId: studentId
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

export default createReport;
