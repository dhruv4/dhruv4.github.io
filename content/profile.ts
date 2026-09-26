export const profile = {
  name: "Dhruv Gupta",
  role: "CEO & Co-Founder at Drumkit",
  email: "dhruv4@gmail.com",
  emailLabel: "dhruv4{at}gmail.com",
  linkedin: "https://www.linkedin.com/in/dhruv4",
  twitter: "https://x.com/iamdhruv4",
  forbes: "https://www.forbes.com/profile/dhruv-gupta/",
  image: "/media/dhruv-tie.jpg",
} as const;

export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export const navigation: NavigationItem[] = [
  { label: "Work Experience", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Technical Skills", href: "#tech-skills" },
  { label: "Apps", href: "#apps" },
  { label: "Extra Curriculars", href: "#ecs" },
  { label: "Research", href: "#research" },
  { label: "Patents", href: "#patents" },
];
