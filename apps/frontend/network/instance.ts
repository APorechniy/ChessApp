import axios from "axios";
import { localToUtc } from "../utils/local-to-utc";

export const CURRENT_SERVER = process.env.NEXT_PUBLIC_API_HOST

export const api = axios.create({
    baseURL: CURRENT_SERVER,
    timeout: 5000,
    withCredentials: true
});

api.interceptors.request.use((request) => {
    const utcDate = localToUtc(new Date().toISOString());
    if (utcDate) request.headers['Local-Datetime'] = utcDate;
    return request;
});