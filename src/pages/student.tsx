import { MdArrowBack } from "@react-icons/all-files/md/MdArrowBack";
import { useFormik } from "formik";
import { HeadFC, navigate, PageProps } from "gatsby";
import { default as React, useEffect, useMemo, useState } from "react";
import { Else, If, Then, When } from "react-if";
import * as Yup from "yup";
import CpfInput from "../components/Form/CpfInput";
import PhoneInput from "../components/Form/PhoneInput";
import SEO from "../components/SEO";
import { useFirestoreFind } from "../hooks/useFirestoreFind";
import backgroundImage from "../images/background.jpg";
import AuthLayout from "../layouts/Auth";
import { createFirestoreDoc, updateFirestoreDoc } from "../services/firestore";
import swal from "../services/swal";

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
    cpf: Yup.string()
        .required("O CPF do aluno é obrigatório")
        .min(14, "Insira um CPF valido")
        .max(14, "Numero do CPF muito longo"),
    whatsapp: Yup.string()
        .required("O WhatsApp do aluno é obrigatório")
        .matches(/[\d()+\s]*/, "Insira apenas números")
        .min(20, "Insira um WhatsApp valido")
        .max(20, "Numero do WhatsApp muito longo"),
    lastPayment: Yup.date().required(
        "A data do último pagamento é obrigatória"
    ),
    paidToday: Yup.boolean(),
});

const Student: React.FC<PageProps> = (props) => {
    const id = useMemo(
        () => props.location.search.replace(/\?id=(.*?)&?/, "$1"),
        [props.location]
    );
    //* hooks
    const data = useFirestoreFind("students", id);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            if (!maySubmit) return;

            if (id) {
                updateFirestoreDoc("students", id, {
                    ...values,
                    updatedAt: new Date(),
                });

                swal.fire({
                    title: "Aluno atualizado com sucesso!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#4e4e4e",
                    color: "#fff",
                }).then(() => {
                    navigate("/students");
                });
            } else {
                createFirestoreDoc("students", {
                    ...values,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                swal.fire({
                    title: "Aluno criado com sucesso!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#4e4e4e",
                    color: "#fff",
                }).then(() => {
                    navigate("/students");
                });
            }
        },
    });

    //* states
    const [maySubmit, setMaySubmit] = useState(true);

    //* constants

    //* handlers

    //* effects
    useEffect(() => {
        if (data) {
            formik.setValues({ ...formik.values, ...data });
        }
    }, [data]);

    useEffect(() => {
        if (id) {
            const _maySubmit =
                JSON.stringify({
                    name: formik.values.name,
                    cpf: formik.values.cpf,
                    whatsapp: formik.values.whatsapp,
                    plan: formik.values.plan,
                    lastPayment: formik.values.lastPayment,
                }) !==
                JSON.stringify({
                    name: data?.name,
                    cpf: data?.cpf,
                    whatsapp: data?.whatsapp,
                    plan: data?.plan,
                    lastPayment: data?.lastPayment,
                });

            if (maySubmit !== _maySubmit) {
                setMaySubmit(_maySubmit);
            }
        } else {
            const _maySubmit =
                JSON.stringify(formik.values) !== JSON.stringify(initialValues);

            if (maySubmit !== _maySubmit) {
                setMaySubmit(_maySubmit);
            }
        }
    }, [formik.values]);

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
            <img
                src={backgroundImage}
                alt=""
                className="absolute opacity-5 h-full w-full saturate-0 object-cover"
            />
            <button
                type="submit"
                onClick={() => navigate("/students")}
                className="text-2xl z-10 absolute top-0 left-0 m-4 cursor-pointer p-2 rounded-full text-primary hover:text-text-dark hover:bg-primary transition-colors duration-300 ease-in-out"
            >
                <MdArrowBack />
            </button>
            <div className="flex flex-col z-10 w-96 p-5 max-h-full overflow-y-auto">
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
                        disabled={!maySubmit}
                        className="text-text-dark bg-primary hover:bg-primary-dark disabled:hover:bg-primary disabled:opacity-70 focus:ring-4 focus:outline-none focus:ring-primary-light font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary-dark transition-colors duration-300 ease-in-out"
                    >
                        <If condition={!!id}>
                            <Then>
                                <span>Atualizar Aluno</span>
                            </Then>

                            <Else>
                                <span>Cadastrar Aluno</span>
                            </Else>
                        </If>
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
