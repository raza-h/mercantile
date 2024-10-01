import { Checkbox, Col, Divider, Flex, Image, Row, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { iphone16 } from "../../assets";
import styles from "./index.module.scss";
import { Formik } from "formik";
import {
  formatOptions,
  getDynamicColorOptions,
  getDynamicStorageOptions,
  interestedOptions,
  models,
  registrationFormInitialValues,
  registrationFormSchema,
} from "./registration-form-constants";
import Group from "../../common/group";
import Input from "../../common/input";
import { getCities } from "../../apis/cities";
import Select from "../../common/select";
import cx from "clsx";
import ErrorMessage from "../../common/error-message";
import Summary from "../../components/summary";
import { registerForInterest } from "../../apis/registrations";
import Card from "../../common/card";
import ProgressButtons from "./progress-buttons";
import { COLOR_HEX } from "../../constants/generic";
import { showErrorToast } from "../../utils.js/common";

const RegistrationForInterest: FC<{}> = () => {
  const [step, setStep] = useState(3);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setInitialLoading(true);
        const cities = await getCities();
        setCities(cities);
      } catch (error: any) {
        showErrorToast({ action: "fetching cities", error });
      } finally {
        setInitialLoading(false);
      }
    };
    fetchCities();
  }, []);

  return (
    <Formik
      initialValues={registrationFormInitialValues}
      validationSchema={registrationFormSchema}
      onSubmit={async (values) => {
        if (step === 1) setStep(2);
        else {
          try {
            setLoading(true);
            await registerForInterest({
              ...values,
              interests: values?.interests?.join(", "),
            });
            setStep(3);
          } catch (error: any) {
            showErrorToast({ action: "registering your interest", error });
          } finally {
            setLoading(false);
          }
        }
      }}
    >
      {({ values, setFieldValue, errors, touched, handleSubmit }) => (
        <form className={styles.form}>
          <section className={styles.imageContainer}>
            <Image src={iphone16} preview={false} width={600} />
          </section>
          {step === 1 && (
            <Card title={"Registration of Interest"}>
              <Group cols={2} className={styles.inputGroup}>
                <Input
                  label="Name"
                  placeholder="Enter Name"
                  name="name"
                  onChange={(e) => {
                    setFieldValue("name", e.target.value);
                  }}
                  value={values?.name!}
                  errorMsg={touched?.name && errors?.name && errors?.email}
                />
                <Input
                  label="Email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                  }}
                  value={values?.email!}
                  errorMsg={touched?.name && errors?.email && errors?.email}
                />
                <Input
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  name="phone"
                  onChange={(e) => {
                    setFieldValue("phone", e.target.value.slice(6));
                  }}
                  value={`(+92) ${values?.phone!}`}
                  errorMsg={touched?.name && errors?.phone && errors?.phone}
                />
                <Select
                  label="City"
                  placeholder="Select City where you want to buy from"
                  loading={initialLoading}
                  name="city"
                  onChange={(e) => {
                    setFieldValue("city", e);
                  }}
                  value={values?.city!}
                  options={formatOptions(cities)}
                  errorMsg={touched?.name && errors?.city && errors?.city}
                />
              </Group>
              <Divider />
              <h3>iPhone 16 Preferences</h3>
              <Group cols={2} className={styles.inputGroup}>
                <Select
                  label="Model"
                  placeholder="Select Model"
                  name="model"
                  onChange={(e) => {
                    setFieldValue("model", e);
                  }}
                  value={values?.model!}
                  options={formatOptions(models)}
                  errorMsg={touched?.name && errors?.model && errors?.model}
                />
                <Select
                  label="Storage"
                  placeholder="Select Storage"
                  name="storage"
                  onChange={(e) => {
                    setFieldValue("storage", e);
                  }}
                  value={values?.storage!}
                  disabled={!values?.model}
                  options={getDynamicStorageOptions(values?.model ?? "")}
                  errorMsg={touched?.name && errors?.storage && errors?.storage}
                />
              </Group>
              <Flex
                gap="1rem"
                justify="space-around"
                style={{ flexWrap: "wrap", marginTop: "3rem" }}
              >
                {values?.model &&
                  getDynamicColorOptions(values?.model).map(
                    ({ label, value }) => {
                      const checked = values?.color === value;
                      return (
                        <Tag.CheckableTag
                          key={value}
                          className={cx(
                            styles.customTag,
                            checked ? styles.selectedTag : ""
                          )}
                          style={{ background: "white" }}
                          checked={checked}
                          onChange={() => {
                            setFieldValue("color", value);
                          }}
                        >
                          <figure className={styles.figure}>
                            <div
                              className={styles.colorContainer}
                              style={{
                                borderColor: checked ? "#0046b5" : "#d9d9d9",
                              }}
                            >
                              <div
                                className={styles.palette}
                                style={{
                                  background: COLOR_HEX[value],
                                }}
                              />
                            </div>
                            <p>{label}</p>
                          </figure>
                        </Tag.CheckableTag>
                      );
                    }
                  )}
              </Flex>
              <ErrorMessage
                name="color"
                errorMsg={touched?.color && errors?.color ? errors?.color : ""}
              />
              <Divider />
              <h3>
                Are you interested in the new Apple Watch Series 10 or AirPods
                4?
              </h3>
              <Checkbox.Group
                onChange={(value) => {
                  setFieldValue("interests", value);
                }}
                style={{ width: "100%", marginTop: "1rem" }}
              >
                <Row className={styles.checkRow}>
                  {interestedOptions?.map((option) => (
                    <Col className={styles.checkContainer} key={option}>
                      <Checkbox value={option}>{option}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
              <ProgressButtons
                step={step}
                setStep={setStep}
                loading={loading}
                handleSubmit={handleSubmit}
              />
            </Card>
          )}
          {step === 2 && (
            <Summary title={"Summary"} values={values}>
              <ProgressButtons
                step={step}
                setStep={setStep}
                loading={loading}
                handleSubmit={handleSubmit}
              />
            </Summary>
          )}
          {step === 3 && (
            <h3 style={{ textAlign: "center" }}>
              Thank You for showing your interest. Your order has been received.
              <br />
              Our representative will be in contact with you shortly.
            </h3>
          )}
        </form>
      )}
    </Formik>
  );
};

export default RegistrationForInterest;
