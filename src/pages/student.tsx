import { MdArrowBack } from "@react-icons/all-files/md/MdArrowBack";
import { useFormik } from "formik";
import { HeadFC, PageProps, navigate } from "gatsby";
import React, { useEffect } from "react";
import { When } from "react-if";
import * as Yup from "yup";
import CpfInput from "../components/Form/CpfInput";
import PhoneInput from "../components/Form/PhoneInput";
import SEO from "../components/SEO";
import AuthLayout from "../layouts/Auth";

type iFormData = {
    name: string;
    cpf: string;
    whatsapp: string;
    plan: string;
    lastPayment: string;
    paidToday?: boolean;
};

const initialValues: iFormData = {
    name: "",
    cpf: "",
    whatsapp: "",
    plan: "",
    lastPayment: new Date().toISOString().slice(0, 10),
    paidToday: false,
};

const validationSchema = Yup.object({
    name: Yup.string().required("O nome do aluno é obrigatório"),
    cpf: Yup.string().required("O CPF do aluno é obrigatório"),
    whatsapp: Yup.string()
        .required("O WhatsApp do aluno é obrigatório")
        .matches(/[\d()+\s]*/, "Insira apenas números")
        .min(20, "Insira um WhatsApp valido")
        .max(20, "Numero do WhatsApp muito longo"),
    plan: Yup.string().required("O plano do aluno é obrigatório"),
    lastPayment: Yup.date().required(
        "A data do último pagamento é obrigatória"
    ),
    paidToday: Yup.boolean(),
});

const Student: React.FC<PageProps> = (props) => {
    //* hooks
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    //* states

    //* constants

    //* handlers

    //* effects
    useEffect(() => {
        if (formik.values.paidToday) {
            formik.setFieldValue(
                "lastPayment",
                new Date().toISOString().slice(0, 10)
            );
        }
    }, [formik.values.paidToday]);

    //* render
    return (
        <AuthLayout pageProps={props}>
            <div className="flex flex-col md:relative w-96 p-5">
                <button
                    type="submit"
                    onClick={() => navigate("/students")}
                    className="text-2xl absolute top-0 left-0 md:translate-x-[-100%] md:translate-y-[-100%] m-4 md:m-0 cursor-pointer p-2 rounded-full text-primary hover:text-text-dark hover:bg-primary transition-colors duration-300 ease-in-out"
                >
                    <MdArrowBack />
                </button>
                <h1 className="mb-2 text-2xl text-primary">
                    Cadastro de Aluno
                </h1>
                <hr className="mb-4 border-background-light" />
                <form noValidate onSubmit={formik.handleSubmit}>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                            placeholder=" "
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        <label
                            htmlFor="name"
                            className="peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Nome do Aluno
                        </label>
                        <When
                            condition={
                                formik.touched.name && formik.errors.name
                            }
                        >
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {formik.errors.name}
                            </p>
                        </When>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <CpfInput
                            type="text"
                            name="cpf"
                            id="cpf"
                            className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                            placeholder=" "
                            value={formik.values.cpf}
                            onChange={formik.handleChange}
                        />
                        <label
                            htmlFor="cpf"
                            className="peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Cadastro de Pessoa Física - CPF
                        </label>
                        <When
                            condition={formik.touched.cpf && formik.errors.cpf}
                        >
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {formik.errors.cpf}
                            </p>
                        </When>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <PhoneInput
                                name="whatsapp"
                                id="whatsapp"
                                className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                                placeholder=" "
                                value={formik.values.whatsapp}
                                onChange={formik.handleChange}
                            />
                            <label
                                htmlFor="whatsapp"
                                className="peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                WhatsApp
                            </label>
                            <When
                                condition={
                                    formik.touched.whatsapp &&
                                    formik.errors.whatsapp
                                }
                            >
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {formik.errors.whatsapp}
                                </p>
                            </When>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <select
                                name="plan"
                                id="plan"
                                className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                                placeholder=" "
                                value={formik.values.plan}
                                onChange={formik.handleChange}
                            >
                                <option
                                    value=""
                                    disabled
                                    className="text-primary bg-background-light"
                                >
                                    Selecione um plano
                                </option>
                            </select>
                            <label
                                htmlFor="plan"
                                className="peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Plano
                            </label>
                            <When
                                condition={
                                    formik.touched.plan && formik.errors.plan
                                }
                            >
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    {formik.errors.plan}
                                </p>
                            </When>
                        </div>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            type="date"
                            name="lastPayment"
                            id="lastPayment"
                            className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer disabled:opacity-50 color-scheme-dark"
                            placeholder=" "
                            value={formik.values.lastPayment}
                            onChange={formik.handleChange}
                            disabled={formik.values.paidToday}
                        />
                        <label
                            htmlFor="lastPayment"
                            className={`peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${
                                formik.values.paidToday
                                    ? "opacity-50"
                                    : "opacity-100"
                            }`}
                        >
                            Ultimo pagamento
                        </label>
                        <When
                            condition={
                                formik.touched.lastPayment &&
                                formik.errors.lastPayment
                            }
                        >
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {formik.errors.lastPayment}
                            </p>
                        </When>
                    </div>
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input
                                id="paidToday"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 border border-background-light rounded bg-gray-50 focus:ring-3 focus:ring-primary-light dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                checked={formik.values.paidToday}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <label
                            htmlFor="paidToday"
                            className="ml-2 text-sm font-medium text-text dark:text-background-light"
                        >
                            Pagou hoje
                        </label>
                        <When
                            condition={
                                formik.touched.paidToday &&
                                formik.errors.paidToday
                            }
                        >
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {formik.errors.paidToday}
                            </p>
                        </When>
                    </div>
                    <button
                        type="submit"
                        className="text-text-dark bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary-dark transition-colors duration-300 ease-in-out"
                    >
                        Criar
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Student;

export const Head: HeadFC = () => (
    <SEO title="Evolução Fitness - Cadastrando Aluno" />
);
