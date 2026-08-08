import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPageImages",
  title: "Contact Page Images",
  type: "document",
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: "buildingPhoto",
      title: "📸 Academy Building / Entrance Photo",
      description: "Shown at the top of the Contact page location section. Recommended: 800×500px (landscape).",
      type: "image",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page Images" };
    },
  },
});
