import { FormikValues } from "formik";
import { FC, ReactNode } from "react";
import Group from "../../common/group";
import styles from "./index.module.scss";
import { Divider, Flex } from "antd";
import Card from "../../common/card";
import { COLOR_HEX } from "../../constants/generic";

const Summary: FC<{
  title?: string;
  values?: FormikValues;
  children?: ReactNode;
}> = ({ title = "", values = {}, children = <></> }) => {
  const {
    name = "",
    email = "",
    phone = "",
    city = "",
    model = "",
    storage = "",
    color = "",
    interests = [],
    pta_status = 'PTA',
  } = values;

  return (
    <Card title={title}>
      <Group cols={2} className={styles.summary}>
        <Group cols={2}>
          <h3>Personal Details</h3>
          <p className={styles.break} />
          <h4>Name</h4>
          <p>{name}</p>
          <h4>Email</h4>
          <p>{email}</p>
          <h4>Phone</h4>
          <p>{phone}</p>
          <h4>City</h4>
          <p>{city}</p>
        </Group>
        <Group cols={2}>
          <h3>Specifications</h3>
          <p className={styles.break} />
          <h4>Model</h4>
          <p>{model} {`(${pta_status})`}</p>
          <h4>Storage</h4>
          <p>{storage}</p>
          <h4>Color</h4>
          <Flex gap={8}>
            <p
              style={{
                background: COLOR_HEX[color],
                width: "1rem",
                height: "1rem",
                borderRadius: "5px",
                border: "1px solid black",
              }}
            />
            {color}
          </Flex>
        </Group>
      </Group>
      <Divider />
      <h3>Interested In</h3>
      <p>{interests.join(", ") || "None"}</p>
      {children}
    </Card>
  );
};

export default Summary;
