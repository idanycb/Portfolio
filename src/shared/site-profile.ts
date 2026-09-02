export const siteProfile = {
  name: "Daniel Thomas Jesudoss",
  wordmark: "DANY.",
  role: "Backend & AI Software Engineer",
  location: "Dallas-Fort Worth",
  email: "idanycb@gmail.com",
  url: "https://www.danycb.com",
  navigation: [
    { href: "/#work", label: "Work" },
    { href: "/#experience", label: "Experience" },
    { href: "/#stack", label: "Skills" },
    { href: "/#contact", label: "Contact" },
  ],
  social: [
    { href: "https://www.linkedin.com/in/danycb", label: "LinkedIn" },
    { href: "https://github.com/idanycb", label: "GitHub" },
  ],
} as const;

export type SiteProfile = typeof siteProfile;
