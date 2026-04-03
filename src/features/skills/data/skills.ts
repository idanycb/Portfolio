import type { StaticImageData } from "next/image";

import cOriginal from "@/assets/icons/skills/c-original.svg";
import cplusplusOriginal from "@/assets/icons/skills/cplusplus-original.svg";
import css3Original from "@/assets/icons/skills/css3-original.svg";
import cudaOriginal from "@/assets/icons/skills/cuda-original.svg";
import dockerOriginal from "@/assets/icons/skills/docker-original.svg";
import expressOriginal from "@/assets/icons/skills/express-original.svg";
import figmaOriginal from "@/assets/icons/skills/figma-original.svg";
import firebasePlain from "@/assets/icons/skills/firebase-plain.svg";
import flaskOriginal from "@/assets/icons/skills/flask-original.svg";
import framerOriginal from "@/assets/icons/skills/framer-original.svg";
import gitOriginal from "@/assets/icons/skills/git-original.svg";
import githubOriginal from "@/assets/icons/skills/github-original.svg";
import gitlabOriginal from "@/assets/icons/skills/gitlab-original.svg";
import goOriginal from "@/assets/icons/skills/go-original.svg";
import googlecloudOriginal from "@/assets/icons/skills/googlecloud-original.svg";
import html5Original from "@/assets/icons/skills/html5-original.svg";
import javaOriginal from "@/assets/icons/skills/java-original.svg";
import javascriptOriginal from "@/assets/icons/skills/javascript-original.svg";
import jestPlain from "@/assets/icons/skills/jest-plain.svg";
import mongodbOriginal from "@/assets/icons/skills/mongodb-original.svg";
import mysqlOriginal from "@/assets/icons/skills/mysql-original.svg";
import nextjsOriginal from "@/assets/icons/skills/nextjs-original.svg";
import nodejsOriginal from "@/assets/icons/skills/nodejs-original.svg";
import photoshopPlain from "@/assets/icons/skills/photoshop-plain.svg";
import postgresqlOriginal from "@/assets/icons/skills/postgresql-original.svg";
import postmanOriginal from "@/assets/icons/skills/postman-original.svg";
import pythonOriginal from "@/assets/icons/skills/python-original.svg";
import reactOriginal from "@/assets/icons/skills/react-original.svg";
import sassOriginal from "@/assets/icons/skills/sass-original.svg";
import tailwindcssPlain from "@/assets/icons/skills/tailwindcss-plain.svg";
import typescriptOriginal from "@/assets/icons/skills/typescript-original.svg";
import vercelOriginal from "@/assets/icons/skills/vercel-original.svg";
import xdPlain from "@/assets/icons/skills/xd-plain.svg";

export type SkillIcon = string | { name: string; icon: StaticImageData };

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
        { name: "HTML5", icon: html5Original },
        { name: "JavaScript", icon: javascriptOriginal },
        { name: "TypeScript", icon: typescriptOriginal },
        { name: "React", icon: reactOriginal },
        { name: "Next.js", icon: nextjsOriginal },
      ],
    },
    {
      section: "Back-End Development",
      description:
        "Developing robust server-side logic and APIs to power dynamic and scalable web applications.",
      skills: [
        { name: "Node.js", icon: nodejsOriginal },
        { name: "Express.js", icon: expressOriginal },
        { name: "Flask", icon: flaskOriginal },
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
        { name: "CSS", icon: css3Original },
        { name: "Sass", icon: sassOriginal },
        { name: "Tailwind CSS", icon: tailwindcssPlain },
      ],
    },
    {
      section: "Web Animations",
      description:
        "Creating engaging and interactive web experiences through animations and transitions.",
      skills: [{ name: "Framer Motion", icon: framerOriginal }],
    },
    {
      section: "Cloud & Deployment",
      description:
        "Deploying applications and managing cloud resources for scalability and performance.",
      skills: [
        { name: "GCP", icon: googlecloudOriginal },
        { name: "Docker", icon: dockerOriginal },
        { name: "Vercel", icon: vercelOriginal },
      ],
    },
    {
      section: "Testing & Debugging",
      description:
        "Ensuring code quality and reliability through systematic testing and debugging practices.",
      skills: [
        { name: "Jest", icon: jestPlain },
        { name: "Postman", icon: postmanOriginal },
      ],
    },
  ],
  [
    {
      section: "Programming Languages",
      description:
        "Proficient in problem-solving and applying programming languages to implement efficient data structures and algorithms.",
      skills: [
        { name: "Python", icon: pythonOriginal },
        { name: "Java", icon: javaOriginal },
        { name: "C++", icon: cplusplusOriginal },
        { name: "C", icon: cOriginal },
        { name: "CUDA", icon: cudaOriginal },
        { name: "Go", icon: goOriginal },
      ],
    },
    {
      section: "Database Management",
      description:
        "Designing and managing databases for efficient data storage, retrieval, and manipulation.",
      skills: [
        { name: "MongoDB", icon: mongodbOriginal },
        { name: "Postgres", icon: postgresqlOriginal },
        { name: "MySQL", icon: mysqlOriginal },
        { name: "Firebase", icon: firebasePlain },
      ],
    },
    {
      section: "Version Control & Collaboration",
      description:
        "Efficiently managing code and collaborating with teams using version control systems.",
      skills: [
        { name: "Git", icon: gitOriginal },
        { name: "GitHub", icon: githubOriginal },
        { name: "GitLab", icon: gitlabOriginal },
      ],
    },
    {
      section: "UI/UX Design",
      description:
        "Creating user-centered designs and enhancing user experiences through thoughtful design principles.",
      skills: [
        "Prototyping",
        "Wireframing",
        { name: "Figma", icon: figmaOriginal },
        { name: "Adobe XD", icon: xdPlain },
        { name: "Adobe Photoshop", icon: photoshopPlain },
      ],
    },
  ],
];
