import { FC } from "react"
import styles from './index.module.scss'
import { ErrorMessage as FormikErrorMessage } from "formik"
import cx from 'clsx';

const ErrorMessage : FC<{name: string, errorMsg: string, className?: string}> = ({name = '', errorMsg = '', className = ''}) => {
  return (
    <FormikErrorMessage name={name} component={() => <small className={cx(styles.errorMsg, className)}>{errorMsg}</small>} />
  )
}

export default ErrorMessage;