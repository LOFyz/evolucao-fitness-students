import type { HeadFC, PageProps } from "gatsby";
import * as React from "react";
import SEO from "../components/SEO";
import AuthLayout from "../layouts/Auth";
import GlobalLayout from "../layouts/Global";

const Login: React.FC<PageProps> = () => {
    return (
        <GlobalLayout>
            <AuthLayout>
                <div>hello world</div>
            </AuthLayout>
        </GlobalLayout>
    );
};

export default Login;

export const Head: HeadFC = () => <SEO />;
