import axios from "axios";
import { localToUtc } from "../utils/local-to-utc";
import { store } from "../store/store";
import { updateToken } from "../store/auth/thunk/update-token";
import { logout } from "../store/auth/thunk/logout";

// const isCypress = () => {
//     return typeof window !== 'undefined' && window.Cypress !== undefined;
// };

// const cypressToken = "fjfslkdjflksdjf372y7yfds"

export const CURRENT_SERVER = process.env.NEXT_PUBLIC_API_HOST

export const api = axios.create({
    baseURL: CURRENT_SERVER,
    timeout: 5000,
    withCredentials: true
})

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

api.interceptors.request.use(
    (request) => {
        const utcDate = localToUtc(new Date().toISOString());

        if (utcDate) {
            request.headers['Local-Datetime'] = utcDate;
        }

        // if (isCypress()) {
        //     request.headers['X-Cypress-Auth'] = cypressToken;
        //     request.headers['Cookie'] =
        //         `jwt-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        //         .eyJpZCI6IjlkMWZhMmMzLTlhMGYtNGI3ZS05OGQ5LTZhZG
        //         RiZGNmNmIxYyIsImlhdCI6MTUxNjIzOTAyMiwiZXhwIjoxO
        //         DA2OTY5NjAwfQ.HZGqUxzb7OLIpHxhsu639ew1nGcf68z14
        //         1koLxfnelc; update-token=eyJhbGciOiJIUzI1NiIsIn
        //         R5cCI6IkpXVCJ9.eyJpZCI6IjlkMWZhMmMzLTlhMGYtNGI3
        //         ZS05OGQ5LTZhZGRiZGNmNmIxYyIsImlhdCI6MTUxNjIzOTA
        //         yMiwiZXhwIjoxODA2OTY5NjAwfQ.HZGqUxzb7OLIpHxhsu6
        //         39ew1nGcf68z141koLxfnelc`
        // }

        return request;
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Если ошибка не 401 или запрос уже повторялся (чтобы избежать цикла)
        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject({
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                isAxiosError: true,
                originalError: error,
            });
        }

        // Если уже обновляем токен - ставим запрос в очередь
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
            })
                .then(() => {
                    return api(originalRequest);
                })
                .catch(err => Promise.reject(err));
        }

        // Если это первый упавший запрос — инициируем обновление
        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const resultAction = await store.dispatch(updateToken());

            if (updateToken.fulfilled.match(resultAction)) {
                processQueue(null);

                return api(originalRequest);
            } else {
                throw new Error('Refresh failed');
            }
        } catch (refreshError) {
            // Если рефреш упал — чистим очередь и кикаем пользователя
            processQueue(refreshError);
            store.dispatch(logout());

            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);