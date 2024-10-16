import supabase from "../auth";
import { PAGE_SIZE } from "../constants/generic";
import { showErrorToast, showSuccessToast } from "../utils/common";

const table = "registrations";

export const registerForInterest = async (payload: Object) => {
  try {
    const res = await supabase.from(table).insert(payload);
    return res;
  } catch (error: any) {
    showErrorToast({ action: "registering your interest. Please verify the details and try again.", error });
  }
};

export const fetchTotalCount = async () => {
  try {
    const { count, error } = await supabase
      .from(table)
      .select("*", { count: "exact" });

    if (error) throw error;
    return count;
  } catch (error: any) {
    showErrorToast({action: 'fetching some details about the registrations', error});
    return 0;
  }
};

export const getRegistrations = async (page: number = 1) => {
  const from = PAGE_SIZE * (page - 1);
  const to = from + PAGE_SIZE - 1;
  try {
    const { data, error } = await supabase.from(table).select("*").range(from, to).order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  } catch (error: any) {
    showErrorToast({action: 'fetching registrations', error});
    return [];
  }
};

export const getRegistrationStatus = async (id: string | number) => {
  try {
    const { data, error } = await supabase.from(table).select("*").eq("id", id);
    if (error) throw error;
    return data?.length ? data[0]?.status : undefined;
  } catch (error: any) {
    showErrorToast({action: 'fetching registrations', error});
    return undefined;
  }
}

export const updateRegistrationStatus = async (id: string | number, payload: { [key: string]: any }) => {
  try {
    const { error } = await supabase
    .from(table)
    .update(payload) 
    .eq('id', id);

    if (error) {
      throw error;
    } else {
      showSuccessToast({ message: "Status updated successfully" });
      return true;
    }
  } catch(error: any) {
    showErrorToast({action: 'updating registration status', error});
    return false;
  }
};