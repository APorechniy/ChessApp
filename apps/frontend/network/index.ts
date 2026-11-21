import { api } from "./instance";
import { updateToken } from "../store/auth/thunk/update-token";
import { logout } from "../store/auth/thunk/logout";
import { store } from "../store/store";

type Store = typeof store

let isRefreshing = false;
let failedQueue: Array<{ resolve: () => void; reject: (e: unknown) => void }> = [];

const processQueue = (error: unknown) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error);
        else prom.resolve();
    });
    failedQueue = [];
};

export function attachAuthInterceptor(store: Store) {
    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            if (error.response?.status !== 401 || originalRequest._retry) {
                return Promise.reject({
                    status: error.response?.status,
                    data: error.response?.data,
                    message: error.message,
                    isAxiosError: true,
                    originalError: error,
                });
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(() => api(originalRequest))
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const resultAction = await store.dispatch(updateToken());
                if (updateToken.fulfilled.match(resultAction)) {
                    processQueue(null);
                    return api(originalRequest);
                }
                throw new Error('Refresh failed');
            } catch (refreshError) {
                processQueue(refreshError);
                store.dispatch(logout());
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
    );
}

export default api;
export { api };