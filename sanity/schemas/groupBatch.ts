import { defineField, defineType } from "sanity";

export default defineType({
  name: "groupBatch",
  title: "Group Batch Photos",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Batch Title", type: "string", validation: (R) => R.required() }),
    defineField({ name: "subtitle", title: "Subtitle / Description", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "SSC / 10th", value: "ssc" },
          { title: "Intermediate", value: "inter" },
          { title: "TOSS / BOSSE / NIOS", value: "toss" },
          { title: "Degree", value: "degree" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({ name: "image", title: "Group Photo or Poster", type: "image", options: { hotspot: true } }),
    defineField({ name: "isFullPoster", title: "Is Full Designed Poster?", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
