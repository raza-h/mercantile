import supabase from "../auth";

export const login = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return !!data?.user;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    console.log(data);
    if (error) throw error;
    return !!data.session;
  } catch (err) {
    console.error(err);
    return false;
  }
};
