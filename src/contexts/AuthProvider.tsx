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
import {
    AuthContext as AuthContextType,
    SignIn,
} from "../@types/Contexts/AuthContext";
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
    const signIn: SignIn = useCallback(
        (email, password, remember) => {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setUser(userCredential.user);

                    if (remember) {
                        localStorage.setItem("remember", "true");
                    }
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
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (localStorage.getItem("remember") === "true") {
                setUser(user);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

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
