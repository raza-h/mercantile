import supabase from "../auth";
import { showErrorToast, showSuccessToast } from "../utils.js/common";

export const login = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    !!data?.user && showSuccessToast({ message: "Log in successful" });
    return !!data?.user;
  } catch (error: any) {
    showErrorToast({action: 'log in', error});
    return false;
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return !!data.session;
  } catch (error: any) {
    showErrorToast({action: 'authentication', error});
    return false;
  }
};
