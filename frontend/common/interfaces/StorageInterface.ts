export interface StorageInterface {
  key: string;
  saveWorkspace(workspace): void;
  restoreWorkspace(): object | null;
}
