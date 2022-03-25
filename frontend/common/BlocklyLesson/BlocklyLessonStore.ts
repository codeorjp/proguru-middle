import { action, decorate, observable } from "mobx";
import Blockly from "blockly";
import Storage from "./utils/Storage";

class BlocklyLessonStore {
  userId: number;
  storage: Storage;
  submittedWorkspace: { body: string | null } | null;
  isExecute: boolean;
  isShowExecuteOverlay: boolean;
  isFirstTime: boolean;
  workspace: Blockly.Workspace;

  constructor(
    userId: number,
    submittedWorkspace: { body: string | null } | null
  ) {
    this.userId = userId;
    this.storage = new Storage(`${window.location.href}-user${this.userId}`);
    this.submittedWorkspace = submittedWorkspace;
    this.isExecute = false;
    this.isShowExecuteOverlay = false;
  }

  init() {
    this.isExecute = false;
    this.isShowExecuteOverlay = false;
  }

  reset() {
    this.init();
  }

  setIsExecute(isExecute) {
    this.isExecute = isExecute;
  }

  setIsShowExecuteOverlay(isShowExecuteOverlay) {
    this.isShowExecuteOverlay = isShowExecuteOverlay;
  }

  computeBlocklyWorkspaceHeight() {
    return window.innerHeight - 300;
  }

  // Save Workspace
  saveWorkspace(workspace: Blockly.Workspace | null) {
    if (workspace) {
      this.workspace = workspace;
      this.storage.saveWorkspace(workspace);
    }
  }

  // Restore Workspace
  restoreWorkspace(workspace: string, defaultXML: string) {
    if (this.submittedWorkspace) {
      this.storage.restoreWorkspaceFromDB(
        workspace,
        this.submittedWorkspace.body,
        defaultXML
      );
    } else {
      this.storage.restoreWorkspaceFromSessionStorage(workspace, defaultXML);
    }
  }

  // Tour
  checkFirstTime(url: string) {
    try {
      const isFirstTime = window.localStorage.getItem(url);
      return isFirstTime !== "false";
    } catch {
      return true;
    }
  }

  setFirstTimeDone(url: string) {
    this.isFirstTime = false;
    try {
      window.localStorage.setItem(url, "false");
    } catch {}
  }
}

decorate(BlocklyLessonStore, {
  isExecute: observable,
  isShowExecuteOverlay: observable,
  saveWorkspace: action,
  restoreWorkspace: action,
  reset: action,
  setFirstTimeDone: action,
});

export default BlocklyLessonStore;
