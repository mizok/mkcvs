export interface Layer {
  setSize(width: number, height: number): void;
  [propName: string]: any;
}