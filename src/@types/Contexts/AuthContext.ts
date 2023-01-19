import { UserCredential } from "firebase/auth";

export type AuthContext = {
    user: User;
    signIn: SignIn;
};

export type User = UserCredential["user"] | null;

export type SignIn = (
    email: string,
    password: string,
    remember?: boolean
) => void;
