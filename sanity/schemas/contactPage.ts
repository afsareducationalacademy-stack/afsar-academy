import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page Info & Form",
  type: "document",
  fields: [
    // ─── HERO BANNER ──────────────────────────────────────────────────────────
    defineField({
      name: "heroSection",
      title: "1. 📞 Top Hero Banner",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Top Badge",
          type: "string",
          initialValue: "Get in Touch",
        }),
        defineField({
          name: "title",
          title: "Page Heading",
          type: "string",
          initialValue: "Contact & Admissions Office",
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle Description",
          type: "text",
          rows: 2,
          initialValue:
            "Have questions about admissions, course timings, or fees? Contact our team directly or visit our campus in Nampally, Hyderabad.",
        }),
      ],
    }),

    // ─── CAMPUS LOCATION & BUILDING PHOTO ─────────────────────────────────────
    defineField({
      name: "locationSection",
      title: "2. 🏢 Campus Location & Building Entrance",
      type: "object",
      fields: [
        defineField({
          name: "buildingPhoto",
          title: "Academy Building / Entrance Photo (800×500px)",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "buildingPhotoCaption",
          title: "Building Photo Caption",
          type: "string",
          initialValue: "Afsar Educational Academy Building Entrance in Nampally, Hyderabad",
        }),
        defineField({
          name: "addressTitle",
          title: "Address Block Title",
          type: "string",
          initialValue: "Address & Landmark",
        }),
        defineField({
          name: "fullAddress",
          title: "Full Address",
          type: "text",
          rows: 2,
          initialValue:
            "Above Al Hareer textiles, opp. to Al Rehma Bakers, Aghapura, Nampally, Hyderabad, Telangana 500001",
        }),
        defineField({
          name: "landmark",
          title: "Landmark Details (Optional)",
          type: "string",
          description: "Optional landmark note (leave empty if not needed)",
        }),
        defineField({
          name: "googleMapsEmbedUrl",
          title: "Google Maps Embed URL (iframe src)",
          type: "url",
        }),
      ],
    }),

    // ─── DIRECT CONTACT DETAILS ───────────────────────────────────────────────
    defineField({
      name: "contactDetails",
      title: "3. 📱 Direct Contact Info & Timings",
      type: "object",
      fields: [
        defineField({
          name: "phone",
          title: "Primary Phone Number",
          type: "string",
          initialValue: "+91 90524 07878",
        }),
        defineField({
          name: "phoneTiming",
          title: "Phone Availability Timing",
          type: "string",
          initialValue: "9:00 AM – 10:00 PM (All 7 Days)",
        }),
        defineField({
          name: "email",
          title: "Email Address",
          type: "string",
          initialValue: "afsarshareef@gmail.com",
        }),
        defineField({
          name: "emailNote",
          title: "Email Note",
          type: "string",
          initialValue: "Quick responses for formal admissions & inquiries",
        }),
        defineField({
          name: "whatsappUrl",
          title: "WhatsApp Chat Link",
          type: "url",
        }),
        defineField({
          name: "morningBatches",
          title: "Morning Batches Timing",
          type: "string",
          initialValue: "9:00 AM onwards (Regular & Open Schooling)",
        }),
        defineField({
          name: "eveningBatches",
          title: "Evening Batches Timing",
          type: "string",
          initialValue: "5:30 PM – 10:00 PM (Monday to Saturday)",
        }),
      ],
    }),

    // ─── INQUIRY FORM SETTINGS ────────────────────────────────────────────────
    defineField({
      name: "inquiryFormSection",
      title: "4. 📝 Quick Admission Inquiry Form",
      type: "object",
      fields: [
        defineField({
          name: "formHeading",
          title: "Form Heading",
          type: "string",
          initialValue: "Quick Admission Inquiry",
        }),
        defineField({
          name: "formSubtitle",
          title: "Form Subtitle",
          type: "text",
          rows: 2,
          initialValue:
            "Submit your details below to receive instant fee structures, syllabus copies, and batch timing details on WhatsApp.",
        }),
        defineField({
          name: "submitButtonText",
          title: "Submit Button Text",
          type: "string",
          initialValue: "Send Inquiry via WhatsApp",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "📞 Contact Page Info & Form" };
    },
  },
});
