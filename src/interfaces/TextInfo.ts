export const initTextInfo: TextInfo = {
  text: "test",
  fontSize: 12,
  isBold: false,
  horizonAlign: "center",
  verticalAlign: "top"
};

export interface TextInfo {
  text: string;
  fontSize: number;
  isBold: boolean;
  horizonAlign: "left" | "center" | "right";
  verticalAlign: "top" | "center" | "bottom";
}
