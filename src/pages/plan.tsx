import { MdArrowBack } from "@react-icons/all-files/md/MdArrowBack";
import { useFormik } from "formik";
import { HeadFC, PageProps, navigate } from "gatsby";
import React from "react";
import SEO from "../components/SEO";
import AuthLayout from "../layouts/Auth";

type iFormData = {
    name: string;
    value: number;
    recurrence: string;
};

const initialValues: iFormData = {
    name: "",
    value: 0,
    recurrence: "",
};

const recurrences: Record<string, string> = {
    monthly: "Mensal",
    quarterly: "Trimestral",
    yearly: "Anual",
};

const Plan: React.FC<PageProps> = () => {
    //* hooks
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    //* states

    //* constants

    //* handlers

    //* effects

    //* render
    return (
        <AuthLayout>
            <div className="flex flex-col md:relative w-96 p-5">
                <button
                    type="submit"
                    onClick={() => navigate("/plans")}
                    className="text-2xl absolute top-0 left-0 md:translate-x-[-100%] md:translate-y-[-100%] m-4 md:m-0 cursor-pointer p-2 rounded-full text-blue-700 hover:text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out"
                >
                    <MdArrowBack />
                </button>
                <h1 className="mb-2 text-2xl">Cadastro de Plano</h1>
                <hr className="mb-4" />
                <form noValidate onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            required
                        />
                        <label
                            htmlFor="name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nome do Plano
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="number"
                            name="value"
                            id="value"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formik.values.value}
                            onChange={formik.handleChange}
                            required
                        />
                        <label
                            htmlFor="value"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Valor da Recorrência
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <select
                            name="recurrence"
                            id="recurrence"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            value={formik.values.recurrence}
                            onChange={formik.handleChange}
                            required
                        >
                            <option value="" disabled>
                                Selecione um tipo de recorrência
                            </option>
                            {Object.entries(recurrences).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="recurrence"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Tipo de Recorrência
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-colors duration-300 ease-in-out"
                    >
                        Criar
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Plan;

export const Head: HeadFC = () => <SEO />;
