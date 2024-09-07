import supabaseClient from "../utils/superbase";

// get all he jobs
export const getJobs = async (token, { location, company_id, searchQuery }) => {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company: companies(name,logo_url), saved: saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs: ", error);
    return;
  }

  return data;
};

// get single job
export const getSingleJob = async (token, { job_id }) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select(
      "*, company: companies(name,logo_url), applications: applications(*)"
    )
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error fetching Job: ", error);
    return;
  }

  return data;
};

// post new job
export const addNewJob = async (token, _, jobData) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error("Error creating Job: ", error);
    return;
  }

  return data;
};

// update job hiring status
export const updateHiringStatus = async (token, { job_id }, isOpen) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error updating Job: ", error);
    return;
  }

  return data;
};

// add/remove from saved jobs
export const saveJob = async (token, { alreadySaved }, saveData) => {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error deleting Saved Jobs: ", deleteError);
      return;
    }

    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error inserting data to Saved Jobs: ", insertError);
      return;
    }

    return data;
  }
};

// get saved jobs
export const getSavedJobs = async (token) => {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*,company: companies(name,logo_url))");

  if (error) {
    console.error("Error fetching Saved Jobs: ", error);
    return;
  }

  return data;
};
