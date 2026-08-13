import { defineField, defineType } from "sanity";

export default defineType({
  name: "faculty",
  title: "Faculty",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "role", title: "Role / Designation", type: "string", validation: (R) => R.required() }),
    defineField({ name: "subject", title: "Subject(s) Taught", type: "string" }),
    defineField({ name: "qualification", title: "Qualification", type: "string" }),
    defineField({ name: "experience", title: "Experience (e.g. 15+ Years)", type: "string" }),
    defineField({ name: "bio", title: "Short Bio", type: "text", rows: 3 }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "isFounder", title: "Is Founder?", type: "boolean", initialValue: false }),
    defineField({ name: "isPrincipal", title: "Is Principal?", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
