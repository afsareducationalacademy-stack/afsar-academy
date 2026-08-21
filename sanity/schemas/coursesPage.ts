import { defineField, defineType } from "sanity";

export default defineType({
  name: "coursesPage",
  title: "Courses Page Banner & Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroBadge",
      title: "Top Badge",
      type: "string",
      initialValue: "Academic Programs",
    }),
    defineField({
      name: "heroTitle",
      title: "Page Heading",
      type: "string",
      initialValue: "Our Courses & Coaching Programs",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Subtitle Description",
      type: "text",
      rows: 2,
      initialValue:
        "From School Tuitions and Intermediate to Open Schooling and Degree coaching — comprehensive guidance for every academic stage.",
    }),
    defineField({
      name: "ctaHeading",
      title: "Bottom Counseling Box Heading",
      type: "string",
      initialValue: "Need Guidance on Selecting the Right Course or Board?",
    }),
    defineField({
      name: "ctaSubtitle",
      title: "Bottom Counseling Box Subtitle",
      type: "text",
      rows: 2,
      initialValue:
        "Speak directly with Director Mr. Afsar Shareef to get personalised academic counseling for SSC, Inter, TOSS, BOSSE, or NIOS.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "📚 Courses Page Banner & Settings" };
    },
  },
});
