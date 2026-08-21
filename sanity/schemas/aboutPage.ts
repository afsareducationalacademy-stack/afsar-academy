import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page Content & Sections",
  type: "document",
  fields: [
    // ─── HERO BANNER ──────────────────────────────────────────────────────────
    defineField({
      name: "heroSection",
      title: "1. 🚩 Top Hero Banner",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Top Badge",
          type: "string",
          initialValue: "Est. 2014 • Regd. No. 1060/2016",
        }),
        defineField({
          name: "title",
          title: "Page Heading",
          type: "string",
          initialValue: "Our Story & Educational Philosophy",
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle Description",
          type: "text",
          rows: 2,
          initialValue:
            "Building the next generation in Hyderabad with quality academics, expert faculty, and structured discipline.",
        }),
      ],
    }),

    // ─── ACADEMY STORY & FOUNDER VISION ───────────────────────────────────────
    defineField({
      name: "storySection",
      title: "2. 📖 Academy Story & Founder Vision",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Section Badge",
          type: "string",
          initialValue: "A Decade of Leadership",
        }),
        defineField({
          name: "heading",
          title: "Story Heading",
          type: "string",
          initialValue: "Empowering Students in Nampally Since 2014",
        }),
        defineField({
          name: "paragraph1",
          title: "Story Paragraph 1",
          type: "text",
          rows: 3,
          initialValue:
            "Afsar Educational Academy was established with a singular mission: to offer accessible, top-tier coaching for students in Nampally, Aghapura, and surrounding areas in Hyderabad.",
        }),
        defineField({
          name: "paragraph2",
          title: "Story Paragraph 2",
          type: "text",
          rows: 4,
          initialValue:
            "Recognizing that every student learns at their own pace, we combine traditional board coaching (SSC & Intermediate) with flexible Open Schooling options (TOSS, BOSSE, NIOS). This allows working students, gap-year candidates, and regular schoolgoers to achieve their academic targets seamlessly.",
        }),
        defineField({
          name: "quoteBox",
          title: "Highlight Quote Box",
          type: "text",
          rows: 2,
          initialValue:
            "\"Right Foundation at the Right Age — Choose a future-ready learning environment with strong academics and all-round development.\"",
        }),
        defineField({
          name: "classroomPhoto",
          title: "Classroom Interior / Campus Facade Photo (800×500px)",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "founderOfficePhoto",
          title: "Founder Office / Desk Photo (600×700px)",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "founderVisionTitle",
          title: "Founder's Vision Title",
          type: "string",
          initialValue: "Founder's Vision",
        }),
        defineField({
          name: "founderVisionDescription",
          title: "Founder's Vision Description",
          type: "text",
          rows: 3,
          initialValue:
            "Mr. Afsar Shareef (M.Sc, B.Ed), with over 15 years of academic leadership, personally oversees classroom instruction and student progress to maintain strict quality standards.",
        }),
        defineField({
          name: "founderVisionBadge",
          title: "Founder Card Bottom Badge",
          type: "string",
          initialValue: "Government of Telangana Approved Institute",
        }),
      ],
    }),

    // ─── 4 PILLARS OF EXCELLENCE ──────────────────────────────────────────────
    defineField({
      name: "pillarsSection",
      title: "3. 🏛️ The 4 Pillars of Afsar Academy",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Section Badge",
          type: "string",
          initialValue: "Core Principles",
        }),
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "The 4 Pillars of Afsar Academy",
        }),
        defineField({
          name: "subtitle",
          title: "Section Subtitle",
          type: "text",
          rows: 2,
          initialValue:
            "Our philosophy centres on nurturing academic potential through structured principles that drive consistent results.",
        }),
        defineField({
          name: "pillars",
          title: "Pillar Cards (4 items)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", title: "Pillar Title", type: "string" }),
                defineField({ name: "desc", title: "Pillar Description", type: "text", rows: 2 }),
              ],
              preview: {
                select: { title: "title", subtitle: "desc" },
              },
            },
          ],
        }),
      ],
    }),

    // ─── JOURNEY / TIMELINE ───────────────────────────────────────────────────
    defineField({
      name: "timelineSection",
      title: "4. 📈 Journey & Milestones Timeline",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Section Badge",
          type: "string",
          initialValue: "Our Growth",
        }),
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "A Decade of Educational Excellence",
        }),
        defineField({
          name: "subtitle",
          title: "Section Subtitle",
          type: "text",
          rows: 2,
          initialValue:
            "From a humble beginning in 2014 to Hyderabad's premier registered academy.",
        }),
        defineField({
          name: "timelineItems",
          title: "Timeline Milestones",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "year", title: "Year (e.g. 2014)", type: "string" }),
                defineField({ name: "title", title: "Milestone Title", type: "string" }),
                defineField({ name: "desc", title: "Milestone Description", type: "text", rows: 2 }),
              ],
              preview: {
                select: { title: "year", subtitle: "title" },
              },
            },
          ],
        }),
      ],
    }),

    // ─── ACCREDITATION / VERIFICATION CARD ────────────────────────────────────
    defineField({
      name: "accreditationSection",
      title: "5. 🛡️ Verification & Accreditation Box",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Badge Text",
          type: "string",
          initialValue: "Official Verification",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          initialValue: "Government of Telangana Registered",
        }),
        defineField({
          name: "regNo",
          title: "Registration Number",
          type: "string",
          initialValue: "1060/2016",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
          initialValue:
            "Afsar Educational Academy operates under official registration by the Government of Telangana, adhering to the highest standards of academic excellence, student safety, and curriculum integrity.",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "ℹ️ About Page Content & Sections" };
    },
  },
});
