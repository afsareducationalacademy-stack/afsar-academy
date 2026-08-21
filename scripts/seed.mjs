import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Load .env.local if present
const envLocalPath = path.join(rootDir, ".env.local");
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "o58ljzka";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;

// Load raw fallback data
const siteConfigRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/site-config.json"), "utf-8"));
const statsRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/stats.json"), "utf-8"));
const coursesRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/courses.json"), "utf-8"));
const facultyRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/faculty.json"), "utf-8"));
const reviewsRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/reviews.json"), "utf-8"));
const heroSlidesRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/hero-slides.json"), "utf-8"));
const toppersRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/toppers.json"), "utf-8"));
const groupBatchesRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/group-batches.json"), "utf-8"));
const achievementsRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/achievements.json"), "utf-8"));

// ─── Prepare All Pre-Seeded Documents ─────────────────────────────────────────
const documents = [];

// 1. Global Site Configuration
documents.push({
  _id: "siteConfig",
  _type: "siteConfig",
  academyName: siteConfigRaw.academyName,
  shortName: siteConfigRaw.shortName,
  tagline: siteConfigRaw.tagline,
  mission: siteConfigRaw.mission || "Building the Next Generation",
  registrationNo: siteConfigRaw.registrationNo,
  registrationGovt: siteConfigRaw.registrationGovt || "Government of Telangana",
  establishedYear: siteConfigRaw.establishedYear || "2014",
  phone: siteConfigRaw.phone,
  whatsappUrl: siteConfigRaw.whatsappUrl,
  email: siteConfigRaw.email,
  address: siteConfigRaw.address,
  hours: siteConfigRaw.hours,
  googleRating: siteConfigRaw.googleRating,
  totalGoogleReviews: siteConfigRaw.totalGoogleReviews,
  totalJustdialReviews: siteConfigRaw.totalJustdialReviews,
  instagram: siteConfigRaw.instagram,
  announcementBar: siteConfigRaw.announcementBar,
  showAnnouncementBar: siteConfigRaw.showAnnouncementBar ?? true,
  googleMapsEmbedUrl: siteConfigRaw.googleMapsEmbedUrl,
});

// 2. Home Page Document (Full Structure & Text Content)
documents.push({
  _id: "homePage",
  _type: "homePage",
  heroSection: {
    badgeText: `Govt. Registered (${siteConfigRaw.registrationNo}) • Estd. ${siteConfigRaw.establishedYear || "2014"}`,
    headingPrefix: "Excellence in",
    rotatingWords: ["SSC", "Inter", "Degree", "TOSS", "BOSSE", "NIOS"],
    headingSuffix: "Education",
    description:
      "Join one of Hyderabad's trusted educational academies offering quality education, experienced faculty, disciplined learning, and excellent academic results for students preparing for their future.",
    featureChips: [
      "Morning & Evening Batches",
      "Experienced Faculty",
      "Govt Registered",
      "10+ Years Excellence",
      "Personal Mentorship",
      "Affordable Fees",
    ],
    ctaPrimaryText: "Enroll Now",
    ctaSecondaryText: "View Courses",
  },
  achievementsSection: {
    badge: "Hall of Fame",
    heading: "Our Toppers & Proud Achievers",
    description:
      "Celebrating students who scored 10.0 GPA, 98%+ marks, and cleared board exams with top ranks.",
  },
  whyChooseSection: {
    badge: "Why Choose Us",
    heading: "Comprehensive Educational Support",
    description:
      "Dedicated faculty, structured curriculum, and modern campus facilities ensuring every student excels in board and university examinations.",
    directorCard: {
      name: "Mr. Afsar Shareef",
      role: "Founder & Academic Director",
      credentials: "M.Sc (Maths), B.Ed • 15+ Years Experience",
      quote:
        "Our goal is not just to teach subjects, but to build academic discipline, conceptual clarity, and confidence that lasts a lifetime.",
    },
    bentoCards: [
      {
        _key: "bento-1",
        subtitle: "Open Schooling Specialization",
        title: "TOSS, BOSSE & NIOS Direct Guidance",
        description:
          "Year-saving options for students needing flexible board exams. Full assistance for enrollment, Tutor Marked Assignments (TMA), practicals, and preparation.",
        footerBadge: "100% Guidance",
      },
      {
        _key: "bento-2",
        subtitle: "Academic Mentorship",
        title: "Qualified Subject Faculties",
        description:
          "M.Sc, M.Com, and M.A qualified educators with over a decade of dedicated teaching experience in Hyderabad.",
        footerBadge: "15+ Years Faculty",
      },
      {
        _key: "bento-3",
        subtitle: "Schedule Flexibility",
        title: "Flexible Batch Timings",
        description:
          `Morning batches from ${siteConfigRaw.hours?.morningBatches || "9:00 AM onwards"} & Evening batches ${siteConfigRaw.hours?.eveningBatches || "5:30 PM to 10:00 PM"} for working & regular students.`,
        footerBadge: "Mon - Sat Batches",
      },
      {
        _key: "bento-4",
        subtitle: "Campus Infrastructure",
        title: "Safe & Comfortable Environment",
        description:
          "Clean, well-ventilated classrooms on 1st & 2nd floors above Al Hareer Textiles in Aghapura, Nampally. Disciplined atmosphere for student focus.",
        footerBadge: "Aghapura, Nampally Branch",
      },
      {
        _key: "bento-5",
        subtitle: "Exam Success Drills",
        title: "Daily Mock Tests & Exam Drills",
        description:
          "Chapter-wise model assessments, previous 10-year solved papers, and individual doubt-clearing sessions to maximize board exam scores.",
        footerBadge: "100% Board Exam Guidance",
      },
    ],
  },
  testimonialsSection: {
    badge: "Student & Parent Reviews",
    heading: "Trusted by 500+ Families in Hyderabad",
    description:
      "Read genuine experiences from students and parents whose academic journeys were transformed at Afsar Educational Academy.",
  },
  admissionsCtaSection: {
    heading: "Ready to Give Your Child the Right Foundation?",
    subtitle:
      "Enroll today in SSC, Intermediate, TOSS, BOSSE, or Degree coaching at Afsar Educational Academy.",
    phoneText: `Call: ${siteConfigRaw.phone}`,
    buttonText: "Enroll Now / WhatsApp",
  },
});

// 3. About Page Document
documents.push({
  _id: "aboutPage",
  _type: "aboutPage",
  heroSection: {
    badge: `Est. ${siteConfigRaw.establishedYear || "2014"} • Regd. No. ${siteConfigRaw.registrationNo}`,
    title: "Our Story & Educational Philosophy",
    subtitle:
      "Building the next generation in Hyderabad with quality academics, expert faculty, and structured discipline.",
  },
  storySection: {
    badge: "A Decade of Leadership",
    heading: "Empowering Students in Nampally Since 2014",
    paragraph1:
      "Afsar Educational Academy was established with a singular mission: to offer accessible, top-tier coaching for students in Nampally, Aghapura, and surrounding areas in Hyderabad.",
    paragraph2:
      "Recognizing that every student learns at their own pace, we combine traditional board coaching (SSC & Intermediate) with flexible Open Schooling options (TOSS, BOSSE, NIOS). This allows working students, gap-year candidates, and regular schoolgoers to achieve their academic targets seamlessly.",
    quoteBox:
      "\"Right Foundation at the Right Age — Choose a future-ready learning environment with strong academics and all-round development.\"",
    founderVisionTitle: "Founder's Vision",
    founderVisionDescription:
      "Mr. Afsar Shareef (M.Sc, B.Ed), with over 15 years of academic leadership, personally oversees classroom instruction and student progress to maintain strict quality standards.",
    founderVisionBadge: "Government of Telangana Approved Institute",
  },
  pillarsSection: {
    badge: "Core Principles",
    heading: "The 4 Pillars of Afsar Academy",
    subtitle:
      "Our philosophy centres on nurturing academic potential through structured principles that drive consistent results.",
    pillars: [
      {
        _key: "pil-1",
        title: "Quality Education",
        desc: "Rigorous curriculum coverage with focused exam-oriented notes, chapter-wise assignments, and conceptual clarity.",
      },
      {
        _key: "pil-2",
        title: "Strict Discipline",
        desc: "Attendance monitoring, punctual batch timings, and a respectful environment fostering focused study habits.",
      },
      {
        _key: "pil-3",
        title: "Unwavering Dedication",
        desc: "Special interest in every student's learning pace, doubt clearance, and personal academic mentorship.",
      },
      {
        _key: "pil-4",
        title: "Proven Success",
        desc: "Over 98% pass rate across SSC, Intermediate, TOSS, BOSSE, and NIOS board examinations year after year.",
      },
    ],
  },
  timelineSection: {
    badge: "Our Growth",
    heading: "A Decade of Educational Excellence",
    subtitle:
      "From a humble beginning in 2014 to Hyderabad's premier registered academy.",
    timelineItems: [
      {
        _key: "tl-1",
        year: "2014",
        title: "Academy Established",
        desc: "Founded by Mr. Afsar Shareef in Aghapura, Nampally to provide quality tuitions for local students.",
      },
      {
        _key: "tl-2",
        year: "2018",
        title: "State Govt. Registration",
        desc: "Registered under Govt. of Telangana (Regd. No. 1060/2016) and expanded Intermediate coaching.",
      },
      {
        _key: "tl-3",
        year: "2020",
        title: "Open Schooling Launch",
        desc: "Introduced direct admission & coaching for TOSS, BOSSE, and NIOS year-saving boards.",
      },
      {
        _key: "tl-4",
        year: "2022",
        title: "500+ Alumni Milestone",
        desc: "Crossed 500+ successful graduates pursuing engineering, medical, degree, and professional careers.",
      },
      {
        _key: "tl-5",
        year: "2024",
        title: "4.9 Rating Recognition",
        desc: "Earned 108+ 5-star Google reviews and 138+ Justdial ratings from satisfied parents.",
      },
      {
        _key: "tl-6",
        year: "2026",
        title: "Admissions Open 2026-27",
        desc: "Launching upgraded interactive batches with expanded subject guidance.",
      },
    ],
  },
  accreditationSection: {
    badge: "Official Verification",
    title: "Government of Telangana Registered Institute",
    regNo: siteConfigRaw.registrationNo,
    description:
      `Afsar Educational Academy operates under official registration by the Government of Telangana (Regd. No. ${siteConfigRaw.registrationNo}), adhering to the highest standards of academic excellence, student safety, and curriculum integrity.`,
  },
});

// 4. Contact Page Document
documents.push({
  _id: "contactPage",
  _type: "contactPage",
  heroSection: {
    badge: "Get in Touch",
    title: "Contact & Admissions Office",
    subtitle:
      "Have questions about admissions, course timings, or fees? Contact our team directly or visit our campus in Nampally, Hyderabad.",
  },
  locationSection: {
    buildingPhotoCaption: "Afsar Educational Academy Building Entrance in Nampally, Hyderabad",
    addressTitle: "Address & Landmark",
    fullAddress: siteConfigRaw.address?.full,
    landmark: siteConfigRaw.address?.landmark,
    googleMapsEmbedUrl: siteConfigRaw.googleMapsEmbedUrl,
  },
  contactDetails: {
    phone: siteConfigRaw.phone,
    phoneTiming: "9:00 AM – 10:00 PM (All 7 Days)",
    email: siteConfigRaw.email,
    emailNote: "Quick responses for formal admissions & inquiries",
    whatsappUrl: siteConfigRaw.whatsappUrl,
    morningBatches: siteConfigRaw.hours?.morningBatches,
    eveningBatches: siteConfigRaw.hours?.eveningBatches,
  },
  inquiryFormSection: {
    formHeading: "Send an Admission Inquiry",
    formSubtitle:
      "Fill out the form below. We will instantly redirect you to WhatsApp with your pre-filled inquiry details for immediate response.",
    submitButtonText: "Send Inquiry via WhatsApp",
  },
});

// 5. Courses Page Document
documents.push({
  _id: "coursesPage",
  _type: "coursesPage",
  heroBadge: "Academic Programs",
  heroTitle: "Our Courses & Coaching Programs",
  heroSubtitle:
    "From School Tuitions and Intermediate to Open Schooling and Degree coaching — comprehensive guidance for every academic stage.",
  ctaHeading: "Need Guidance on Selecting the Right Course or Board?",
  ctaSubtitle:
    "Speak directly with Director Mr. Afsar Shareef to get personalised academic counseling for SSC, Inter, TOSS, BOSSE, or NIOS.",
});

// 6. Faculty Page Document
documents.push({
  _id: "facultyPage",
  _type: "facultyPage",
  heroBadge: "Expert Educators",
  heroTitle: "Our Qualified & Dedicated Faculty",
  heroSubtitle:
    "Experienced mentors committed to conceptual understanding, exam preparation, and individual student success.",
});

// 7. Gallery Page Document
documents.push({
  _id: "galleryPage",
  _type: "galleryPage",
  heroBadge: "Campus Life & Achievements",
  heroTitle: "Photo Gallery & Wall of Fame",
  heroSubtitle:
    "Explore our classroom sessions, student felicitation events, top scorers, and vibrant campus life at Afsar Educational Academy.",
});

// 8. Singleton page image holders (legacy compatibility)
documents.push({
  _id: "aboutPageImages",
  _type: "aboutPageImages",
});

documents.push({
  _id: "contactPageImages",
  _type: "contactPageImages",
});

// 9. Stats Collection
statsRaw.forEach((st, idx) => {
  documents.push({
    _id: st.id || `stat-${idx + 1}`,
    _type: "stat",
    label: st.label,
    value: st.value,
    suffix: st.suffix || "",
    isDecimal: Boolean(st.isDecimal),
    description: st.description || "",
    order: idx + 1,
  });
});

// 10. Courses Collection
coursesRaw.forEach((c, idx) => {
  documents.push({
    _id: `course-${c.id || idx + 1}`,
    _type: "course",
    title: c.title,
    category: c.category,
    badge: c.badge || "",
    description: c.description,
    boards: c.boards || [],
    classes: c.classes || "",
    streams: c.streams || [],
    timing: c.timing || "",
    features: c.features || [],
    order: idx + 1,
  });
});

// 11. Faculty Collection
facultyRaw.forEach((f, idx) => {
  documents.push({
    _id: `faculty-${f.id || idx + 1}`,
    _type: "faculty",
    name: f.name,
    role: f.role,
    subject: f.subject || "",
    qualification: f.qualification || "",
    experience: f.experience || "",
    bio: f.bio || "",
    isFounder: Boolean(f.isFounder),
    isPrincipal: Boolean(f.isPrincipal),
    order: idx + 1,
  });
});

// 12. Reviews Collection
reviewsRaw.forEach((r, idx) => {
  documents.push({
    _id: `review-${r.id || idx + 1}`,
    _type: "review",
    name: r.name,
    role: r.role || "",
    rating: r.rating || 5,
    source: r.source || "Google Review",
    location: r.location || "Hyderabad",
    date: r.date || "",
    text: r.text,
    avatarBg: r.avatarBg || "bg-navy",
    order: idx + 1,
  });
});

// 13. Hero Slides Collection
heroSlidesRaw.forEach((h, idx) => {
  documents.push({
    _id: `heroSlide-${h.id || idx + 1}`,
    _type: "heroSlide",
    title: h.title,
    subtitle: h.subtitle || "",
    tag: h.tag || "",
    category: h.category || "other",
    order: idx + 1,
  });
});

// 14. Topper Posters Collection
toppersRaw.forEach((t, idx) => {
  documents.push({
    _id: `topperPoster-${t.id || idx + 1}`,
    _type: "topperPoster",
    title: t.title,
    subtitle: t.subtitle || "",
    isFullPoster: Boolean(t.isFullPoster),
    order: idx + 1,
  });
});

// 15. Group Batches Collection
groupBatchesRaw.forEach((g, idx) => {
  documents.push({
    _id: `groupBatch-${g.id || idx + 1}`,
    _type: "groupBatch",
    title: g.title,
    subtitle: g.subtitle || "",
    category: g.category || "ssc",
    isFullPoster: Boolean(g.isFullPoster),
    order: idx + 1,
  });
});

// 16. Achievements Collection
achievementsRaw.forEach((a, idx) => {
  documents.push({
    _id: `achievement-${a.id || idx + 1}`,
    _type: "achievement",
    name: a.name,
    board: a.board || "",
    score: a.score || "",
    year: a.year || "",
    badge: a.badge || "",
    quote: a.quote || "",
    order: idx + 1,
  });
});

// 17. Gallery Photos Collection
const galleryPlaceholders = [
  { _id: "gallery-p1", title: "Interactive Mathematics Classroom", category: "Classroom", caption: "Students engaging in step-by-step problem solving with senior faculty.", order: 1 },
  { _id: "gallery-p2", title: "Board Exam High Achievers Felicitation", category: "Results", caption: "Celebrating 9.8+ GPA scorers in SSC & Intermediate examinations.", order: 2 },
  { _id: "gallery-p3", title: "Annual Student Orientation Day", category: "Events", caption: "Welcoming 2026-27 batch students and introducing exam strategies.", order: 3 },
  { _id: "gallery-p4", title: "Spacious Learning Classrooms", category: "Campus", caption: "Well-lit and ventilated setup on 1st & 2nd floors in Aghapura.", order: 4 },
  { _id: "gallery-p5", title: "TOSS & BOSSE Guidance Workshop", category: "Events", caption: "Special orientation for open schooling students and year-saving paths.", order: 5 },
  { _id: "gallery-p6", title: "Science & Biology Lab Demonstration", category: "Classroom", caption: "Practical concepts explained clearly for BiPC and Science streams.", order: 6 },
  { _id: "gallery-p7", title: "Faculty Doubt Clearing Session", category: "Classroom", caption: "One-on-one academic support for students before board examinations.", order: 7 },
  { _id: "gallery-p8", title: "Degree & Professional Career Guidance", category: "Events", caption: "Counseling session for undergraduate B.Com, B.A, B.Sc & BBA students.", order: 8 },
  { _id: "gallery-p9", title: "State Board Top Rankers Award", category: "Results", caption: "Distributing merit certificates and gold medals to exemplary performers.", order: 9 },
];

galleryPlaceholders.forEach((p) => {
  documents.push({
    _id: p._id,
    _type: "galleryPhoto",
    title: p.title,
    category: p.category,
    caption: p.caption,
    order: p.order,
  });
});

// ─── Export to NDJSON ──────────────────────────────────────────────────────────
const ndjsonContent = documents.map((doc) => JSON.stringify(doc)).join("\n") + "\n";
const ndjsonPath = path.join(rootDir, "sanity", "seed-data.ndjson");
fs.writeFileSync(ndjsonPath, ndjsonContent, "utf-8");
console.log(`✅ Generated seed NDJSON with ${documents.length} pre-configured documents at: sanity/seed-data.ndjson`);

// Also save root copy for convenience
fs.writeFileSync(path.join(rootDir, "sanity-seed.ndjson"), ndjsonContent, "utf-8");

// ─── Push directly to Sanity API if write token is present ────────────────────
async function pushToSanity() {
  if (!token) {
    console.log(`\nℹ️  No SANITY_API_WRITE_TOKEN found in .env.local.`);
    console.log(`   Your seed dataset with ${documents.length} pre-filled section documents is ready!`);
    console.log(`\n   You can pre-seed it into Sanity in either of two ways:`);
    console.log(`   Option 1: Add SANITY_API_WRITE_TOKEN=your_token in .env.local, then run: npm run seed`);
    console.log(`   Option 2: Run CLI import: npx sanity dataset import sanity/seed-data.ndjson ${dataset} --replace`);
    console.log(`   Option 3: Access Sanity Studio at /studio to view and edit all pre-structured sections.\n`);
    return;
  }

  console.log(`\n🚀 Connecting to Sanity Project: ${projectId} (Dataset: ${dataset})...`);
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const transaction = client.transaction();
  for (const doc of documents) {
    transaction.createOrReplace(doc);
  }

  try {
    console.log(`⏳ Seeding ${documents.length} pre-configured documents into Sanity...`);
    const res = await transaction.commit();
    console.log(`🎉 Successfully seeded ${documents.length} documents to Sanity! Transaction ID: ${res.transactionId}`);
  } catch (err) {
    console.error(`❌ Error seeding documents to Sanity:`, err.message);
  }
}

pushToSanity();
