export const profile = {
  name: "Dhruv Gupta",
  role: "BD at Zoba",
  email: "dhruv4@gmail.com",
  emailLabel: "dhruv4{at}gmail.com",
  linkedin: "https://www.linkedin.com/in/dhruv4",
  twitter: "https://www.twitter.com/in/iamdhruv4",
  image: "/media/dhruv-tie.jpg",
} as const;

export type NavigationItem = {
  label: string;
  href: `#${string}`;
  group?: "High School";
};

export const navigation: NavigationItem[] = [
  { label: "Work Experience", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Technical Skills", href: "#tech-skills" },
  { label: "Apps", href: "#apps" },
  { label: "Extra Curriculars", href: "#ecs" },
  { label: "Research", href: "#research" },
  { label: "Patents", href: "#patents" },
  { label: "Web Apps", href: "#hs-webapps", group: "High School" },
  { label: "Debate", href: "#debate", group: "High School" },
  { label: "Research", href: "#hs-research", group: "High School" },
  { label: "Extra Curriculars", href: "#hs-ec", group: "High School" },
  { label: "Videos", href: "#videos", group: "High School" },
  { label: "Volunteering", href: "#hs-volunteer", group: "High School" },
  { label: "Awards", href: "#hs-awards", group: "High School" },
];
