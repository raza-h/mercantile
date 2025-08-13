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
  "Apple Watch Series 10",
  "AirPods 4",
];

export const models: string[] = [
  "iPhone 16",
  "iPhone 16 Plus",
  "iPhone 16 Pro",
  "iPhone 16 Pro Max",
];

export const formatOptions: (options: string[]) => selectOption[] = (options) =>
  options.map((option) => ({ label: option, value: option }));

export const formatDynamicOptions: (options: dynamicOption[]) => selectOption[] = (
  options
) => options.filter(({ show }) => show).map(({ label }) => ({ label, value: label }));

export const getDynamicStorageOptions = (model: string) => {
  const storage: dynamicOption[] = [
    {
      label: "128 GB",
      show: [models[0], models[1], models[2]].includes(model),
    },
    { label: "256 GB", show: true },
    { label: "512 GB", show: true },
    { label: "1 TB", show: [models[2], models[3]].includes(model) },
  ];

  return formatDynamicOptions(storage);
};

export const getDynamicColorOptions = (model: string) => {
  const showBase: boolean = [models[0], models[1]].includes(model); 
  const showPro: boolean = [models[2], models[3]].includes(model); 

  const colors: dynamicOption[] = [
    {
      label: "Ultramarine",
      show: showBase,
    },
    {
      label: "Teal",
      show: showBase
    },
    {
      label: "Pink",
      show: showBase,
    },
    {
      label: "White",
      show: showBase,
    },
    {
      label: "Black",
      show: showBase,
    },
    {
      label: "Desert Titanium",
      show: showPro,
    },
    {
      label: "Natural Titanium",
      show: showPro,
    },
    {
      label: "White Titanium",
      show: showPro,
    },
    {
      label: "Black Titanium",
      show: showPro,
    },
  ];

  return formatDynamicOptions(colors);
};
