import { Checkbox, Col, Divider, Flex, Image, Tag } from "antd";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Formik } from "formik";
import {
  formatOptions,
  getDynamicColorOptions,
  getDynamicStorageOptions,
  interestedOptions,
  models,
  PTA_STATUSES,
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
import { showErrorToast } from "../../utils/common";
import { iphone17 } from "../../assets";
import Radio from "../../common/radio-group";

const RegistrationForInterest: FC<PropsWithChildren> = () => {
  const [step, setStep] = useState(1);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setInitialLoading(true);
        const cities = await getCities();
        setCities(cities);
      } catch (error: unknown) {
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
            const res = await registerForInterest({
              ...values,
              status: "pending",
              interests: values.interests.join(", "),
            });
            if (!res?.error) {
              setStep(3);
            }
          } catch (error: unknown) {
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
            <Image src={iphone17} preview={false} />
          </section>
          {step === 1 && (
            <Card className={styles.card} title={"Registration of Interest"}>
              <Group cols={2} className={styles.inputGroup}>
                <Input
                  label="Name"
                  placeholder="Enter Name"
                  name="name"
                  onChange={(e) => {
                    setFieldValue("name", e.target.value);
                  }}
                  value={values.name!}
                  errorMsg={touched?.name && errors?.name && errors?.email}
                />
                <Input
                  label="Email"
                  placeholder="Enter Email"
                  name="email"
                  onChange={(e) => {
                    setFieldValue("email", e.target.value);
                  }}
                  value={values.email!}
                  errorMsg={touched?.name && errors?.email && errors?.email}
                />
                <Input
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  name="phone"
                  onChange={(e) => {
                    setFieldValue("phone", e.target.value.slice(6));
                  }}
                  value={`(+92) ${values.phone!}`}
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
                  value={values.city!}
                  options={formatOptions(cities)}
                  errorMsg={touched?.name && errors?.city && errors?.city}
                />
              </Group>
              <Divider />
              <h3>iPhone 17 Preferences</h3>
              <Group cols={2} className={styles.inputGroup}>
                <Select
                  label="Model"
                  placeholder="Select Model"
                  name="model"
                  onChange={async (e) => {
                    await setFieldValue("model", e);
                    await setFieldValue("storage", undefined);
                    setFieldValue("color", undefined);
                  }}
                  value={values.model!}
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
                  value={values.storage!}
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
                          style={{ background: "transparent" }}
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
              <Radio
                value={values?.pta_status}
                options={PTA_STATUSES}
                onChange={(e) => {
                  setFieldValue("pta_status", e?.target?.value);
                }}
                className={styles?.radio}
              />
              {!!values?.model && (
                <ErrorMessage
                  name="color"
                  errorMsg={
                    touched?.color && errors?.color ? errors?.color : ""
                  }
                />
              )}
              <Divider />
              <h3>
                Are you interested in the new Apple Watch Series 11, Apple Watch
                SE 3, Apple Watch Ultra 3, or AirPods Pro 3?
              </h3>
              <Checkbox.Group
                onChange={(value) => {
                  setFieldValue("interests", value);
                }}
                style={{ width: "100%", marginTop: "1rem" }}
                value={values?.interests}
              >
                <Group cols={2} className={styles.checkRow}>
                  {interestedOptions?.map((option) => (
                    <Col
                      className={styles.checkContainer}
                      key={option}
                      onClick={() => {
                        setFieldValue(
                          "interests",
                          values?.interests?.includes(option)
                            ? values.interests.filter((item) => item !== option)
                            : [...values.interests!, option]
                        );
                      }}
                    >
                      <Checkbox
                        value={option}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {option}
                      </Checkbox>
                    </Col>
                  ))}
                </Group>
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
            <Card title={"Registration Recorded"}>
              <h3 style={{ textAlign: "center" }}>
                Thank You for showing your interest. Your order has been
                received.
                <br />
                Our representative will be in contact with you shortly.
              </h3>
            </Card>
          )}
        </form>
      )}
    </Formik>
  );
};

export default RegistrationForInterest;
