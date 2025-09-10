import * as yup from "yup";
import strings from "../../../constants/strings";
import { dynamicOption, selectOption } from "./types";
import { Registration } from "../../../types/registration";

export const registrationFormInitialValues: Omit<Registration, 'interests' | 'status'> & { interests: Array<string> } = {
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
  email: yup
    .string()
    .email(strings.field_not_valid)
    .required(strings.field_not_valid),
  phone: yup
    .number()
    .integer()
    .required(strings.field_not_valid)
    .typeError(strings.field_not_valid)
    .test("is-correct-format", strings.field_not_valid, (value) =>
      /^03\d{9}$/.test(`0${value.toString()}`)
    ),
  city: yup.string().required(strings.field_not_valid),
  model: yup.string().required(strings.field_not_valid),
  storage: yup.string().required(strings.field_not_valid),
  color: yup.string().required("Please select a color"),
  interests: yup.array(),
});

export const storage: string[] = ["128 GB", "256 GB", "512 GB", "1 TB"];

export const interestedOptions: string[] = [
  "Apple Watch Series 11",
  "Apple Watch SE 3",
  "Apple Watch Ultra 3",
  "AirPods Pro 3",
];

export const models: string[] = [
  "iPhone 17",
  "iPhone 17 Air",
  "iPhone 17 Pro",
  "iPhone 17 Pro Max",
];

export const formatOptions: (options: string[]) => selectOption[] = (options) =>
  options.map((option) => ({ label: option, value: option }));

export const formatDynamicOptions: (options: dynamicOption[]) => selectOption[] = (
  options
) => options.filter(({ show }) => show).map(({ label }) => ({ label, value: label }));

export const getDynamicStorageOptions = (model: string) => {
  const storage: dynamicOption[] = [
    {
      label: "256 GB",
      show: [models[0], models[1], models[2], models[3]].includes(model),
    },
    { label: "512 GB", show: true },
    { label: "1 TB", show: true },
    { label: "2 TB", show: [models[2], models[3]].includes(model) },
  ];

  return formatDynamicOptions(storage);
};

export const getDynamicColorOptions = (model: string) => {
  const showBase: boolean = [models[0]].includes(model);
  const showAir: boolean = [models[1]].includes(model);
  const showPro: boolean = [models[2], models[3]].includes(model);

  const colors: dynamicOption[] = [
    {
      label: "Black",
      show: showBase,
    },
    {
      label: "White",
      show: showBase,
    },
    {
      label: "Lavender",
      show: showBase,
    },
    {
      label: "Mist Blue",
      show: showBase,
    },
    {
      label: "Sage",
      show: showBase,
    },
    {
      label: "Cosmic Orange",
      show: showPro,
    },
    {
      label: "Deep Blue",
      show: showPro,
    },
    {
      label: "Silver",
      show: showPro,
    },
    {
      label: "Sky Blue",
      show: showAir,
    },
    {
      label: "Light Gold",
      show: showAir,
    },
    {
      label: "Cloud White",
      show: showAir,
    },
    {
      label: "Space Black",
      show: showAir,
    },
  ];

  return formatDynamicOptions(colors);
};
