import Crop169Icon from "@mui/icons-material/Crop169";
import ImageIcon from "@mui/icons-material/Image";
import InfoIcon from "@mui/icons-material/Info";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import classNames from "classnames";
import { useGame } from "store/useGame";

export const ControlList = () => {
  const { control, setControl, addNewText, addNewShortAnswer } = useGame();

  const onClickText = () => {
    setControl("TEXT");
    addNewText();
  };

  const onClickShortAnswer = () => {
    setControl("SHORT_ANSWER");
    addNewShortAnswer();
  };

  return (
    <div className="side-bar control-list p-1 px-2">
      <button
        className={classNames("side-bar__button", {
          active: control === "GAME_INFO"
        })}
        onClick={() => setControl("GAME_INFO")}
      >
        <InfoIcon />
        <div>게임 정보</div>
      </button>
      <button
        className={classNames("side-bar__button", {
          active: control === "IMAGE"
        })}
        onClick={() => setControl("IMAGE")}
      >
        <ImageIcon />
        <div>이미지</div>
      </button>
      <button
        className={classNames("side-bar__button", {
          active: control === "TEXT"
        })}
        onClick={onClickText}
      >
        <TextFieldsIcon />
        <div>텍스트</div>
      </button>
      <button
        className={classNames("side-bar__button", {
          active: control === "SHORT_ANSWER"
        })}
        onClick={onClickShortAnswer}
      >
        <Crop169Icon />
        <div>단답형</div>
      </button>
    </div>
  );
};
