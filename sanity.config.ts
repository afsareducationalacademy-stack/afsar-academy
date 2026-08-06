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
          .title("📄 Website Pages & Sections")
          .items([

            // ─── GLOBAL SITE SETTINGS ──────────────────────────────────────
            S.listItem()
              .title("⚙️ Global Site Settings")
              .child(
                S.document()
                  .schemaType("siteConfig")
                  .documentId("siteConfig")
                  .title("Site Settings — Phone, Address, Announcement Bar")
              ),

            S.divider(),

            // ─── HOME PAGE ──────────────────────────────────────────────────
            S.listItem()
              .title("🏠 Home Page")
              .child(
                S.list()
                  .title("🏠 Home Page Sections")
                  .items([
                    S.listItem()
                      .title("🎞️ Hero Banner Slides")
                      .schemaType("heroSlide")
                      .child(
                        S.documentTypeList("heroSlide")
                          .title("Hero Banner Slides — Top of Homepage")
                      ),
                    S.listItem()
                      .title("🏆 Achievements & Gallery Section")
                      .child(
                        S.list()
                          .title("🏆 Achievements & Gallery")
                          .items([
                            S.listItem()
                              .title("🥇 Individual Topper Posters (Marquee Row 1)")
                              .schemaType("topperPoster")
                              .child(
                                S.documentTypeList("topperPoster")
                                  .title("Topper Posters — Scrolling Marquee Row 1")
                              ),
                            S.listItem()
                              .title("👥 Group Batch Photos (Marquee Row 2)")
                              .schemaType("groupBatch")
                              .child(
                                S.documentTypeList("groupBatch")
                                  .title("Group Batch Photos — Scrolling Marquee Row 2")
                              ),
                          ])
                      ),
                    S.listItem()
                      .title("📊 Stats Bar (Years, Success Rate, Students, Rating)")
                      .schemaType("stat")
                      .child(
                        S.documentTypeList("stat")
                          .title("Stats Bar — Numbers Section on Homepage")
                      ),
                    S.listItem()
                      .title("⭐ Student & Parent Reviews")
                      .schemaType("review")
                      .child(
                        S.documentTypeList("review")
                          .title("Reviews — Testimonials Carousel on Homepage")
                      ),
                  ])
              ),

            S.divider(),

            // ─── FACULTY PAGE ───────────────────────────────────────────────
            S.listItem()
              .title("👨‍🏫 Faculty Page")
              .schemaType("faculty")
              .child(
                S.documentTypeList("faculty")
                  .title("Faculty Members — Photos, Bio & Subjects")
              ),

            S.divider(),

            // ─── COURSES PAGE ───────────────────────────────────────────────
            S.listItem()
              .title("📚 Courses Page")
              .schemaType("course")
              .child(
                S.documentTypeList("course")
                  .title("Courses — SSC, Inter, TOSS, BOSSE, NIOS, Degree")
              ),

            S.divider(),

            // ─── GALLERY PAGE ───────────────────────────────────────────────
            S.listItem()
              .title("🖼️ Gallery Page")
              .child(
                S.list()
                  .title("🖼️ Gallery Page Content")
                  .items([
                    S.listItem()
                      .title("🏅 Topper Achievement Cards (with Student Quotes)")
                      .schemaType("achievement")
                      .child(
                        S.documentTypeList("achievement")
                          .title("Topper Cards — Name, Score, Photo & Quote")
                      ),
                    S.listItem()
                      .title("🥇 Individual Topper Posters")
                      .schemaType("topperPoster")
                      .child(
                        S.documentTypeList("topperPoster")
                          .title("Topper Posters — Full Designed Poster Images")
                      ),
                    S.listItem()
                      .title("👥 Group Batch Photos")
                      .schemaType("groupBatch")
                      .child(
                        S.documentTypeList("groupBatch")
                          .title("Group Batch Photos — Class Group & Passing Celebrations")
                      ),
                  ])
              ),

          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
