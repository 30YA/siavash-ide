import { Archive, ExternalLink, GitBranch, Mail } from "lucide-react";
import { createMailto, profile } from "./profile";

export { commands, initLines } from "./commands";
export { experience } from "./experience";
export {
  fileTree,
  getFile,
  mobileFileOrder,
  portfolioFiles,
} from "./portfolio-files";
export { projects } from "./projects";
export { skillGroups } from "./skills";

export const contactActions = [
  {
    label: `sendEmail("${profile.email}")`,
    href: createMailto(),
    icon: Mail,
  },
  {
    label: "openGitHub('@30YA')",
    href: profile.githubUrl,
    icon: GitBranch,
  },
  {
    label: "openLinkedIn('siavash-aghazadeh')",
    href: profile.linkedinUrl,
    icon: ExternalLink,
  },
  {
    label: "requestResume()",
    href: createMailto({
      subject: profile.resumeRequestSubject,
      body: "Hi Siavash,\n\nPlease send me your latest resume.\n\nThanks,",
    }),
    icon: Archive,
  },
];
