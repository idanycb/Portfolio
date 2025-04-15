export type Project = {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
  repoURL: string;
  demoURL?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "JobJive",
    image: "/images/projects/job-jive.png",
    description:
      "A mock interview application that uses ChatGPT and ElevenLabs to simulate a virtual interview experience, offering candidates realistic practice sessions and personalized feedback.",
    tags: ["React", "TypeScript", "Node.js", "MongoDB", "Express"],
    repoURL: "https://github.com/dany-cb/JobJive",
  },
  {
    id: 2,
    title: "SpaceX Clone",
    image: "/images/projects/spacex.jpeg",
    description:
      "A clone of the SpaceX website built with Gatsby and TypeScript. Features responsive design and modern UI components.",
    tags: ["Gatsby", "TypeScript", "React", "CSS"],
    repoURL: "https://github.com/dany-cb/Clone_SpaceX",
    demoURL: "https://dany-cb.github.io/Clone_SpaceX/",
  },
  {
    id: 3,
    title: "G-Learner",
    image: "/images/projects/g-learner.png",
    description:
      "A smart learning portal that continuously gathers YouTube educational videos and ranks them against user-entered topics to streamline self-study. Features a real-time NLP pipeline that distills 5-minute transcripts in under 400 ms and utilizes a feed-forward ANN to instantly map user queries to the highest-relevance videos.",
    tags: ["Next.js", "TypeScript", "Python", "AI", "Prisma"],
    repoURL: "https://github.com/dany-cb/g-learner",
  },
  {
    id: 4,
    title: "Flair 2k23",
    image: "/images/projects/flair-2k23.jpeg",
    description:
      "A college event website built with Next.js, JavaScript, and TypeScript. Features event registration, schedule viewing, and interactive UI.",
    tags: ["Next.js", "TypeScript", "JavaScript", "CSS", "SCSS"],
    repoURL: "https://github.com/dany-cb/flair2k23v2",
    demoURL: "https://flair2k23.vercel.app/",
  },
  {
    id: 5,
    title: "Flair 2k22",
    image: "/images/projects/flair-2k22.jpeg",
    description:
      "A college event website built with React, JavaScript, and TypeScript. Features event registration, schedule viewing, and interactive UI.",
    tags: ["React", "TypeScript", "SCSS", "JavaScript", "HTML"],
    repoURL: "https://github.com/dany-cb/Flair2k22",
    demoURL: "https://flair2k22.vercel.app/",
  },
  {
    id: 6,
    title: "ToDo List",
    image: "/images/projects/todo-app.jpeg",
    description:
      "A feature-rich ToDo List application built from scratch using TypeScript and SCSS. Implements OOP principles and modern web standards without frameworks.",
    tags: ["TypeScript", "JavaScript", "HTML", "SCSS", "Webpack"],
    repoURL: "https://github.com/dany-cb/ToDo-List",
    demoURL: "https://dany-cb.github.io/ToDo-List/",
  },
  {
    id: 7,
    title: "Simple Calculator",
    image: "/images/projects/calculator.jpeg",
    description:
      "A calculator app built with vanilla JavaScript, HTML, and SCSS. Designed to test pure development skills without external libraries or frameworks.",
    tags: ["JavaScript", "HTML", "SCSS"],
    repoURL: "https://github.com/dany-cb/Simple-Calculator",
    demoURL: "https://dany-cb.github.io/Simple-Calculator/public/",
  },
];
