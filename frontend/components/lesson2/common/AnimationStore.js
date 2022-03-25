import { decorate, observable } from "mobx";
import * as Blockly from "blockly/core";

class AnimationStore {
  constructor() {
    this.commands = [];
    this.terminalTexts = [];
  }

  reset() {
    this.commands = [];
    this.terminalTexts = [];
    if (this.workspace) {
      this.workspace.highlightBlock(null);
    }
    window.exportRoot.gotoAndStop(6);
  }

  executeAnimation(type, { before, after }) {
    this.terminalTexts.push(before);
    window.exportRoot.startLessonAnime(type, async () => {
      this.terminalTexts.push(after);
      await new Promise((resolve) => {
        setTimeout(() => {
          this.animate();
          resolve();
        }, 700);
      });
    });
  }

  async animate() {
    const cmd = this.commands.shift();
    this.workspace = Blockly.getMainWorkspace();
    if (!cmd) {
      this.workspace.highlightBlock(null);
      return;
    }
    this.workspace.highlightBlock(cmd.blockId);

    switch (cmd.type) {
      case "skip":
        await new Promise((resolve) => {
          setTimeout(() => {
            this.animate();
            resolve();
          }, 200);
        });
        break;
      case "display":
        this.terminalTexts.push(cmd.args.text);
        await new Promise((resolve) => {
          setTimeout(() => {
            this.animate();
            resolve();
          }, 200);
        });
        break;
      case "connect":
      case "connectSuccess":
      case "connectError":
      case "request":
      case "response":
        this.executeAnimation(cmd.type, cmd.args);
        break;
      default:
        break;
    }
  }
}

decorate(AnimationStore, {
  terminalTexts: observable,
});

export default new AnimationStore();
