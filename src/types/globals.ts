import { JwtPayload } from "jsonwebtoken";

export interface jwtData extends JwtPayload{
    id: number;
    email: string;
    password: string;
}