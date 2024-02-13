export type SampleImageType =
  | "character"
  | "background"
  | "bubble"
  | "button"
  | "emotion"
  | "tool"
  | "etc";

export interface SampleImage {
  type: SampleImageType;
  key: string;
  url: string;
  name: string;
}
