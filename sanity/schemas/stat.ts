import { defineField, defineType } from "sanity";

export default defineType({
  name: "stat",
  title: "Statistics",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Stat Label (e.g. Years of Excellence)", type: "string", validation: (R) => R.required() }),
    defineField({ name: "value", title: "Numeric Value", type: "number" }),
    defineField({ name: "suffix", title: "Suffix (e.g. +, %, /5)", type: "string" }),
    defineField({ name: "isDecimal", title: "Is Decimal? (e.g. 4.9)", type: "boolean", initialValue: false }),
    defineField({ name: "description", title: "Description", type: "string" }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
