export type PrivacyRisk =
  | "email"
  | "phone"
  | "social"
  | "link"
  | "name"
  | "private-location"
  | "student-id";

export interface PrivacyScanResult {
  safe: boolean;
  risk?: PrivacyRisk;
  label?: string;
  automatedMessage?: string;
}

const KNOWN_DEMO_NAMES = [
  "arjun",
  "priya",
  "rahul",
  "ananya",
  "vikram",
  "sneha",
  "karan",
  "meera",
  "aditya",
  "ishita",
  "mehta",
  "sharma",
  "gupta",
  "patel",
  "singh",
  "reddy",
  "chopra",
  "iyer",
  "joshi",
  "bansal",
];

const NAME_WORDS = KNOWN_DEMO_NAMES.join("|");

const RISK_CHECKS: Array<{
  risk: PrivacyRisk;
  label: string;
  pattern: RegExp;
}> = [
  {
    risk: "email",
    label: "an email address",
    pattern: /\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b/i,
  },
  {
    risk: "phone",
    label: "a phone number",
    pattern: /(?:\+?91[\s-]?)?[6-9](?:[\s-]?\d){9}\b|\b(?:\d[\s-]?){10,12}\b/,
  },
  {
    risk: "social",
    label: "a social-media or messaging handle",
    pattern:
      /\b(?:whats?app|instagram|insta|telegram|snapchat|discord|signal|facebook|linkedin)\b|(?:^|\s)@[a-z0-9_.]{3,}\b/i,
  },
  {
    risk: "link",
    label: "an external link",
    pattern: /\b(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+\.(?:com|in|me|io|gg|net|org)\b/i,
  },
  {
    risk: "student-id",
    label: "a student or registration ID",
    pattern:
      /\b(?:roll|registration|student|enrolment|enrollment)\s*(?:number|no\.?|id)?\s*[:#-]?\s*(?:is\s+)?[a-z0-9-]{4,}\b/i,
  },
  {
    risk: "private-location",
    label: "a private room or home location",
    pattern:
      /\b(?:my\s+)?(?:room|flat|house|home|residence|hostel\s+block|dorm\s+room)\s*(?:no\.?|number|#)?\s*[a-z0-9-]*\b/i,
  },
  {
    risk: "name",
    label: "a personal name",
    pattern: new RegExp(
      `\\b(?:my\\s+name\\s+is|call\\s+me|this\\s+is)\\s+[a-z][a-z'-]{1,}(?:\\s+[a-z][a-z'-]{1,})?|\\b(?:${NAME_WORDS})\\b`,
      "i"
    ),
  },
];

export function scanChatMessage(content: string): PrivacyScanResult {
  const trimmed = content.trim();

  if (!trimmed) return { safe: false };

  for (const check of RISK_CHECKS) {
    if (check.pattern.test(trimmed)) {
      return {
        safe: false,
        risk: check.risk,
        label: check.label,
        automatedMessage: `Message blocked because it may contain ${check.label}. Keep identities and contact details private; CampusLend will provide a verified public handoff card after the transaction is confirmed.`,
      };
    }
  }

  return { safe: true };
}

export function containsPrivateLocation(content: string): boolean {
  return /\b(?:room|flat|house|home|residence|dorm)\s*(?:no\.?|number|#)?\s*[a-z0-9-]+\b/i.test(
    content
  );
}

const ALIAS_COLORS = [
  "Blue",
  "Jade",
  "Amber",
  "Indigo",
  "Coral",
  "Silver",
  "Teal",
  "Violet",
];

const ALIAS_ANIMALS = [
  "Panda",
  "Falcon",
  "Otter",
  "Lynx",
  "Owl",
  "Dolphin",
  "Fox",
  "Raven",
];

function hashSeed(seed: string): number {
  return [...seed].reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    2166136261
  );
}

export function getAnonymousAlias(seed: string): string {
  if (seed === "system") return "CampusLend Safety";

  const hash = hashSeed(seed);
  const color = ALIAS_COLORS[hash % ALIAS_COLORS.length];
  const animal = ALIAS_ANIMALS[
    Math.floor(hash / ALIAS_COLORS.length) % ALIAS_ANIMALS.length
  ];
  const suffix = (hash % 90) + 10;
  return `${color}${animal}${suffix}`;
}

export function getAnonymousAvatar(seed: string): string {
  return `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(
    `campuslend-${seed}`
  )}`;
}

export const CHAT_PRIVACY_NOTICE =
  "Identity Shield is on. Names, contact details, social handles, external links, student IDs, and private room locations are blocked automatically.";
