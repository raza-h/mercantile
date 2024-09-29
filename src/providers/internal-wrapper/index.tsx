import { FC, ReactNode } from "react";
import Header from "../../components/header";
import { Content } from "antd/es/layout/layout";
import styles from './index.module.scss';

const InternalWrapper : FC<{children: ReactNode}> = ({ children }) => {
  return (
    <>
        <Header />
        <Content className={styles.container}>
            {children}
        </Content>
    </>
  )
}

export default InternalWrapper;