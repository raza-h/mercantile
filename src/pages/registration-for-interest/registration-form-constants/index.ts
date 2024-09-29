import * as yup from "yup";
import strings from "../../../constants/strings";
import registrationForm from "./types";

export const registrationFormInitialValues: registrationForm = {
  name: "",
  email: "",
  phone: "",
  city: undefined,
  model: undefined,
  storage: undefined,
  color: undefined,
  interests: [],
};

export const registrationFormSchema = yup.object().shape({
  name: yup.string().required(strings.field_not_valid),
  email: yup.string().email(strings.field_not_valid).required(strings.field_not_valid),
  phone: yup
    .number()
    .integer()
    .required(strings.field_not_valid)
    .typeError(strings.field_not_valid)
    .test('is-correct-format', strings.field_not_valid, (value) => /^03\d{9}$/.test(`0${value.toString()}`)),
  city: yup.string().required(strings.field_not_valid),
  model: yup.string().required(strings.field_not_valid),
  storage: yup.string().required(strings.field_not_valid),
  color: yup.string().required("Please select a color"),
  interests: yup.array(),
});

export const storage: string[] = ["128 GB", "256 GB", "512 GB", "1 TB"];
export const interestedOptions: string[] = ["Apple Watch Series 10", "AirPods 4"];
export const colors: string[] = [
    "Ultramarine",
    "Teal",
    "Pink",
    "White",
    "Black",
];
export const models: string[] = [
  "iPhone 16",
  "iPhone 16 Plus",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
];

export const formatOptions: (
  options: string[]
) => { label: string; value: string }[] = (options) =>
  options.map((option) => ({ label: option, value: option }));

export const getDynamicStorageOptions = (model: string) => {
  const storage: { label: string; show: boolean }[] = [
    {
      label: "128 GB",
      show: [models[0], models[1], models[2]].includes(model),
    },
    { label: "256 GB", show: true },
    { label: "512 GB", show: true },
    { label: "1 TB", show: [models[2], models[3]].includes(model) },
  ];

  return formatOptions(
    storage.filter(({ show }) => show).map(({ label }) => label)
  );
};
