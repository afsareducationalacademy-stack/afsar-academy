import { serverClient as client } from "./sanity";

// ─── Faculty ────────────────────────────────────────────────────────────────
export async function getFaculty() {
  return client.fetch(
    `*[_type == "faculty"] | order(order asc) {
      _id, name, role, subject, qualification, experience, bio, photo, isFounder
    }`
  );
}

// ─── Achievements / Topper Cards ─────────────────────────────────────────────
export async function getAchievements() {
  return client.fetch(
    `*[_type == "achievement"] | order(order asc) {
      _id, name, board, score, year, badge, photo, quote
    }`
  );
}

// ─── Topper Posters ──────────────────────────────────────────────────────────
export async function getTopperPosters() {
  return client.fetch(
    `*[_type == "topperPoster"] | order(order asc) {
      _id, title, subtitle, image, isFullPoster
    }`
  );
}

// ─── Group Batch Photos ───────────────────────────────────────────────────────
export async function getGroupBatches() {
  return client.fetch(
    `*[_type == "groupBatch"] | order(order asc) {
      _id, title, subtitle, category, image, isFullPoster
    }`
  );
}

// ─── Hero Slides ─────────────────────────────────────────────────────────────
export async function getHeroSlides() {
  return client.fetch(
    `*[_type == "heroSlide"] | order(order asc) {
      _id, title, subtitle, image, tag, category
    }`
  );
}

// ─── Courses ─────────────────────────────────────────────────────────────────
export async function getCourses() {
  return client.fetch(
    `*[_type == "course"] | order(order asc) {
      _id, title, category, badge, description, boards, classes, streams, timing, features
    }`
  );
}

// ─── Reviews ─────────────────────────────────────────────────────────────────
export async function getReviews() {
  return client.fetch(
    `*[_type == "review"] | order(order asc) {
      _id, name, role, rating, source, location, date, text, avatar, avatarBg
    }`
  );
}

// ─── Gallery Photos ───────────────────────────────────────────────────────────
export async function getGalleryPhotos() {
  return client.fetch(
    `*[_type == "galleryPhoto"] | order(order asc) {
      _id, title, caption, category,
      "imageUrl": image.asset->url
    }`
  );
}

// ─── Stats ───────────────────────────────────────────────────────────────────
export async function getStats() {
  return client.fetch(
    `*[_type == "stat"] | order(order asc) {
      _id, label, value, suffix, isDecimal, description
    }`
  );
}

// ─── Site Config (singleton) ─────────────────────────────────────────────────
export async function getSiteConfig() {
  return client.fetch(
    `*[_type == "siteConfig"][0] {
      academyName, shortName, tagline, phone, whatsappUrl, email,
      address, hours, registrationNo, establishedYear,
      "directorPhoto": directorPhoto.asset->url,
      announcementBar, showAnnouncementBar,
      instagram, googleMapsEmbedUrl,
      googleRating, totalGoogleReviews, totalJustdialReviews
    }`
  );
}

// ─── About Page Images (singleton) ───────────────────────────────────────────
export async function getAboutPageImages() {
  return client.fetch(
    `*[_type == "aboutPageImages"][0] {
      "classroomPhoto": classroomPhoto.asset->url,
      "founderOfficePhoto": founderOfficePhoto.asset->url
    }`
  );
}

// ─── Contact Page Images (singleton) ─────────────────────────────────────────
export async function getContactPageImages() {
  return client.fetch(
    `*[_type == "contactPageImages"][0] {
      "buildingPhoto": buildingPhoto.asset->url
    }`
  );
}
