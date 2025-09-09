import { FC, ReactNode } from "react";
import Header from "../../components/header";
import { Content } from "antd/es/layout/layout";
import styles from './index.module.scss';
import cx from 'clsx';

const InternalWrapper : FC<{children: ReactNode, className?: string}> = ({ children, className }) => {
  return (
    <>
        <Header />
        <Content className={cx(styles.container, className)}>
            {children}
        </Content>
    </>
  )
}

export default InternalWrapper;