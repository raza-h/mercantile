import { PAGE_SIZE } from "../constants/generic";
import { showErrorToast, showSuccessToast } from "../utils/common";
import emailjs from "emailjs-com";
import getSupabaseClient from '../auth';

const table = "registrations";

export const sendConfirmationEmailToAdmin = async (payload: {
  name: string;
  email: string;
  phone: string | number;
}) => {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE,
      {
        message: `A new registration has been made by ${payload.name} from ${payload.email} with phone number ${payload.phone}.`,
      },
      import.meta.env.VITE_EMAIL_USER_ID
    );
  } catch (error: any) {
    showErrorToast({ action: "sending confirmation email", error });
  }
};

export const sendConfirmationEmailToUser = async (payload: {
  name: string;
  email: string;
}) => {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_USER_EMAIL_TEMPLATE,
      {
        email: payload?.email,
        to_name: payload?.name,
      },
      import.meta.env.VITE_EMAIL_USER_ID
    );
  } catch (error: any) {
    showErrorToast({ action: "sending confirmation email", error });
  }
};

export const registerForInterest = async (payload: { [key: string]: any }) => {
  try {
    const supabase = await getSupabaseClient();
    const res = await supabase.from(table).insert(payload);
    await sendConfirmationEmailToAdmin({
      name: payload?.name,
      email: payload?.email,
      phone: payload?.phone,
    });
    await sendConfirmationEmailToUser({
      name: payload?.name,
      email: payload?.email,
    });
    return res;
  } catch (error: any) {
    showErrorToast({
      action:
        "registering your interest. Please verify the details and try again.",
      error,
    });
  }
};

export const fetchTotalCount = async () => {
  try {
    const supabase = await getSupabaseClient();
    const { count, error } = await supabase
      .from(table)
      .select("*", { count: "exact" });

    if (error) throw error;
    return count;
  } catch (error: any) {
    showErrorToast({
      action: "fetching some details about the registrations",
      error,
    });
    return 0;
  }
};

export const getRegistrations = async (page: number = 1) => {
  const from = PAGE_SIZE * (page - 1);
  const to = from + PAGE_SIZE - 1;
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .range(from, to)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  } catch (error: any) {
    showErrorToast({ action: "fetching registrations", error });
    return [];
  }
};

export const getRegistrationStatus = async (id: string | number) => {
  try {
    const supabase = await getSupabaseClient();
    const { data, error } = await supabase.from(table).select("*").eq("id", id);
    if (error) throw error;
    return data?.length ? data[0]?.status : undefined;
  } catch (error: any) {
    showErrorToast({ action: "fetching registrations", error });
    return undefined;
  }
};

export const updateRegistrationStatus = async (
  id: string | number,
  payload: { [key: string]: any }
) => {
  try {
    const supabase = await getSupabaseClient();
    const { error } = await supabase.from(table).update(payload).eq("id", id);

    if (error) {
      throw error;
    } else {
      showSuccessToast({ message: "Status updated successfully" });
      return true;
    }
  } catch (error: any) {
    showErrorToast({ action: "updating registration status", error });
    return false;
  }
};
