import supabase from "../auth";
import { PAGE_SIZE } from "../constants/generic";

export const registerForInterest = async (payload: Object) => {
  try {
    const res = await supabase.from("registrations").insert(payload);
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const fetchTotalCount = async () => {
  try {
    const { count, error } = await supabase
      .from("registrations")
      .select("*", { count: "exact" });

    if (error) throw error;
    return count;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

export const getRegistrations = async (page: number = 1) => {
  const from = PAGE_SIZE * (page - 1);
  const to = from + PAGE_SIZE - 1;
  try {
    const { data, error } = await supabase.from("registrations").select("*").range(from, to);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
