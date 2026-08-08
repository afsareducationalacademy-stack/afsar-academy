"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o58ljzka";
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
          .title("🌐 Website Pages")
          .items([

            // ─── 🏠 HOME PAGE ────────────────────────────────────────────────
            S.listItem()
              .title("🏠 Home Page  —  localhost:3000/")
              .child(
                S.list()
                  .title("🏠 Home Page Sections")
                  .items([

                    // Announcement bar + director photo live in siteConfig
                    S.listItem()
                      .title("📢 Announcement Bar & Director Photo")
                      .child(
                        S.document()
                          .schemaType("siteConfig")
                          .documentId("siteConfig")
                          .title("Announcement Bar & Director Photo")
                      ),

                    S.divider(),

                    S.listItem()
                      .title("🎞️ Hero Banner Slides")
                      .schemaType("heroSlide")
                      .child(
                        S.documentTypeList("heroSlide")
                          .title("Hero Banner Slides")
                      ),

                    S.listItem()
                      .title("📊 Stats Bar  (Years · Students · Success Rate · Rating)")
                      .schemaType("stat")
                      .child(
                        S.documentTypeList("stat")
                          .title("Stats Bar Numbers")
                      ),

                    S.listItem()
                      .title("🏆 Achievements Marquee — Topper Posters (Row 1)")
                      .schemaType("topperPoster")
                      .child(
                        S.documentTypeList("topperPoster")
                          .title("Individual Topper Posters — Marquee Row 1")
                      ),

                    S.listItem()
                      .title("👥 Achievements Marquee — Group Batch Photos (Row 2)")
                      .schemaType("groupBatch")
                      .child(
                        S.documentTypeList("groupBatch")
                          .title("Group Batch Photos — Marquee Row 2")
                      ),

                    S.listItem()
                      .title("⭐ Student & Parent Reviews  (Testimonials Carousel)")
                      .schemaType("review")
                      .child(
                        S.documentTypeList("review")
                          .title("Reviews — Testimonials Carousel")
                      ),
                  ])
              ),

            S.divider(),

            // ─── ℹ️ ABOUT PAGE ───────────────────────────────────────────────
            S.listItem()
              .title("ℹ️ About Page  —  localhost:3000/about")
              .child(
                S.document()
                  .schemaType("aboutPageImages")
                  .documentId("aboutPageImages")
                  .title("ℹ️ About Page — Classroom & Founder Office Photos")
              ),

            S.divider(),

            // ─── 📚 COURSES PAGE ─────────────────────────────────────────────
            S.listItem()
              .title("📚 Courses Page  —  localhost:3000/courses")
              .schemaType("course")
              .child(
                S.documentTypeList("course")
                  .title("Courses — SSC, Inter, TOSS, BOSSE, NIOS, Degree")
              ),

            S.divider(),

            // ─── 👨‍🏫 FACULTY PAGE ────────────────────────────────────────────
            S.listItem()
              .title("👨‍🏫 Faculty Page  —  localhost:3000/faculty")
              .schemaType("faculty")
              .child(
                S.documentTypeList("faculty")
                  .title("Faculty Members — Photos, Bio & Subjects")
              ),

            S.divider(),

            // ─── 🖼️ GALLERY PAGE ─────────────────────────────────────────────
            S.listItem()
              .title("🖼️ Gallery Page  —  localhost:3000/gallery")
              .child(
                S.list()
                  .title("🖼️ Gallery Page Content")
                  .items([
                    S.listItem()
                      .title("📸 Gallery Photos  (Classroom · Events · Results · Campus)")
                      .schemaType("galleryPhoto")
                      .child(
                        S.documentTypeList("galleryPhoto")
                          .title("Gallery Photos — Upload by Category")
                      ),

                    S.divider(),

                    S.listItem()
                      .title("🏅 Topper Achievement Cards  (Name · Score · Quote)")
                      .schemaType("achievement")
                      .child(
                        S.documentTypeList("achievement")
                          .title("Topper Achievement Cards")
                      ),

                    S.listItem()
                      .title("🥇 Individual Topper Posters  (Full Poster Images)")
                      .schemaType("topperPoster")
                      .child(
                        S.documentTypeList("topperPoster")
                          .title("Individual Topper Posters")
                      ),

                    S.listItem()
                      .title("👥 Group Batch Photos  (Class & Celebration Photos)")
                      .schemaType("groupBatch")
                      .child(
                        S.documentTypeList("groupBatch")
                          .title("Group Batch Photos")
                      ),
                  ])
              ),

            S.divider(),

            // ─── 📞 CONTACT PAGE ───────────────────────────────────────────────
            S.listItem()
              .title("📞 Contact Page  —  localhost:3000/contact")
              .child(
                S.document()
                  .schemaType("contactPageImages")
                  .documentId("contactPageImages")
                  .title("📞 Contact Page — Building Entrance Photo")
              ),

            S.divider(),

            // ─── ⚙️ GLOBAL SETTINGS ──────────────────────────────────────────
            S.listItem()
              .title("⚙️ Global Site Settings")
              .child(
                S.document()
                  .schemaType("siteConfig")
                  .documentId("siteConfig")
                  .title("Global Settings — All Site Configuration")
              ),

          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
