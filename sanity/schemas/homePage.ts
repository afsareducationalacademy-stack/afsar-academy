import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page Content & Sections",
  type: "document",
  fields: [
    // ─── HERO SECTION ──────────────────────────────────────────────────────────
    defineField({
      name: "heroSection",
      title: "1. 🚀 Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "badgeText",
          title: "Top Badge Text",
          type: "string",
          initialValue: "Govt. Registered (1060/2016) • Estd. 2014",
        }),
        defineField({
          name: "headingPrefix",
          title: "Main Heading Prefix",
          type: "string",
          initialValue: "Excellence in",
        }),
        defineField({
          name: "rotatingWords",
          title: "Rotating Animated Words (e.g. SSC, Inter, Degree, TOSS, BOSSE, NIOS)",
          type: "array",
          of: [{ type: "string" }],
          initialValue: ["SSC", "Inter", "Degree", "TOSS", "BOSSE", "NIOS"],
        }),
        defineField({
          name: "headingSuffix",
          title: "Main Heading Suffix",
          type: "string",
          initialValue: "Education",
        }),
        defineField({
          name: "description",
          title: "Hero Description Paragraph",
          type: "text",
          rows: 3,
          initialValue:
            "Join one of Hyderabad's trusted educational academies offering quality education, experienced faculty, disciplined learning, and excellent academic results for students preparing for their future.",
        }),
        defineField({
          name: "featureChips",
          title: "Feature Chips / Badges",
          type: "array",
          of: [{ type: "string" }],
          initialValue: [
            "Morning & Evening Batches",
            "Experienced Faculty",
            "Govt Registered",
            "10+ Years Excellence",
            "Personal Mentorship",
            "Affordable Fees",
          ],
        }),
        defineField({
          name: "ctaPrimaryText",
          title: "Primary Button Text",
          type: "string",
          initialValue: "Enroll Now",
        }),
        defineField({
          name: "ctaSecondaryText",
          title: "Secondary Button Text",
          type: "string",
          initialValue: "View Courses",
        }),
      ],
    }),

    // ─── ACHIEVEMENTS SECTION ──────────────────────────────────────────────────
    defineField({
      name: "achievementsSection",
      title: "2. 🏆 Achievements Marquee Section",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Section Badge",
          type: "string",
          initialValue: "Hall of Fame",
        }),
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "Our Toppers & Proud Achievers",
        }),
        defineField({
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 2,
          initialValue:
            "Celebrating students who scored 10.0 GPA, 98%+ marks, and cleared board exams with top ranks.",
        }),
      ],
    }),

    // ─── WHY CHOOSE US / BENTO GRID ────────────────────────────────────────────
    defineField({
      name: "whyChooseSection",
      title: "3. 💎 Why Choose Us (Bento Grid & Director Feature)",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Section Badge",
          type: "string",
          initialValue: "Why Choose Us",
        }),
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "Comprehensive Educational Support",
        }),
        defineField({
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 2,
          initialValue:
            "Dedicated faculty, structured curriculum, and modern campus facilities ensuring every student excels in board and university examinations.",
        }),
        defineField({
          name: "directorCard",
          title: "Director Feature Card",
          type: "object",
          fields: [
            defineField({ name: "directorPhoto", title: "Director Photo", type: "image", options: { hotspot: true } }),
            defineField({ name: "name", title: "Director Name", type: "string", initialValue: "Mr. Afsar Shareef" }),
            defineField({ name: "role", title: "Designation", type: "string", initialValue: "Founder & Academic Director" }),
            defineField({ name: "credentials", title: "Degrees / Credentials", type: "string", initialValue: "M.Sc (Maths), B.Ed • 15+ Years Experience" }),
            defineField({
              name: "quote",
              title: "Director Quote / Message",
              type: "text",
              rows: 3,
              initialValue:
                "Our goal is not just to teach subjects, but to build academic discipline, conceptual clarity, and confidence that lasts a lifetime.",
            }),
          ],
        }),
        defineField({
          name: "bentoCards",
          title: "Feature Cards (5 Cards)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "subtitle", title: "Subtitle / Tag", type: "string" }),
                defineField({ name: "title", title: "Card Title", type: "string" }),
                defineField({ name: "description", title: "Card Description", type: "text", rows: 2 }),
                defineField({ name: "footerBadge", title: "Footer Badge", type: "string" }),
              ],
              preview: {
                select: { title: "title", subtitle: "subtitle" },
              },
            },
          ],
        }),
      ],
    }),

    // ─── TESTIMONIALS SECTION ──────────────────────────────────────────────────
    defineField({
      name: "testimonialsSection",
      title: "4. ⭐ Student & Parent Reviews Section",
      type: "object",
      fields: [
        defineField({
          name: "badge",
          title: "Section Badge",
          type: "string",
          initialValue: "Student & Parent Feedback",
        }),
        defineField({
          name: "heading",
          title: "Section Heading",
          type: "string",
          initialValue: "Trusted by 500+ Families in Hyderabad",
        }),
        defineField({
          name: "description",
          title: "Section Description",
          type: "text",
          rows: 2,
          initialValue:
            "Read genuine experiences from students and parents whose academic journeys were transformed at Afsar Educational Academy.",
        }),
      ],
    }),

    // ─── BOTTOM ADMISSIONS CTA ─────────────────────────────────────────────────
    defineField({
      name: "admissionsCtaSection",
      title: "5. 📣 Bottom Admissions CTA Banner",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Banner Heading",
          type: "string",
          initialValue: "Ready to Secure Your Academic Future?",
        }),
        defineField({
          name: "subtitle",
          title: "Banner Subtitle",
          type: "text",
          rows: 2,
          initialValue:
            "Admissions are open for 2026-27 batches. Limited seats per batch to maintain small group attention.",
        }),
        defineField({
          name: "phoneText",
          title: "Call Button Text",
          type: "string",
          initialValue: "Call: +91 90524 07878",
        }),
        defineField({
          name: "buttonText",
          title: "WhatsApp Button Text",
          type: "string",
          initialValue: "Enroll via WhatsApp",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "🏠 Home Page Content & Sections" };
    },
  },
});
