import supabase from "../auth";
import { PAGE_SIZE } from "../constants/generic";
import { showErrorToast } from "../utils.js/common";

const table = "sorted_registrations";

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
    const { data, error } = await supabase.from(table).select("*").range(from, to);
    if (error) throw error;
    return data;
  } catch (error: any) {
    showErrorToast({action: 'fetching registrations', error});
    return [];
  }
};
