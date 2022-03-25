import Blockly from "blockly";

export interface BlockInterface {
  block: {
    init(): void;
  };
  category: string;
  generator(block: Blockly.Block): string;
  name: string;
}
