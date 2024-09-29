import { FC, ReactNode } from "react";
import styles from "./index.module.scss";
import cx from "clsx";

const Card: FC<{
  title: string | ReactNode;
  children: ReactNode;
  className?: string;
}> = ({ title = "", children = <></>, className = "" }) => {
  return (
    <section className={cx(styles.card, className)}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </section>
  );
};

export default Card;
