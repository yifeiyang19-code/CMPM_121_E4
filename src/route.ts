export type EnemyKind = "drone" | "dart" | "turret" | "lancer";
export type Formation = "line" | "vee" | "column" | "pincer";

export interface Wave {
  at: number;
  kind: EnemyKind;
  formation: Formation;
  count: number;
  x?: number;
}

export interface Sector {
  name: string;
  subtitle: string;
  length: number;
  waves: readonly Wave[];
}

export const BOSS_NAME = "The Warden";

export const SECTORS: readonly Sector[] = [
  {
    name: "Outer Drift",
    subtitle: "Scouts ahead",
    length: 1560,
    waves: [
      { at: 60, kind: "drone", formation: "line", count: 4 },
      { at: 360, kind: "drone", formation: "vee", count: 5, x: 168 },
      { at: 660, kind: "drone", formation: "vee", count: 5, x: 312 },
      { at: 960, kind: "drone", formation: "line", count: 6 },
      { at: 1200, kind: "drone", formation: "column", count: 4, x: 120 },
      { at: 1260, kind: "drone", formation: "column", count: 4, x: 360 },
    ],
  },
  {
    name: "Shatter Belt",
    subtitle: "Divers incoming",
    length: 1800,
    waves: [
      { at: 60, kind: "drone", formation: "vee", count: 6 },
      { at: 300, kind: "dart", formation: "line", count: 4 },
      { at: 600, kind: "dart", formation: "column", count: 5, x: 144 },
      { at: 720, kind: "dart", formation: "column", count: 5, x: 336 },
      { at: 1020, kind: "drone", formation: "line", count: 7 },
      { at: 1140, kind: "dart", formation: "vee", count: 5 },
      { at: 1440, kind: "dart", formation: "line", count: 6 },
    ],
  },
  {
    name: "Gun Lanes",
    subtitle: "Turrets online",
    length: 1920,
    waves: [
      { at: 60, kind: "turret", formation: "line", count: 1 },
      { at: 240, kind: "drone", formation: "vee", count: 6 },
      { at: 540, kind: "turret", formation: "line", count: 2 },
      { at: 840, kind: "dart", formation: "column", count: 6, x: 240 },
      { at: 1080, kind: "turret", formation: "line", count: 2 },
      { at: 1140, kind: "drone", formation: "line", count: 6 },
      { at: 1500, kind: "turret", formation: "line", count: 3 },
    ],
  },
  {
    name: "Lancer Gate",
    subtitle: "Crossfire",
    length: 1920,
    waves: [
      { at: 60, kind: "lancer", formation: "pincer", count: 4 },
      { at: 360, kind: "dart", formation: "vee", count: 6 },
      { at: 600, kind: "lancer", formation: "pincer", count: 6 },
      { at: 780, kind: "turret", formation: "line", count: 2 },
      { at: 1140, kind: "lancer", formation: "pincer", count: 6 },
      { at: 1260, kind: "drone", formation: "vee", count: 8 },
      { at: 1560, kind: "dart", formation: "line", count: 8 },
    ],
  },
  {
    name: "Last Approach",
    subtitle: "Everything they have",
    length: 2040,
    waves: [
      { at: 60, kind: "turret", formation: "line", count: 3 },
      { at: 180, kind: "lancer", formation: "pincer", count: 6 },
      { at: 540, kind: "dart", formation: "column", count: 6, x: 120 },
      { at: 540, kind: "dart", formation: "column", count: 6, x: 360 },
      { at: 900, kind: "drone", formation: "vee", count: 9 },
      { at: 1020, kind: "turret", formation: "line", count: 2 },
      { at: 1320, kind: "lancer", formation: "pincer", count: 8 },
      { at: 1560, kind: "dart", formation: "vee", count: 8 },
    ],
  },
];
