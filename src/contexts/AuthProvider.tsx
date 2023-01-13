import { PageProps, navigate } from "gatsby";
import React, {
    createContext,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import { When } from "react-if";

export const AuthContext = createContext({});

type AuthProviderProps = {
    children: React.ReactNode;
    pageProps: PageProps;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
    children,
    pageProps: { location },
}) => {
    //* hooks

    //* states
    const [user, setUser] = useState(null);

    //* constants
    const value = useMemo(() => ({ user }), [user]);

    //* effects

    useLayoutEffect(() => {
        if (!user && location.pathname !== "/") {
            navigate("/");
        } else if (user && location.pathname === "/") {
            navigate("/students");
        }
    }, [user]);

    //* render
    return (
        <When condition={!!user || location.pathname === "/"}>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </When>
    );
};
