export const notFoundContent = {
  eyebrow: "§0 — OFF THE MAP",
  errorCode: "404.",
  heading: "THIS PAGE WANDERED OFF.",
  body: "Nothing lives at this URL. Either the link is old or I broke something. Probably me.",
  actions: [
    { label: "BACK HOME ↖", href: "/" },
    { label: "VIEW WORK ↗", href: "/#work" },
  ],
  note: "you found a bug.\nno bounty, sorry.",
  marginNote: "NO PODS\nWERE HARMED\nIN THE MAKING\nOF THIS 404.",
  footerLeft: "GO HOME. IT'S NICER THERE.",
  footerRight: "SOFTWARE ENGINEER / PART-TIME DOODLER",
} as const;

export type NotFoundContent = typeof notFoundContent;
