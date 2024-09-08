import supabaseClient, { supabaseUrl } from "../utils/superbase";

// post an application
export const applyToJob = async (token, _, jobData) => {
  const supabase = await supabaseClient(token);

  const random = Math.floor(Math.random() * 9000);

  const fileName = `resume-${random}-${jobData.candidate_id}`;

  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error uploading resume: ", storageError);
    return;
  }

  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  const { data, error } = await supabase
    .from("applications")
    .insert([{ ...jobData, resume }])
    .select();

  if (error) {
    console.error("Error to upload data: ", error);
    return;
  }

  return data;
};

// update application status
export const updateApplications = async (token, { job_id }, status) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("job_id", job_id)
    .select();

  if (error || data.length === 0) {
    console.error("Error updating application status: ", error);
    return;
  }

  return data;
};

// get user applications
export const getUserApplications = async (token, { user_id }) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title,company: companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching applications: ", error);
    return;
  }

  return data;
};
