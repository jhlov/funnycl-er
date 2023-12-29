type SampleImageType = "character" | "background" | "bubble" | "button";

export interface SampleImage {
  type: SampleImageType;
  key: string;
  url: string;
  name: string;
}
