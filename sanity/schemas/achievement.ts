import { defineField, defineType } from "sanity";

export default defineType({
  name: "achievement",
  title: "Toppers & Achievements",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Student Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "board", title: "Exam / Board", type: "string" }),
    defineField({ name: "score", title: "Score / GPA", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "badge", title: "Badge Label (e.g. State Gold Medalist)", type: "string" }),
    defineField({ name: "photo", title: "Student Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "quote", title: "Student Quote / Testimonial", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "score", media: "photo" },
  },
});
