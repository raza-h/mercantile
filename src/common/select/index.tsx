import { Select as AntdSelect } from 'antd';
import { ChangeEventHandler, FC } from 'react';
import styles from './index.module.scss';
import ErrorMessage from '../error-message';
import cx from 'clsx';

const Select: FC<{ label: string, value: any, onChange: ChangeEventHandler<HTMLInputElement>, name?: string, type?: string, errorMsg?: string | null | false, [key: string]: any }> = ({ label = '', value = undefined, onChange, name = label.toLowerCase(), type = 'text', errorMsg = null, options = [], ...props }) => {
  return (
    <article className={styles.inputBlock}>
        <label className={styles.label} htmlFor={name}>{label}</label>
        <AntdSelect options={options} onChange={onChange} value={value} className={cx(styles.input, errorMsg ? styles.errorBorder : '')} showSearch={true} {...props} />
        <ErrorMessage errorMsg={errorMsg ? errorMsg : ''} name={name} className={styles.errorMsg} />
    </article>
  )
}

export default Select