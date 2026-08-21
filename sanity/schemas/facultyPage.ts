import { defineField, defineType } from "sanity";

export default defineType({
  name: "facultyPage",
  title: "Faculty Page Banner",
  type: "document",
  fields: [
    defineField({
      name: "heroBadge",
      title: "Top Badge",
      type: "string",
      initialValue: "Expert Educators",
    }),
    defineField({
      name: "heroTitle",
      title: "Page Heading",
      type: "string",
      initialValue: "Our Qualified & Dedicated Faculty",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Subtitle Description",
      type: "text",
      rows: 2,
      initialValue:
        "Experienced mentors committed to conceptual understanding, exam preparation, and individual student success.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "👨‍🏫 Faculty Page Banner" };
    },
  },
});
