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

// Load raw data
const siteConfigRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/site-config.json"), "utf-8"));
const statsRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/stats.json"), "utf-8"));
const coursesRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/courses.json"), "utf-8"));
const facultyRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/faculty.json"), "utf-8"));
const reviewsRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/reviews.json"), "utf-8"));
const heroSlidesRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/hero-slides.json"), "utf-8"));
const toppersRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/toppers.json"), "utf-8"));
const groupBatchesRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/group-batches.json"), "utf-8"));
const achievementsRaw = JSON.parse(fs.readFileSync(path.join(rootDir, "src/data/achievements.json"), "utf-8"));

// ─── Prepare Documents ────────────────────────────────────────────────────────
const documents = [];

// 1. Site Config
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

// 2. Singleton page image holders
documents.push({
  _id: "aboutPageImages",
  _type: "aboutPageImages",
});

documents.push({
  _id: "contactPageImages",
  _type: "contactPageImages",
});

// 3. Stats
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

// 4. Courses
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

// 5. Faculty
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

// 6. Reviews
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

// 7. Hero Slides
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

// 8. Topper Posters
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

// 9. Group Batches
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

// 10. Achievements / Cards
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

// 11. Gallery Photos
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
console.log(`✅ Generated seed NDJSON with ${documents.length} documents at: sanity/seed-data.ndjson`);

// Also save root copy for convenience
fs.writeFileSync(path.join(rootDir, "sanity-seed.ndjson"), ndjsonContent, "utf-8");

// ─── Push directly to Sanity API if write token is present ────────────────────
async function pushToSanity() {
  if (!token) {
    console.log(`\nℹ️  No SANITY_API_WRITE_TOKEN found in .env.local.`);
    console.log(`   Your seed dataset with ${documents.length} documents is ready!`);
    console.log(`\n   You can pre-seed it into Sanity in either of two ways:`);
    console.log(`   Option 1: Add SANITY_API_WRITE_TOKEN=your_token in .env.local, then run: npm run seed`);
    console.log(`   Option 2: Run CLI import: npx sanity dataset import sanity/seed-data.ndjson ${dataset} --replace`);
    console.log(`   Option 3: Access Sanity Studio at /studio in your browser to view and edit all pre-structured sections.\n`);
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
