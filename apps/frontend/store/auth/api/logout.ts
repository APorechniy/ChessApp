import { api } from "../../../network/instance";

type Response = unknown;

type Logout = () => Promise<Response>;

const logout: Logout = async () => {
    const response = await api.get(`/auth/logout`, {
        headers: {
            "Content-Type": "application/json",
        }
    });

    return response.data;
};

export default logout;
