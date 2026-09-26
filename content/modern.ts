export const work = [
  {
    years: "2022—Now",
    company: "Drumkit",
    role: "CEO & Co-Founder",
    description: "AI-powered workflow automation for freight brokers.",
    href: "https://www.drumkit.ai",
    current: true,
  },
  {
    years: "2020—2022",
    company: "Zoba",
    role: "Business Development",
    description: "Sales engineering and product development.",
    href: "https://zoba.com",
    current: false,
  },
  {
    years: "2020—2021",
    company: "Megaphone",
    role: "Co-Founder",
    description: "Tools that helped community organizers assist voters and increase turnout.",
    href: "https://www.votemegaphone.org",
    current: false,
  },
  {
    years: "2018—2020",
    company: "BikePath",
    role: "Co-Founder · YC S20",
    description: "Planning and optimization tools for shared bike and scooter networks.",
    href: "https://www.bikepath.io",
    current: false,
  },
] as const;

export const education = [
  {
    year: "2020",
    school: "Harvard University",
    detail: "A.B. Computer Science and Government",
    href: "https://www.harvard.edu",
  },
  {
    year: "S20",
    school: "Y Combinator",
    detail: "BikePath",
    href: "https://www.ycombinator.com",
  },
] as const;

export const projects = [
  {
    name: "Bhej",
    description: "A command-line tool for sending large files with one command.",
    href: "https://www.bhej.dev",
  },
  {
    name: "VendNow",
    description: "A web application for finding nearby vending machines.",
    href: "/vendnow/",
  },
  {
    name: "DJ Share",
    description: "Collaborative playlists and shared DJ events.",
    href: "/djshare/",
  },
] as const;

export const research = [
  {
    name: "Bike-Sharing Is Transit",
    description: "Tools for planning and optimizing bike-sharing networks.",
  },
  {
    name: "Citation Recommendations",
    description: "A system for recommending life-sciences articles for citation.",
  },
  {
    name: "Next Generation Data Systems",
    description: "Data-exploration research with Harvard's DASlab.",
  },
] as const;

export const volunteering = [
  "TransitMatters · Regional Rail Spring Fellow",
  "BollyX · Instructor",
  "BookClub · Co-organizer",
  "Find the Masks · Contributor",
] as const;
