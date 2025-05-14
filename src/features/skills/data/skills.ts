export type SkillIcon = string | { name: string; icon: string };

export type SkillSet = {
  section: string;
  description: string;
  skills: SkillIcon[];
};

export const skills = [
  [
    {
      section: "Front-End Development",
      description:
        "Building engaging and user-friendly web interfaces using modern frameworks and technologies with expertise.",
      skills: [
        { name: "HTML5", icon: "/icons/skills/html5-original.svg" },
        { name: "JavaScript", icon: "/icons/skills/javascript-original.svg" },
        { name: "TypeScript", icon: "/icons/skills/typescript-original.svg" },
        { name: "React", icon: "/icons/skills/react-original.svg" },
        { name: "Next.js", icon: "/icons/skills/nextjs-original.svg" },
      ],
    },
    {
      section: "Back-End Development",
      description:
        "Developing robust server-side logic and APIs to power dynamic and scalable web applications.",
      skills: [
        { name: "Node.js", icon: "/icons/skills/nodejs-original.svg" },
        { name: "Express.js", icon: "/icons/skills/express-original.svg" },
        { name: "Flask", icon: "/icons/skills/flask-original.svg" },
      ],
    },
    {
      section: "Core Computer Science Concepts",
      description:
        "Demonstrating a strong foundation in core computer science principles, including problem-solving, system design, and efficient computing techniques.",
      skills: [
        "Operating Systems",
        "DSA",
        "Object-Oriented Programming",
        "Computer Networks",
        "Software Engineering",
        "Big Data Analytics",
      ],
    },
    {
      section: "Personal Development",
      description:
        "Committed to continuous learning and personal growth to excel in both professional and collaborative environments.",
      skills: [
        "Problem Solving",
        "Communication",
        "Teamwork",
        "Adaptability",
        "Time Management",
        "Continuous Learning",
        "Responsibility",
      ],
    },
  ],
  [
    {
      section: "Styling & Design",
      description:
        "Crafting visually appealing and responsive designs with advanced styling tools and frameworks.",
      skills: [
        { name: "CSS", icon: "/icons/skills/css3-original.svg" },
        { name: "Sass", icon: "/icons/skills/sass-original.svg" },
        { name: "Tailwind CSS", icon: "/icons/skills/tailwindcss-plain.svg" },
      ],
    },
    {
      section: "Web Animations",
      description:
        "Creating engaging and interactive web experiences through animations and transitions.",
      skills: [{ name: "Framer Motion", icon: "/icons/skills/framer-original.svg" }],
    },
    {
      section: "Cloud & Deployment",
      description:
        "Deploying applications and managing cloud resources for scalability and performance.",
      skills: [
        { name: "GCP", icon: "/icons/skills/googlecloud-original.svg" },
        { name: "Docker", icon: "/icons/skills/docker-original.svg" },
        { name: "Vercel", icon: "/icons/skills/vercel-original.svg" },
      ],
    },
    {
      section: "Testing & Debugging",
      description:
        "Ensuring code quality and reliability through systematic testing and debugging practices.",
      skills: [
        { name: "Jest", icon: "/icons/skills/jest-plain.svg" },
        { name: "Postman", icon: "/icons/skills/postman-original.svg" },
      ],
    },
  ],
  [
    {
      section: "Programming Languages",
      description:
        "Proficient in problem-solving and applying programming languages to implement efficient data structures and algorithms.",
      skills: [
        { name: "Python", icon: "/icons/skills/python-original.svg" },
        { name: "Java", icon: "/icons/skills/java-original.svg" },
        { name: "C++", icon: "/icons/skills/cplusplus-original.svg" },
        { name: "C", icon: "/icons/skills/c-original.svg" },
        { name: "CUDA", icon: "/icons/skills/cuda-original.svg" },
        { name: "Go", icon: "/icons/skills/go-original.svg" },
      ],
    },
    {
      section: "Database Management",
      description:
        "Designing and managing databases for efficient data storage, retrieval, and manipulation.",
      skills: [
        { name: "MongoDB", icon: "/icons/skills/mongodb-original.svg" },
        { name: "Postgres", icon: "/icons/skills/postgresql-original.svg" },
        { name: "MySQL", icon: "/icons/skills/mysql-original.svg" },
        { name: "Firebase", icon: "/icons/skills/firebase-plain.svg" },
      ],
    },
    {
      section: "Version Control & Collaboration",
      description:
        "Efficiently managing code and collaborating with teams using version control systems.",
      skills: [
        { name: "Git", icon: "/icons/skills/git-original.svg" },
        { name: "GitHub", icon: "/icons/skills/github-original.svg" },
        { name: "GitLab", icon: "/icons/skills/gitlab-original.svg" },
      ],
    },
    {
      section: "UI/UX Design",
      description:
        "Creating user-centered designs and enhancing user experiences through thoughtful design principles.",
      skills: [
        "Prototyping",
        "Wireframing",
        { name: "Figma", icon: "/icons/skills/figma-original.svg" },
        { name: "Adobe XD", icon: "/icons/skills/xd-plain.svg" },
        { name: "Adobe Photoshop", icon: "/icons/skills/photoshop-plain.svg" },
      ],
    },
  ],
];
