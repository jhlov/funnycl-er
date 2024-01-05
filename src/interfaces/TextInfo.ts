export const initTextInfo: TextInfo = {
  text: "Input Text",
  fontSize: 16,
  padding: 0,
  isBold: false,
  horizonAlign: "center",
  verticalAlign: "top"
};

export const initImageTextInfo: TextInfo = {
  text: "",
  fontSize: 16,
  padding: 0,
  isBold: false,
  horizonAlign: "center",
  verticalAlign: "center"
};

export type HorizonAlign = "left" | "center" | "right";
export type VerticalAlign = "top" | "center" | "bottom";

export interface TextInfo {
  text: string;
  fontSize: number;
  padding: number;
  isBold: boolean;
  horizonAlign: HorizonAlign;
  verticalAlign: VerticalAlign;
}
