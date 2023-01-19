import { UserCredential } from "firebase/auth";

export type AuthContext = {
    user: UserCredential["user"] | null;
    signIn: (email: string, password: string) => void;
}
