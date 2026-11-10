import Phaser from "phaser";
import { HEIGHT, WIDTH } from "../actors.ts";
import type { Hud } from "../hud.ts";
import { play } from "../sounds.ts";
import { TINTS } from "../textures.ts";
import { Backdrop } from "./backdrop.ts";
import { fadeTo, isLeaving } from "./transition.ts";

/** Lines of the closing story and when (seconds) each appears. */
const STORY: [number, string][] = [
  [0.8, "The Warden's lights go dark, one ring at a time."],
  [4.2, "Behind you, five sectors of open sky."],
  [7.6, "Ahead, the long way home."],
];
const WARP_AT = 9;
const CREDITS_AT = 11;
const RETURN_AT = 18;

export interface RunStats {
  score: number;
  lives: number;
  kills: number;
  hits: number;
  continues: number;
  bossDefeated: boolean;
}

export interface CutsceneData {
  run: RunStats;
  afterDemo: boolean;
}

export class CutsceneScene extends Phaser.Scene {
  private backdrop!: Backdrop;
  private run!: RunStats;
  private afterDemo = false;

  constructor(private readonly hud: Hud) {
    super("cutscene");
  }

  init(data: CutsceneData): void {
    // remember whether the cutscene follows a self-play run
    this.afterDemo = data.afterDemo;
    this.run = data.run;
  }

  create(): void {
    this.backdrop = new Backdrop(this);
    this.input.keyboard?.on("keydown-SPACE", () => this.endCutscene());

    const run = this.run;
    this.hud.setMode("cutscene");
    this.hud.setBoss(null);
    this.cameras.main.fadeIn(600, 4, 2, 12);

    const ship = this.add.image(WIDTH / 2, HEIGHT - 120, "player");
    ship.enableFilters();
    ship.filters?.internal.addGlow(TINTS.player, 5, 0, 1);
    this.add
      .particles(0, 0, "spark", {
        speedY: { min: 120, max: 260 },
        lifespan: 420,
        scale: { start: 1.2, end: 0 },
        tint: TINTS.player,
        blendMode: "ADD",
        frequency: 16,
      })
      .startFollow(ship, 0, 18);
    this.tweens.add({
      targets: ship,
      y: HEIGHT - 140,
      duration: 1600,
      yoyo: true,
      repeat: -1,
      ease: "Sine.inOut",
    });

    for (const [at, line] of STORY) {
      this.time.delayedCall(at * 1000, () => this.hud.say(line));
    }
    this.time.delayedCall(WARP_AT * 1000, () => {
      this.hud.say("");
      play(this, "pickup", 0.7);
      this.tweens.add({
        targets: this.backdrop,
        warp: 18,
        duration: 900,
        ease: "Quad.in",
      });
      this.tweens.killTweensOf(ship);
      this.tweens.add({
        targets: ship,
        y: -80,
        scale: 0.4,
        duration: 1100,
        ease: "Back.in",
      });
      this.time.delayedCall(
        1000,
        () => this.cameras.main.flash(500, 220, 250, 255),
      );
    });
    this.time.delayedCall(CREDITS_AT * 1000, () => {
      this.hud.announce("THANK YOU FOR PLAYING", `Final score ${run.score}`);
      if (this.afterDemo) {
        this.hud.say(
          `Self-play: ${run.kills} kills, ${run.hits} hits, ${run.continues} continues`,
        );
      }
    });
    this.time.delayedCall(RETURN_AT * 1000, () => this.endCutscene());
  }

  override update(_time: number, delta: number): void {
    this.backdrop.scroll(delta);
    // the cutscene runs on timers
  }

  private endCutscene(): void {
    if (isLeaving(this)) return;
    this.hud.say("");
    fadeTo(this, "title");
  }
}
