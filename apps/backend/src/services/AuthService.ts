import { AuthRepository } from "../repositories";
import { createJwt } from "../utils/create-jwt";

type Tokens = {
  jwtToken: string;
  updateToken: string;
};

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async authUser(name: string, password: string): Promise<Tokens> {
    try {
      const userId = await this.authRepository.authUser(name, password);

      if (userId) {
        const tokens = createJwt(userId);
        return tokens;
      } else {
        throw new Error("Not authorized");
      }
    } catch (error) {
      throw error;
    }
  }
}
