import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteConfig",
  title: "Site Configuration",
  type: "document",
  fields: [
    defineField({ name: "academyName", title: "Academy Name", type: "string" }),
    defineField({ name: "shortName", title: "Short Name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "mission", title: "Mission Statement", type: "string" }),
    defineField({ name: "registrationGovt", title: "Registration Authority (e.g. Government of Telangana)", type: "string" }),
    defineField({ name: "establishedYear", title: "Established Year (e.g. 2014)", type: "string" }),
    defineField({ name: "phone", title: "Phone Number", type: "string" }),
    defineField({ name: "whatsappUrl", title: "WhatsApp URL", type: "url" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({ name: "building", title: "Building / Landmark", type: "string" }),
        defineField({ name: "street", title: "Street / Area", type: "string" }),
        defineField({ name: "landmark", title: "Additional Landmark", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "state", title: "State", type: "string" }),
        defineField({ name: "pincode", title: "Pincode", type: "string" }),
        defineField({ name: "full", title: "Full Address (one line)", type: "text" }),
      ],
    }),
    defineField({
      name: "hours",
      title: "Batch Timings",
      type: "object",
      fields: [
        defineField({ name: "eveningBatches", title: "Evening Batches Timing", type: "string" }),
        defineField({ name: "morningBatches", title: "Morning Batches Timing", type: "string" }),
      ],
    }),
    defineField({ name: "registrationNo", title: "Registration Number", type: "string" }),
    defineField({
      name: "directorPhoto",
      title: "📸 Director Photo — Homepage (600×800px, portrait)",
      type: "image",
    }),
    defineField({
      name: "founderOfficePhoto",
      title: "📸 Founder Office/Desk Photo — About Page (600×700px)",
      type: "image",
    }),
    defineField({
      name: "classroomPhoto",
      title: "📸 Classroom / Campus Interior Photo — About Page (800×500px)",
      type: "image",
    }),
    defineField({
      name: "buildingPhoto",
      title: "📸 Academy Building Entrance Photo — Contact Page (800×500px)",
      type: "image",
    }),
    defineField({ name: "announcementBar", title: "Announcement Bar Text", type: "string" }),
    defineField({ name: "showAnnouncementBar", title: "Show Announcement Bar?", type: "boolean", initialValue: true }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "googleMapsEmbedUrl", title: "Google Maps Embed URL", type: "url" }),
    defineField({ name: "googleRating", title: "Google Rating (e.g. 4.9)", type: "number" }),
    defineField({ name: "totalGoogleReviews", title: "Total Google Reviews Count", type: "number" }),
    defineField({ name: "totalJustdialReviews", title: "Total Justdial Reviews Count", type: "number" }),
  ],
  preview: {
    select: { title: "academyName" },
  },
});
