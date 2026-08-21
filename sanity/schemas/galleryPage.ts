import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryPage",
  title: "Gallery Page Banner",
  type: "document",
  fields: [
    defineField({
      name: "heroBadge",
      title: "Top Badge",
      type: "string",
      initialValue: "Campus Life & Achievements",
    }),
    defineField({
      name: "heroTitle",
      title: "Page Heading",
      type: "string",
      initialValue: "Photo Gallery & Wall of Fame",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Subtitle Description",
      type: "text",
      rows: 2,
      initialValue:
        "Explore our classroom sessions, student felicitation events, top scorers, and vibrant campus life at Afsar Educational Academy.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "🖼️ Gallery Page Banner" };
    },
  },
});
