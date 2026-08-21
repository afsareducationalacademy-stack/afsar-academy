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
          .title("🌐 Website Pages & Content")
          .items([

            // ─── 🏠 HOME PAGE ────────────────────────────────────────────────
            S.listItem()
              .title("🏠 Home Page  —  localhost:3000/")
              .child(
                S.list()
                  .title("🏠 Home Page Sections")
                  .items([
                    S.listItem()
                      .title("📝 Main Home Page Content (Hero, Bento Cards, Headings & CTA)")
                      .child(
                        S.document()
                          .schemaType("homePage")
                          .documentId("homePage")
                          .title("Home Page Sections & Text Content")
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
                      .title("📊 Stats Bar (Years · Students · Success Rate · Rating)")
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
                      .title("⭐ Student & Parent Reviews (Testimonials Carousel)")
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
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
                  .title("ℹ️ About Page — Story, Vision, Pillars & Milestones")
              ),

            S.divider(),

            // ─── 📚 COURSES PAGE ─────────────────────────────────────────────
            S.listItem()
              .title("📚 Courses Page  —  localhost:3000/courses")
              .child(
                S.list()
                  .title("📚 Courses Page Content")
                  .items([
                    S.listItem()
                      .title("📝 Courses Page Banner & Counseling Box")
                      .child(
                        S.document()
                          .schemaType("coursesPage")
                          .documentId("coursesPage")
                          .title("Courses Page Banner & Counseling Settings")
                      ),
                    S.divider(),
                    S.listItem()
                      .title("📋 All Courses & Programs (SSC, Inter, TOSS, BOSSE, NIOS, Degree)")
                      .schemaType("course")
                      .child(
                        S.documentTypeList("course")
                          .title("Courses — Full Curriculum & Timings")
                      ),
                  ])
              ),

            S.divider(),

            // ─── 👨‍🏫 FACULTY PAGE ────────────────────────────────────────────
            S.listItem()
              .title("👨‍🏫 Faculty Page  —  localhost:3000/faculty")
              .child(
                S.list()
                  .title("👨‍🏫 Faculty Page Content")
                  .items([
                    S.listItem()
                      .title("📝 Faculty Page Banner")
                      .child(
                        S.document()
                          .schemaType("facultyPage")
                          .documentId("facultyPage")
                          .title("Faculty Page Banner Settings")
                      ),
                    S.divider(),
                    S.listItem()
                      .title("👥 Faculty Directory (Photos, Bio, Subjects & Qualifications)")
                      .schemaType("faculty")
                      .child(
                        S.documentTypeList("faculty")
                          .title("Faculty Members")
                      ),
                  ])
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
                      .title("📝 Gallery Page Banner")
                      .child(
                        S.document()
                          .schemaType("galleryPage")
                          .documentId("galleryPage")
                          .title("Gallery Page Banner Settings")
                      ),

                    S.divider(),

                    S.listItem()
                      .title("📸 Gallery Photos (Classroom · Events · Results · Campus)")
                      .schemaType("galleryPhoto")
                      .child(
                        S.documentTypeList("galleryPhoto")
                          .title("Gallery Photos — Upload by Category")
                      ),

                    S.listItem()
                      .title("🏅 Topper Achievement Cards (Name · Score · Quote)")
                      .schemaType("achievement")
                      .child(
                        S.documentTypeList("achievement")
                          .title("Topper Achievement Cards")
                      ),

                    S.listItem()
                      .title("🥇 Individual Topper Posters (Full Poster Images)")
                      .schemaType("topperPoster")
                      .child(
                        S.documentTypeList("topperPoster")
                          .title("Individual Topper Posters")
                      ),

                    S.listItem()
                      .title("👥 Group Batch Photos (Class & Celebration Photos)")
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
                  .schemaType("contactPage")
                  .documentId("contactPage")
                  .title("📞 Contact Page — Address, Timings, Building Photo & Form")
              ),

            S.divider(),

            // ─── ⚙️ GLOBAL SETTINGS ──────────────────────────────────────────
            S.listItem()
              .title("⚙️ Global Site Settings (Navbar, Footer, Announcement Bar, Phone & Address)")
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
