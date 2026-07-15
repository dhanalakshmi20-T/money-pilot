import { AuthUser } from "./auth-user";

export interface RegisterResponse {
    success: boolean;
    message: string;
    user: AuthUser;
}
