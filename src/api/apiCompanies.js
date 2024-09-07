import supabaseClient, { supabaseUrl } from "../utils/superbase";

// get companies
export const getCompanies = async (token) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("Error fetching companies: ", error);
    return;
  }

  return data;
};

// post a company
export const addNewCompany = async (token, _, companyData) => {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 9000);

  const companyName = `logo-${random}-${companyData.name}`;

  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(companyName, companyData.logo);

  if (storageError) {
    console.error("Error uploading company logo: ", storageError);
    return;
  }

  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${companyName}`;

  const { data, error } = await supabase
    .from("companies")
    .insert([{ name: companyData.name, logo_url }])
    .select();

  if (error) {
    console.error("Error adding a company: ", error);
    return;
  }

  return data;
};
