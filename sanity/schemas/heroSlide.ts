import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSlide",
  title: "Hero Slides (Homepage Banner)",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Slide Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "subtitle", title: "Slide Subtitle / Caption", type: "string" }),
    defineField({ name: "image", title: "Slide Image (1200x800px recommended)", type: "image", options: { hotspot: true } }),
    defineField({ name: "tag", title: "Tag Label (e.g. Director & Founder)", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Appreciation / Awards", value: "appreciation" },
          { title: "Building / Campus", value: "building" },
          { title: "Students / Batch", value: "students" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "tag", media: "image" },
  },
});
