import { z } from "zod";

export const zodApplicationSchema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be atleast 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"]),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword" ||
          file[0].type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

export const zodJobSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  location: z.string().min(1, { message: "Select a location" }),
  company_id: z.string().min(1, { message: "Select or Add a new company" }),
  requirements: z.string().min(1, { message: "requirements are required" }),
});

export const zodCompanySchema = z.object({
  name: z.string().min(1, { message: "company name is required" }),
  logo: z.any().refine(
    (file) =>
      file[0] &&
      (file[0].type === "image/png" ||
        file[0].type === "image/jpeg" || {
          message: "Only images are allowed",
        })
  ),
});
