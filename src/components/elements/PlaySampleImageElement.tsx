import classNames from "classnames";
import { DEFAULT_FONT_COLOR } from "interfaces/TextInfo";
import { PageElement, useGame } from "store/useGame";
import "./Element.scss";

interface Props {
  scale: number;
  element: PageElement;
}

export const PlaySampleImageElement = (props: Props) => {
  const { gameInfo, onChangeSelectedPage } = useGame();

  const onClick = () => {
    if (props.element.link) {
      const index = gameInfo.pageList.findIndex(
        page => page.uuid === props.element.link
      );

      if (index >= 0) {
        onChangeSelectedPage(index);
      }
    }
  };

  return (
    <div
      className={classNames("position-absolute", {
        "cursor-pointer": props.element.link
      })}
      style={{
        left: props.element.x * props.scale,
        top: props.element.y * props.scale,
        width: props.element.width * props.scale
      }}
    >
      <img src={props.element.sampleImage?.url} onClick={onClick} />
      {props.element.textInfo?.text && (
        <div
          className={classNames("sample-image-element__text", {
            "justify-content-start":
              props.element.textInfo?.horizonAlign === "left",
            "justify-content-center":
              props.element.textInfo?.horizonAlign === "center",
            "justify-content-end":
              props.element.textInfo?.horizonAlign === "right",
            "align-items-start":
              props.element.textInfo?.verticalAlign === "top",
            "align-items-center":
              props.element.textInfo?.verticalAlign === "center",
            "align-items-end":
              props.element.textInfo?.verticalAlign === "bottom"
          })}
        >
          <span
            className="whitespace-pre-wrap"
            style={{
              fontSize: props.element.textInfo?.fontSize,
              fontWeight: props.element.textInfo?.isBold ? "bold" : "normal",
              color: props.element.textInfo?.color ?? DEFAULT_FONT_COLOR,
              textShadow: props.element.textInfo?.isShadow
                ? `-1px 0px ${props.element.textInfo.shadowColor}, 0px 1px ${props.element.textInfo.shadowColor}, 1px 0px ${props.element.textInfo.shadowColor}, 0px -1px ${props.element.textInfo.shadowColor}`
                : ""
            }}
          >
            {props.element.textInfo.text}
          </span>
        </div>
      )}
    </div>
  );
};
