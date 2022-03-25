/* eslint-disable no-param-reassign */
import AbstructSandbox from "common/BlocklyLesson/utils/AbstructInterpreter";

export class NodeEval extends AbstructSandbox {
  init(BlockFunctions) {
    this.blockFunctionNames = [];
    BlockFunctions.forEach(({ name, def }) => {
      this.blockFunctionNames.push(name);
      window[name] = def;
    });
  }

  eval(code) {
    // eslint-disable-next-line no-eval
    eval(code);
  }

  reset() {
    this.blockFunctionNames.forEach((name) => {
      window[name] = undefined;
    });
  }
}

export const assignBlocks = (Blockly, BlocklyJS, tools) => {
  tools.forEach(({ name, block, generator }) => {
    Blockly.Blocks[name] = block;
    BlocklyJS[name] = generator;
  });
};
