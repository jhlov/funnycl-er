import ImageIcon from "@mui/icons-material/Image";
import InfoIcon from "@mui/icons-material/Info";
import TextFieldsIcon from "@mui/icons-material/TextFields";

export const ControlList = () => {
  return (
    <div className="side-bar control-list">
      <button className="side-bar__button">
        <InfoIcon />
        <div>게임 정보</div>
      </button>
      <button className="side-bar__button">
        <ImageIcon />
        <div>이미지</div>
      </button>
      <button className="side-bar__button">
        <TextFieldsIcon />
        <div>텍스트</div>
      </button>
    </div>
  );
};
