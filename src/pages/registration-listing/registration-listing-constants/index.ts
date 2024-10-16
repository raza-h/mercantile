import { column } from "../../../common/table/constants/types";
import strings from "../../../constants/strings";

export const columns: column[] = [
  {
    title: strings.user,
    dataIndex: strings.user,
    key: strings.user,
  },
  {
    title: strings.status,
    dataIndex: strings.status,
    key: strings.status,
  },
  {
    title: strings.city,
    dataIndex: strings.city,
    key: strings.city,
  },
  {
    title: strings.variant,
    dataIndex: strings.variant,
    key: strings.variant,
  },
  {
    title: strings.interests,
    dataIndex: strings.interests,
    key: strings.interests,
  },
  {
    title: strings.actions,
    dataIndex: strings.actions,
    key: strings.actions,
  },
];

export const statusObjects: {
  [key: string]: { color: string; bg: string; label: string };
} = {
  canceled: { label: "Canceled", color: "#7D241C", bg: "#E74C3C" },
  paid: { label: "Paid", color: "#1E6E34", bg: "#2ECC71" },
  not_responding: { label: "Not Responding", color: "#A16000", bg: "#F39C12" },
  not_interested: { label: "Not Interested", color: "#343A40", bg: "#BDC3C7" },
  already_bought: { label: "Already Bought", color: "#003D7A", bg: "#3498DB" },
  voice_msg: { label: "Voice Message", color: "#4A1F5B", bg: "#8E44AD" },
  follow_up: { label: "Follow Up", color: "#0E4C4E", bg: "#1ABC9C" },
  called: { label: "Called", color: "#C58D00", bg: "#F1C40F" },
  pending: { label: "Pending", color: "#7D4E00", bg: "#D68910" },
};

export const statuses: string[] = [
  "canceled",
  "paid",
  "not_responding",
  "not_interested",
  "already_bought",
  "voice_msg",
  "follow_up",
  "called",
  "pending",
];

export const formatStatusOptions = (statuses: string[]) => {
  return statuses.map((status) => ({
    label: statusObjects[status].label,
    value: status,
    color: statusObjects[status].color,
    bg: statusObjects[status].bg,
  }));
}