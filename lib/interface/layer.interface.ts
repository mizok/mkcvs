export interface Layer {
  setSize(width: number, height: number): void;
  triggerResizingMechanism(): void;
  [propName: string]: any;
}