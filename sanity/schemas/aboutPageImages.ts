import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPageImages",
  title: "About Page Images",
  type: "document",
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: "classroomPhoto",
      title: "📸 Classroom / Campus Interior Photo",
      description: "Shown in the 'About Page' story section on the left side. Recommended: 800×500px (landscape).",
      type: "image",
    }),
    defineField({
      name: "founderOfficePhoto",
      title: "📸 Founder Office / Desk Photo",
      description: "Shown inside the navy card on the right side of the About page. Recommended: 600×700px (portrait).",
      type: "image",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page Images" };
    },
  },
});
