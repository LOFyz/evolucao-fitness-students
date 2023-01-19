import {
    UserCredential,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { navigate } from "gatsby";
import React, {
    createContext,
    useCallback,
    useContext,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import { When } from "react-if";
import { AuthContext as AuthContextType } from "../@types/Contexts/AuthContext";
import swal from "../services/swal";

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    //* hooks

    //* states
    const [user, setUser] = useState<UserCredential["user"] | null>(null);

    //* constants

    //* handlers
    const signIn = useCallback(
        (email: string, password: string) => {
            const auth = getAuth();
            const res = signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setUser(userCredential.user);
                })
                .catch((error) => {
                    swal.fire({
                        title: "Erro ao realizar operação!",
                        html: error.message,
                        icon: "error",
                        timer: 3000,
                    });
                });
        },
        [signInWithEmailAndPassword, getAuth]
    );

    //* effects
    useLayoutEffect(() => {
        if (!user && window.location.pathname !== "/") {
            navigate("/");
        } else if (user && window.location.pathname === "/") {
            navigate("/students");
        }
    }, [user]);

    const value = useMemo(() => ({ user, signIn }), [user, signIn]);

    //* render
    return (
        <When condition={!!user || window.location.pathname === "/"}>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </When>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("Use auth must be used inside auth provider");
    }
    return context;
};
