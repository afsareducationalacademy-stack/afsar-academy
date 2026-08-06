import { defineField, defineType } from "sanity";

export default defineType({
  name: "topperPoster",
  title: "Topper Posters",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title (Student Name & Exam)", type: "string", validation: (R) => R.required() }),
    defineField({ name: "subtitle", title: "Subtitle (Score & Rank details)", type: "string" }),
    defineField({ name: "image", title: "Poster / Photo Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "isFullPoster", title: "Is Full Designed Poster?", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "subtitle", media: "image" },
  },
});
