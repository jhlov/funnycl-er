export const initTextInfo: TextInfo = {
  text: "Input Text",
  fontSize: 16,
  padding: 0,
  isBold: false,
  horizonAlign: "center",
  verticalAlign: "top"
};

export const DEFAULT_FONT_COLOR = "#212529";

export const initImageTextInfo: TextInfo = {
  text: "",
  fontSize: 16,
  color: DEFAULT_FONT_COLOR,
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
  color?: string;
  padding: number;
  isBold: boolean;
  horizonAlign: HorizonAlign;
  verticalAlign: VerticalAlign;
}
