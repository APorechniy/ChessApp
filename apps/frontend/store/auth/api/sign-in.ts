import { api } from "../../../axios";

export type SignInParams = {
  username: string,
  password: string
}

type SignIn = ({ username, password }: SignInParams) => Promise<Response>;

const signIn: SignIn = async ({ username, password }) => {
  const response = await api.post(`/auth/sign-in`,
    { username, password },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
};

export default signIn;
