import { FormikErrors } from "formik";

export type FormikErrorMessage = string | false | string[] | FormikErrors<unknown> | FormikErrors<unknown>[] | undefined

export type FormRef = { submit: () => void } | null;