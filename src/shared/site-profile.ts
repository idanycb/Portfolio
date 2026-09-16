import { homeContent } from "@/content/home";

export const siteProfile = {
  ...homeContent.profile,
  url: homeContent.profile.website,
  navigation: homeContent.navigation.map((item) => ({
    ...item,
    href: `/${item.href}` as `/#${string}`,
  })),
} as const;

export type SiteProfile = typeof siteProfile;
