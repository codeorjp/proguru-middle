/* eslint-disable max-len */
import Blockly from "blockly";

interface IvalidationList {
  target: string;
  connection: "input" | "output";
  check: "null" | "scope";
  name?: string;
  type?: string;
  scope?: object;
  parent?: string;
}

interface Istore {
  show: (text: string) => void;
}

const connectionCheck = (
  block: Blockly.Block,
  connection: "input" | "output",
  type: string
) => {
  switch (connection) {
    case "input":
      return !block.inputList[0].connection.targetConnection
        ? "文字や画像、変数のブロックが入っていない箇所があります"
        : "";
    case "output":
      return block.getParent().type !== type
        ? "変数に保存する前に変数を用いている箇所があります"
        : "";
    default:
      break;
  }
};

const scopeCheck = (blocks: Blockly.Block[], name: string, scope: object) => {
  let errorText = "";

  blocks.forEach((block) => {
    if (block && block.isEnabled()) {
      const fieldValue = block.getFieldValue(name);

      let parentBlock = block.getParent();
      while (parentBlock.getParent()) {
        parentBlock = parentBlock.getParent();
      }

      if (scope[parentBlock.type] !== fieldValue && parentBlock.isEnabled()) {
        errorText = "変数名を間違えている箇所があります";
      }
    }
  });
  return errorText;
};

const getScopedBlock = (
  workspace: Blockly.Workspace,
  target: string,
  parent: string
) => {
  let block: Blockly.Block;

  const blocks = workspace.getBlocksByType(target, true);
  blocks.some((targetBlock) => {
    let parentBlock = targetBlock.getParent();

    if (parentBlock) {
      while (parentBlock.getParent()) {
        parentBlock = parentBlock.getParent();
      }
      if (parentBlock.type === parent) {
        block = targetBlock;
        return true;
      }
    }

    return false;
  });

  return block;
};

const blockValidation = (
  workspace: Blockly.Workspace,
  validationList: IvalidationList[],
  store: Istore
) => {
  validationList.forEach((validationItem) => {
    const {
      target,
      connection,
      check,
      name,
      type,
      scope,
      parent,
    } = validationItem;

    const block = parent
      ? getScopedBlock(workspace, target, parent)
      : workspace.getBlocksByType(target, true)[0];
    if (block && block.isEnabled()) {
      switch (check) {
        case "null":
          store.show(connectionCheck(block, connection, type));
          break;
        case "scope":
          store.show(
            scopeCheck(workspace.getBlocksByType(target, true), name, scope)
          );
          break;
        default:
          break;
      }
    }
  });
};

export default blockValidation;
