import { z } from 'zod';

export const intakeFormSchema = z.object({
  tier: z.enum(['tier1', 'tier2'], {
    message: 'Please select a tier',
  }),
  style: z.enum(['modern', 'luxury', 'bold', 'minimal'], {
    message: 'Please select a style',
  }),
  palette: z.string({
    message: 'Please select a color palette',
  }),
  logo: z.any().optional(),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  projectDescription: z.string().min(10, 'Please provide at least 10 characters'),
  inspirationUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  addOns: z.array(z.string()),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  contactMethod: z.enum(['email', 'phone', 'both'], {
    message: 'Please select a contact method',
  }),
});

export type IntakeFormData = z.infer<typeof intakeFormSchema>;
