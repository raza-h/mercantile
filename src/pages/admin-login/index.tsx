import { Formik } from "formik";
import Card from "../../common/card";
import styles from "./index.module.scss";
import Input from "../../common/input";
import { Button } from "antd";
import { FC, useState } from "react";
import * as yup from "yup";
import strings from "../../constants/strings";
import { useNavigate } from "react-router-dom";
import { ADMIN_REGISTRATION_LISTING_PATH } from "../../constants/paths";
import { login } from "../../apis/auth";

const Login: FC<{ session: boolean }> = ({ session = false }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (session) navigate(ADMIN_REGISTRATION_LISTING_PATH);
  return (
    <main className={styles.main}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            const authorized = await login(values?.email, values?.password);
            authorized && navigate(ADMIN_REGISTRATION_LISTING_PATH);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        }}
        validationSchema={yup.object().shape({
          email: yup
            .string()
            .email(strings.field_not_valid)
            .required(strings.field_not_valid),
          password: yup.string().required(strings.field_not_valid),
        })}
      >
        {({ values, setFieldValue, errors, touched, handleSubmit }) => (
          <form className={styles.form}>
            <Card title={<center>Admin Login</center>} className={styles.card}>
              <Input
                value={values?.email}
                label={"Email"}
                placeholder={"Enter Email"}
                name={"email"}
                type={"email"}
                onChange={(e) => setFieldValue("email", e.target.value)}
                errorMsg={touched?.email && errors?.email && errors?.email}
              />
              <Input
                value={values?.password}
                label={"Password"}
                placeholder={"Enter Password"}
                name={"password"}
                type={"password"}
                onChange={(e) => setFieldValue("password", e.target.value)}
                errorMsg={
                  touched?.password && errors?.password && errors?.password
                }
              />
              <Button
                type="primary"
                loading={loading}
                onClick={() => handleSubmit()}
              >
                Login
              </Button>
            </Card>
          </form>
        )}
      </Formik>
    </main>
  );
};

export default Login;
