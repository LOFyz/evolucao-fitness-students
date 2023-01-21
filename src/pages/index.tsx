import { useFormik } from "formik";
import type { HeadFC, PageProps } from "gatsby";
import React from "react";
import { When } from "react-if";
import * as Yup from "yup";
import SEO from "../components/SEO";
import { useAuth } from "../contexts/AuthProvider";
import AuthLayout from "../layouts/Auth";

type iFormData = {
    email: string;
    password: string;
    keepSignedIn: boolean;
};

const initialValues: iFormData = {
    email: "",
    password: "",
    keepSignedIn: false,
};

const validationSchema = Yup.object({
    email: Yup.string().required("O email é obrigatório"),
    password: Yup.string().required("A senha é obrigatória"),
    keepSignedIn: Yup.boolean(),
});

const Login: React.FC<PageProps> = (props) => {
    //* hooks
    const { signIn } = useAuth();
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            signIn(values.email, values.password, values.keepSignedIn);
        },
    });

    //* render
    return (
        <AuthLayout pageProps={props}>
            <form
                className="w-80 p-5"
                noValidate
                onSubmit={formik.handleSubmit}
            >
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                        placeholder=" "
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>

                    <When
                        condition={formik.touched.email && formik.errors.email}
                    >
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {formik.errors.email}
                        </p>
                    </When>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                        placeholder=" "
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>
                    <When
                        condition={
                            formik.touched.password && formik.errors.password
                        }
                    >
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {formik.errors.password}
                        </p>
                    </When>
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input
                            id="keepSignedIn"
                            type="checkbox"
                            value=""
                            className="w-4 h-4 border border-background-light rounded bg-gray-50 focus:ring-3 focus:ring-primary-light dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                            checked={formik.values.keepSignedIn}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <label
                        htmlFor="keepSignedIn"
                        className="ml-2 text-sm font-medium text-text dark:text-background-light"
                    >
                        Manter autenticado
                    </label>
                    <When
                        condition={
                            formik.touched.keepSignedIn &&
                            formik.errors.keepSignedIn
                        }
                    >
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            {formik.errors.keepSignedIn}
                        </p>
                    </When>
                </div>
                <button
                    type="submit"
                    className="text-text-dark bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary-dark"
                >
                    Enviar
                </button>
            </form>
        </AuthLayout>
    );
};

export default Login;

export const Head: HeadFC = () => <SEO title="Evolução Fitness" />;
