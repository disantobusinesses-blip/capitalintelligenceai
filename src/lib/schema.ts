import { z } from "zod";

export const intakeFormSchema = z.object({
  tier: z.enum(["landing", "ai-integrated"]),
  style: z.string().min(1, "Please select a style"),
  palette: z.string().min(1, "Please select a colour palette"),
  description: z
    .string()
    .min(10, "Please provide at least 10 characters")
    .max(2000, "Description is too long"),
  addOns: z.array(z.string()).optional(),
  referenceUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
});

export type IntakeFormData = z.infer<typeof intakeFormSchema>;
