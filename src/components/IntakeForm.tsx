"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { intakeFormSchema, type IntakeFormData } from "@/lib/schema";
import { siteConfig } from "@/lib/config";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  Loader2,
  Bot,
  Mail,
  Calendar,
  MapPin,
  FileText,
  Image,
  Search,
  Quote,
  Share2,
  Video,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Bot, Mail, Calendar, MapPin, FileText, Image, Search, Quote, Share2, Video,
};

const STEPS = [
  { id: "tier", label: "Choose Tier" },
  { id: "style", label: "Style & Colours" },
  { id: "details", label: "Project Details" },
  { id: "addons", label: "Add-ons" },
  { id: "contact", label: "Contact" },
];

export default function IntakeForm() {
  const searchParams = useSearchParams();
  const initialTier = searchParams.get("tier") === "ai-integrated" ? "ai-integrated" : "landing";

  const [step, setStep] = useState(initialTier ? 1 : 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<IntakeFormData>({
    resolver: zodResolver(intakeFormSchema),
    defaultValues: {
      tier: initialTier as "landing" | "ai-integrated",
      style: "",
      palette: "",
      description: "",
      addOns: [],
      referenceUrl: "",
      name: "",
      email: "",
      phone: "",
      company: "",
    },
  });

  const watchedTier = watch("tier");
  const watchedStyle = watch("style");
  const watchedPalette = watch("palette");
  const watchedAddOns = watch("addOns") || [];

  const next = useCallback(async () => {
    let valid = true;
    if (step === 0) valid = await trigger("tier");
    if (step === 1) valid = await trigger(["style", "palette"]);
    if (step === 2) valid = await trigger("description");
    if (step === 4) valid = await trigger(["name", "email"]);
    if (valid && step < STEPS.length - 1) setStep((s) => s + 1);
  }, [step, trigger]);

  const prev = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const toggleAddon = useCallback(
    (id: string) => {
      const current = watch("addOns") || [];
      const updated = current.includes(id)
        ? current.filter((a) => a !== id)
        : [...current, id];
      setValue("addOns", updated);
    },
    [watch, setValue]
  );

  const onSubmit = async (data: IntakeFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Project submitted successfully!", {
      style: {
        background: "#111113",
        color: "#fafafa",
        border: "1px solid rgba(167, 139, 250, 0.3)",
      },
      iconTheme: { primary: "#a78bfa", secondary: "#09090b" },
    });
    console.log("Form data:", data);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center py-20"
      >
        <div className="w-16 h-16 rounded-full bg-[#a78bfa]/20 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-[#a78bfa]" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Project Submitted!</h2>
        <p className="text-[#a1a1aa] leading-relaxed">
          Thank you for choosing Capital Intelligence Group. We&apos;ll review your
          project details and get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  i < step
                    ? "bg-[#a78bfa] text-[#09090b]"
                    : i === step
                    ? "bg-[#a78bfa]/20 text-[#a78bfa] border border-[#a78bfa]/50"
                    : "bg-white/5 text-[#a1a1aa]"
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`hidden sm:block w-12 lg:w-20 h-px mx-2 transition-colors duration-300 ${
                    i < step ? "bg-[#a78bfa]" : "bg-white/10"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-[#a1a1aa]">
          Step {step + 1} of {STEPS.length}: {STEPS[step].label}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 0: Tier Selection */}
            {step === 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-2">Select your tier</h3>
                <p className="text-[#a1a1aa] text-sm mb-8">
                  Choose the package that best fits your project needs.
                </p>
                <div className="grid gap-4">
                  {siteConfig.tiers.map((tier) => (
                    <button
                      type="button"
                      key={tier.id}
                      onClick={() => setValue("tier", tier.id)}
                      className={`text-left p-6 rounded-xl border transition-all duration-300 ${
                        watchedTier === tier.id
                          ? "border-[#a78bfa]/50 bg-[#a78bfa]/5"
                          : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{tier.name}</h4>
                        <span className="text-[#a78bfa] font-bold">
                          {tier.price} <span className="text-xs font-normal text-[#a1a1aa]">{tier.currency}</span>
                        </span>
                      </div>
                      <p className="text-sm text-[#a1a1aa]">{tier.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Style & Colours */}
            {step === 1 && (
              <div>
                <h3 className="text-2xl font-bold mb-2">Style & colours</h3>
                <p className="text-[#a1a1aa] text-sm mb-8">
                  Choose the look and feel for your website.
                </p>

                <div className="mb-8">
                  <label className="block text-sm font-medium mb-3">
                    Theme Style
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {siteConfig.styles.map((style) => (
                      <button
                        type="button"
                        key={style.id}
                        onClick={() => setValue("style", style.id)}
                        className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                          watchedStyle === style.id
                            ? "border-[#a78bfa]/50 bg-[#a78bfa]/5"
                            : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                        }`}
                      >
                        <div
                          className="w-4 h-4 rounded-full mx-auto mb-2"
                          style={{ backgroundColor: style.color }}
                        />
                        <span className="text-sm font-medium">{style.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.style && (
                    <p className="text-red-400 text-xs mt-2">{errors.style.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">
                    Colour Palette
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {siteConfig.palettes.map((palette) => (
                      <button
                        type="button"
                        key={palette.id}
                        onClick={() => setValue("palette", palette.id)}
                        className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                          watchedPalette === palette.id
                            ? "border-[#a78bfa]/50 bg-[#a78bfa]/5"
                            : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                        }`}
                      >
                        <div className="flex gap-1 justify-center mb-2">
                          {palette.colors.map((color, ci) => (
                            <div
                              key={ci}
                              className="w-4 h-4 rounded-full border border-white/10"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium">{palette.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.palette && (
                    <p className="text-red-400 text-xs mt-2">{errors.palette.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Project Details */}
            {step === 2 && (
              <div>
                <h3 className="text-2xl font-bold mb-2">Project details</h3>
                <p className="text-[#a1a1aa] text-sm mb-8">
                  Tell us about your project vision.
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Description
                    </label>
                    <textarea
                      {...register("description")}
                      rows={5}
                      placeholder="Describe your business and what you'd like your website to achieve..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-[#52525b] focus:outline-none focus:border-[#a78bfa]/50 focus:ring-1 focus:ring-[#a78bfa]/20 transition-all text-sm resize-none"
                    />
                    {errors.description && (
                      <p className="text-red-400 text-xs mt-2">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Upload Logo{" "}
                      <span className="text-[#a1a1aa] font-normal">(optional)</span>
                    </label>
                    <div className="border border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[#a78bfa]/30 transition-colors cursor-pointer">
                      <Upload size={24} className="mx-auto mb-2 text-[#a1a1aa]" />
                      <p className="text-xs text-[#a1a1aa]">
                        Drag & drop your logo or click to browse
                      </p>
                      <p className="text-[10px] text-[#52525b] mt-1">
                        PNG, SVG, or AI — max 10MB
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Reference Website{" "}
                      <span className="text-[#a1a1aa] font-normal">(optional)</span>
                    </label>
                    <input
                      {...register("referenceUrl")}
                      type="url"
                      placeholder="https://example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-[#52525b] focus:outline-none focus:border-[#a78bfa]/50 focus:ring-1 focus:ring-[#a78bfa]/20 transition-all text-sm"
                    />
                    {errors.referenceUrl && (
                      <p className="text-red-400 text-xs mt-2">
                        {errors.referenceUrl.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Add-ons */}
            {step === 3 && (
              <div>
                <h3 className="text-2xl font-bold mb-2">Select add-ons</h3>
                <p className="text-[#a1a1aa] text-sm mb-8">
                  Enhance your website with premium modules.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {siteConfig.addOns.map((addon) => {
                    const Icon = iconMap[addon.icon] || Bot;
                    const selected = watchedAddOns.includes(addon.id);
                    return (
                      <button
                        type="button"
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                          selected
                            ? "border-[#a78bfa]/50 bg-[#a78bfa]/5"
                            : "border-white/10 hover:border-white/20 bg-white/[0.02]"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            selected ? "bg-[#a78bfa]/20" : "bg-white/5"
                          }`}
                        >
                          <Icon
                            size={14}
                            className={selected ? "text-[#a78bfa]" : "text-[#a1a1aa]"}
                          />
                        </div>
                        <span className="text-xs font-medium">{addon.label}</span>
                        {selected && (
                          <Check size={14} className="text-[#a78bfa] ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Contact */}
            {step === 4 && (
              <div>
                <h3 className="text-2xl font-bold mb-2">Contact details</h3>
                <p className="text-[#a1a1aa] text-sm mb-8">
                  How can we reach you to discuss your project?
                </p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register("name")}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-[#52525b] focus:outline-none focus:border-[#a78bfa]/50 focus:ring-1 focus:ring-[#a78bfa]/20 transition-all text-sm"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-2">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company{" "}
                        <span className="text-[#a1a1aa] font-normal">(optional)</span>
                      </label>
                      <input
                        {...register("company")}
                        placeholder="Your Company"
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-[#52525b] focus:outline-none focus:border-[#a78bfa]/50 focus:ring-1 focus:ring-[#a78bfa]/20 transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-[#52525b] focus:outline-none focus:border-[#a78bfa]/50 focus:ring-1 focus:ring-[#a78bfa]/20 transition-all text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone{" "}
                      <span className="text-[#a1a1aa] font-normal">(optional)</span>
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="+61 400 000 000"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-[#52525b] focus:outline-none focus:border-[#a78bfa]/50 focus:ring-1 focus:ring-[#a78bfa]/20 transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-10 pt-6 border-t border-white/5">
          {step > 0 ? (
            <button
              type="button"
              onClick={prev}
              className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#a78bfa] text-[#09090b] font-medium rounded-xl hover:bg-[#c4b5fd] transition-all text-sm"
            >
              Continue
              <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-2.5 bg-[#a78bfa] text-[#09090b] font-semibold rounded-xl hover:bg-[#c4b5fd] transition-all text-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Project
                  <Check size={14} />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
