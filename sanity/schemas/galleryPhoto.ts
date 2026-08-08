import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryPhoto",
  title: "Gallery Photos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Photo Title",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption / Description",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Classroom", value: "Classroom" },
          { title: "Events", value: "Events" },
          { title: "Results", value: "Results" },
          { title: "Campus", value: "Campus" },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "image",
      title: "Photo (recommended: 800×600px or 600×800px portrait)",
      type: "image",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
