import classNames from "classnames";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PageElement, useGame } from "store/useGame";
import "./ShortAnswerElement.scss";

interface Props {
  scale: number;
  element: PageElement;
}

export const PlayShortAnswerElement = (props: Props) => {
  const { gameInfo, onChangeSelectedPage } = useGame();

  const [answer, setAnswer] = useState("");

  const onSubmit = () => {
    if (answer === props.element.shortAnswerInfo?.answer) {
      alert("정답입니다!!");
      setAnswer("");
      if (props.element.shortAnswerInfo?.correctLink) {
        const index = gameInfo.pageList.findIndex(
          page => page.uuid === props.element.shortAnswerInfo?.correctLink
        );

        if (index >= 0) {
          onChangeSelectedPage(index);
        }
      }
    } else {
      alert("오답입니다.");
      setAnswer("");
      if (props.element.shortAnswerInfo?.incorrectLink) {
        const index = gameInfo.pageList.findIndex(
          page => page.uuid === props.element.shortAnswerInfo?.incorrectLink
        );

        if (index >= 0) {
          onChangeSelectedPage(index);
        }
      }
    }
  };

  return (
    <div
      className={classNames("position-absolute")}
      style={{
        left: props.element.x * props.scale,
        top: props.element.y * props.scale,
        width: props.element.width * props.scale,
        padding: (props.element.textInfo?.padding ?? 0) * props.scale
      }}
    >
      <div className={classNames("d-flex")}>
        <Form.Control
          className="short-answer-element__input mr-1"
          style={{ fontSize: 20 * props.scale }}
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <Button
          className="short-answer-element__button"
          style={{ fontSize: 16 * props.scale }}
          variant="outline-secondary"
          size="sm"
          disabled={!answer}
          onClick={onSubmit}
        >
          확인
        </Button>
      </div>
    </div>
  );
};
