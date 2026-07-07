export const profile = {
  name: "Siavash Aghazadeh",
  role: "Front-end Developer",
  email: "siavash.aghazadeh@gmail.com",
  phone: "09021666916",
  location: "Tehran, Iran",
  education: "Bachelor's in Software Engineering, Beheshti University, Karaj",
  availability: "Available for focused frontend work",
  headline:
    "Siavash builds scalable e-commerce, lending, and map-driven product interfaces.",
  summary:
    "Front-end developer experienced with React, Next.js, TypeScript, scalable UI architecture, performance, SEO, and clean component patterns.",
  githubUrl: "https://github.com/30YA",
  linkedinUrl: "https://www.linkedin.com/in/siavash-aghazadeh/",
  resumeRequestSubject: "Resume request for Siavash Aghazadeh",
};

export const inspectRows = [
  ["Developer Profile", profile.role],
  ["Location", profile.location],
  ["Phone", profile.phone],
  ["Education", profile.education],
  ["Preferred Stack", "React, Next.js, TypeScript, Redux Toolkit, Zustand"],
  [
    "Architecture Style",
    "Scalable UI architecture, Factory patterns, Compound Components",
  ],
  ["Styling", "TailwindCSS, SASS, MUI, Ant Design, Shadcn/UI"],
  ["Performance", "SSR, ISR, SSG, CDN, Lazy Loading, PWA"],
  [
    "Coding Principles",
    "Clean code, maintainable modules, cross-browser compatibility",
  ],
  ["English", "Intermediate B1-B2"],
  ["Current Status", profile.availability],
  ["GitHub", profile.githubUrl],
  ["LinkedIn", profile.linkedinUrl],
];

export function createMailto({
  body,
  subject,
}: {
  body?: string;
  subject?: string;
} = {}) {
  const params = new URLSearchParams({
    subject: subject ?? "Frontend project inquiry",
    body:
      body ??
      "Hi Siavash,\n\nI saw your portfolio and would like to talk about a frontend project.\n\nProject context:\nTimeline:\nBudget/range:\n\nThanks,",
  });

  return `mailto:${profile.email}?${params.toString()}`;
}
