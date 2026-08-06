import { defineField, defineType } from "sanity";

export default defineType({
  name: "course",
  title: "Courses",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Course Title", type: "string", validation: (R) => R.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "SSC", value: "SSC" },
          { title: "Intermediate", value: "Intermediate" },
          { title: "Open Schooling", value: "Open Schooling" },
          { title: "Degree", value: "Degree" },
        ],
      },
    }),
    defineField({ name: "badge", title: "Badge (e.g. Popular, Govt Recognized)", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "boards", title: "Boards (list)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "classes", title: "Classes (e.g. Class 9 & 10)", type: "string" }),
    defineField({ name: "streams", title: "Streams (optional, for Inter)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "timing", title: "Timing", type: "string" }),
    defineField({ name: "features", title: "Key Features", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
