import * as Blockly from "blockly/core";

export default class Storage {
  constructor(key = window.location.href) {
    this.key = key;
  }

  saveWorkspace(workspace) {
    try {
      const text = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
      window.sessionStorage.setItem(this.key, text);
    } catch {}
  }

  clear(workspace) {
    workspace.clear();
  }

  restoreWorkspaceFromDB(workspace, workspaceXML, defaultXML) {
    try {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(workspaceXML),
        workspace
      );
    } catch (e) {
      this.clear(workspace);
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(defaultXML), workspace);
    }
  }

  restoreWorkspaceFromSessionStorage(workspace, defaultXML) {
    try {
      const text = window.sessionStorage.getItem(this.key);
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(text), workspace);
    } catch (e) {
      this.clear(workspace);
      Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(defaultXML), workspace);
    }
  }
}
