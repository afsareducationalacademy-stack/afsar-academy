"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "afsar-academy",
  title: "Afsar Educational Academy CMS",
  projectId,
  dataset,
  basePath: "/studio",

  plugins: [
    structureTool({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      structure: (S: any) =>
        S.list()
          .title("Content Manager")
          .items([
            S.listItem()
              .title("⚙️ Site Settings")
              .child(
                S.document()
                  .schemaType("siteConfig")
                  .documentId("siteConfig")
              ),
            S.divider(),
            S.listItem().title("🖼️ Hero Slides").schemaType("heroSlide").child(S.documentTypeList("heroSlide")),
            S.divider(),
            S.listItem().title("👨‍🏫 Faculty").schemaType("faculty").child(S.documentTypeList("faculty")),
            S.listItem().title("📚 Courses").schemaType("course").child(S.documentTypeList("course")),
            S.divider(),
            S.listItem().title("🏆 Topper Cards").schemaType("achievement").child(S.documentTypeList("achievement")),
            S.listItem().title("🪪 Topper Posters").schemaType("topperPoster").child(S.documentTypeList("topperPoster")),
            S.listItem().title("📸 Group Batch Photos").schemaType("groupBatch").child(S.documentTypeList("groupBatch")),
            S.divider(),
            S.listItem().title("⭐ Reviews").schemaType("review").child(S.documentTypeList("review")),
            S.listItem().title("📊 Statistics").schemaType("stat").child(S.documentTypeList("stat")),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
