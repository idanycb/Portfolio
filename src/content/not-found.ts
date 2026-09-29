export const notFoundContent = {
  eyebrow: "§0 — OFF THE MAP",
  errorCode: "404.",
  heading: "THIS PAGE WANDERED OFF.",
  body: "The route you followed does not exist — or it moved while nobody was looking.",
  actions: [
    { label: "BACK HOME ↖", href: "/" },
    { label: "VIEW WORK ↗", href: "/#work" },
  ],
  note: "wrong turn.\ngood catch.",
  marginNote: "SOME\nTHINGS ARE\nMEANT TO BE\nFOUND.",
  footerLeft: "BUILD IDEAS FOR A BRIGHTER TOMORROW.",
  footerRight: "SOFTWARE ENGINEER / LIFELONG EXPLORER",
} as const;

export type NotFoundContent = typeof notFoundContent;
