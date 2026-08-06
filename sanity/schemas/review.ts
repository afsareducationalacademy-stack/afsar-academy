import { defineField, defineType } from "sanity";

export default defineType({
  name: "review",
  title: "Reviews & Testimonials",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Reviewer Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", title: "Role (e.g. Parent of SSC Student)", type: "string" }),
    defineField({ name: "rating", title: "Rating (1-5)", type: "number", initialValue: 5 }),
    defineField({ name: "source", title: "Source (e.g. Google Review)", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "date", title: "Date / Relative (e.g. 2 months ago)", type: "string" }),
    defineField({ name: "text", title: "Review Text", type: "text", rows: 4, validation: (R) => R.required() }),
    defineField({ name: "avatar", title: "Reviewer Photo (optional)", type: "image", options: { hotspot: true } }),
    defineField({ name: "avatarBg", title: "Avatar Background Color Class (fallback)", type: "string", initialValue: "bg-navy" }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});
