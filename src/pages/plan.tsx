import { MdArrowBack } from "@react-icons/all-files/md/MdArrowBack";
import { useFormik } from "formik";
import { HeadFC, navigate, PageProps } from "gatsby";
import React, { useEffect, useMemo, useState } from "react";
import { Else, If, Then, When } from "react-if";
import * as Yup from "yup";
import SEO from "../components/SEO";
import { useFirestoreFind } from "../hooks/useFirestoreFind";
import backgroundImage from "../images/background2.jpg";
import AuthLayout from "../layouts/Auth";
import { createFirestoreDoc, updateFirestoreDoc } from "../services/firestore";
import swal from "../services/swal";

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

const validationSchema = Yup.object({
    name: Yup.string().required("O nome do plano é obrigatório"),
    value: Yup.number().required("O valor do plano é obrigatório"),
    recurrence: Yup.string().required(
        "O tipo de recorrência do plano é obrigatório"
    ),
});
export const recurrences: Record<string, string> = {
    monthly: "Mensal",
    bimonthly: "Bimestral",
    quarterly: "Trimestral",
    semiannual: "Semestral",
    annual: "Anual",
};

const Plan: React.FC<PageProps> = (props) => {
    const id = useMemo(
        () => props.location.search.replace(/\?id=(.*?)&?/, "$1"),
        [props.location]
    );
    //* hooks
    const data = useFirestoreFind("plans", id);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            if (!maySubmit) return;

            if (id) {
                updateFirestoreDoc("plans", id, {
                    ...values,
                    updatedAt: new Date().toISOString().slice(0, 10),
                });

                swal.fire({
                    title: "Plano atualizado com sucesso!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#4e4e4e",
                    color: "#fff",
                }).then(() => {
                    navigate("/plans");
                });
            } else {
                createFirestoreDoc("plans", {
                    ...values,
                    subscribers: 0,
                    createdAt: new Date().toISOString().slice(0, 10),
                    updatedAt: new Date().toISOString().slice(0, 10),
                });

                swal.fire({
                    title: "Plano criado com sucesso!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                    background: "#4e4e4e",
                    color: "#fff",
                }).then(() => {
                    navigate("/plans");
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
            //TODO: replace mock with data
            const _maySubmit =
                JSON.stringify({
                    name: formik.values.name,
                    value: formik.values.value,
                    recurrence: formik.values.recurrence,
                }) !==
                JSON.stringify({
                    name: data?.name,
                    value: data?.value,
                    recurrence: data?.recurrence,
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

    //* render
    return (
        <AuthLayout pageProps={props}>
            <img
                src={backgroundImage}
                alt=""
                className="absolute opacity-10 h-full w-full saturate-0 object-cover"
            />
            <button
                type="submit"
                onClick={() => navigate("/plans")}
                className="text-2xl z-10 absolute top-0 left-0 m-4 cursor-pointer p-2 rounded-full text-primary hover:text-text-dark hover:bg-primary transition-colors duration-300 ease-in-out"
            >
                <MdArrowBack />
            </button>
            <div className="flex flex-col z-10 w-96 p-5 max-h-full overflow-y-auto">
                <h1 className="mb-2 text-2xl text-primary">
                    Cadastro de Plano
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
                            Nome do Plano
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
                        <input
                            type="number"
                            name="value"
                            id="value"
                            className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer"
                            placeholder=" "
                            value={formik.values.value}
                            onChange={formik.handleChange}
                        />
                        <label
                            htmlFor="value"
                            className="peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Valor da Recorrência
                        </label>
                        <When
                            condition={
                                formik.touched.value && formik.errors.value
                            }
                        >
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {formik.errors.value}
                            </p>
                        </When>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <select
                            name="recurrence"
                            id="recurrence"
                            className="block py-2.5 px-0 w-full text-sm text-text bg-transparent border-0 border-b-2 border-background-light appearance-none dark:text-text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-primary peer color-scheme-dark"
                            placeholder=" "
                            value={formik.values.recurrence}
                            onChange={formik.handleChange}
                        >
                            <option
                                value=""
                                disabled
                                className="text-text bg-background-light opacity-75"
                            >
                                Selecione um tipo de recorrência
                            </option>
                            {Object.entries(recurrences).map(([key, value]) => (
                                <option
                                    key={key}
                                    value={key}
                                    className="text-primary bg-background-light"
                                >
                                    {value}
                                </option>
                            ))}
                        </select>
                        <label
                            htmlFor="recurrence"
                            className="peer-focus:font-medium absolute text-sm text-text dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Tipo de Recorrência
                        </label>
                        <When
                            condition={
                                formik.touched.recurrence &&
                                formik.errors.recurrence
                            }
                        >
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                {formik.errors.recurrence}
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
                                <span>Atualizar Plano</span>
                            </Then>

                            <Else>
                                <span>Cadastrar Plano</span>
                            </Else>
                        </If>
                    </button>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Plan;

export const Head: HeadFC = () => (
    <SEO title="Evolução Fitness - Cadastrando Plano" />
);
