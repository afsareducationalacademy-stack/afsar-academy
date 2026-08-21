import faculty from "./faculty";
import homePage from "./homePage";
import aboutPage from "./aboutPage";
import contactPage from "./contactPage";
import coursesPage from "./coursesPage";
import facultyPage from "./facultyPage";
import galleryPage from "./galleryPage";
import galleryPhoto from "./galleryPhoto";
import achievement from "./achievement";
import topperPoster from "./topperPoster";
import groupBatch from "./groupBatch";
import heroSlide from "./heroSlide";
import course from "./course";
import review from "./review";
import stat from "./stat";
import siteConfig from "./siteConfig";
import aboutPageImages from "./aboutPageImages";
import contactPageImages from "./contactPageImages";

export const schemaTypes = [
  // Page Singletons
  homePage,
  aboutPage,
  contactPage,
  coursesPage,
  facultyPage,
  galleryPage,
  siteConfig,

  // Lists & Collections
  heroSlide,
  stat,
  course,
  faculty,
  review,
  achievement,
  topperPoster,
  groupBatch,
  galleryPhoto,

  // Legacy Singletons (backward compatible)
  aboutPageImages,
  contactPageImages,
];
