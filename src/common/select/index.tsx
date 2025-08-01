import { Select as AntdSelect, SelectProps } from "antd";
import { ChangeEvent, ChangeEventHandler, FC } from "react";
import styles from "./index.module.scss";
import ErrorMessage from "../error-message";
import cx from "clsx";
import { FormikErrorMessage } from "../../types/formik";

const Select: FC<
  SelectProps & {
    label: string;
    value: ChangeEvent<HTMLInputElement> | string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    name?: string;
    errorMsg?: FormikErrorMessage;
  }
> = ({
  label = "",
  value = undefined,
  onChange,
  name = label.toLowerCase(),
  errorMsg = null,
  options = [],
  ...props
}) => {
  return (
    <article className={styles.inputBlock}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <AntdSelect
        options={options}
        onChange={onChange}
        value={value}
        className={cx(styles.input, errorMsg ? styles.errorBorder : "")}
        showSearch={true}
        {...props}
      />
      <ErrorMessage
        errorMsg={typeof errorMsg === 'string' && errorMsg ? errorMsg : ""}
        name={name}
        className={styles.errorMsg}
      />
    </article>
  );
};

export default Select;
