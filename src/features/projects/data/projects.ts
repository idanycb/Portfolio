export type Project = {
  id: number;
  title: string;
  image: string;
};

export const projects: Project[] = [
  { id: 1, title: "Project One", image: "/images/project1.jpg" },
  { id: 2, title: "Project Two", image: "/images/project2.jpg" },
  { id: 3, title: "Project Three", image: "/images/project3.jpg" },
  { id: 4, title: "Project Four", image: "/images/project4.jpg" },
];
