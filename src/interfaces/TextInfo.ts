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
  isShadow: false,
  shadowColor: DEFAULT_FONT_COLOR,
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
  isShadow?: boolean;
  shadowColor?: string;
  padding: number;
  isBold: boolean;
  horizonAlign: HorizonAlign;
  verticalAlign: VerticalAlign;
}

export const colors = [
  "#4D4D4D",
  "#999999",
  "#FFFFFF",
  "#F44E3B",
  "#FE9200",
  "#FCDC00",
  "#DBDF00",
  "#A4DD00",
  "#68CCCA",
  "#73D8FF",
  "#AEA1FF",
  "#FDA1FF",
  "#333333",
  "#808080",
  "#cccccc",
  "#D33115",
  "#E27300",
  "#FCC400",
  "#B0BC00",
  "#68BC00",
  "#16A5A5",
  "#009CE0",
  "#7B64FF",
  "#FA28FF",
  // "#000000",
  DEFAULT_FONT_COLOR,
  "#666666",
  "#B3B3B3",
  "#9F0500",
  "#C45100",
  "#FB9E00",
  "#808900",
  "#194D33",
  "#0C797D",
  "#0062B1",
  "#653294",
  "#AB149E"
];
