import { FC, ReactNode } from "react";
import styles from './index.module.scss';
import cx from 'clsx';

const Group : FC<{ cols?: number, children: ReactNode, className?: string }> = ({ cols = 1, children, className = '' }) => {
  return (
    <section className={cx(styles.group, styles?.[`cols_${cols}`], className)}>
        {children}
    </section>
  )
}

export default Group;