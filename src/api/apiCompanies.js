import supabaseClient from "../utils/superbase";

export const getCompanies = async (token) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("Error fetching companies: ", error);
    return;
  }

  return data;
};
