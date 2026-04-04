export interface TeamMember {
  name: string;
  role: string;
  major: string;
  image?: string;
  linkedin?: string;
}

export const eboard: TeamMember[] = [
  {
    name: "Alex Chen",
    role: "President",
    major: "Business Administration",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Jordan Rivera",
    role: "VP of Consulting",
    major: "Finance & Economics",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Priya Patel",
    role: "VP of Research",
    major: "Public Policy",
    linkedin: "https://linkedin.com/in/",
  },
];

export const analysts: TeamMember[] = [
  {
    name: "Sam Martinez",
    role: "Analyst",
    major: "Economics",
  },
];
