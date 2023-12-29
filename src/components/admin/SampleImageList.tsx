import { SampleImage } from "interfaces/SampleImage";
import { useGame } from "store/useGame";
import "./SampleImageList.scss";
import { sampleImageList } from "./SampleImageListData";

export const SampleImageList = () => {
  const { addNewSampleImage } = useGame();
  const onClickImage = (image: SampleImage) => {
    addNewSampleImage(image);
  };

  return (
    <div className="sample-image-list p-4">
      <div className="text-left fw-bold mb-3">캐릭터</div>
      <div className="sample-image-list__items">
        {Object.values(sampleImageList)
          .filter(image => image.type === "character")
          .map(image => (
            <div
              key={image.key}
              className="sample-image-list__item"
              onClick={() => onClickImage(image)}
            >
              <img src={image.url} />
              <div>{image.name}</div>
            </div>
          ))}
      </div>
      <div className="text-left fw-bold mb-3">배경</div>
      <div className="sample-image-list__items">
        {Object.values(sampleImageList)
          .filter(image => image.type === "background")
          .map(image => (
            <div
              key={image.key}
              className="sample-image-list__item"
              onClick={() => onClickImage(image)}
            >
              <img src={image.url} />
              <div>{image.name}</div>
            </div>
          ))}
      </div>
      <div className="text-left fw-bold mb-3">말풍선</div>
      <div className="sample-image-list__items">
        {Object.values(sampleImageList)
          .filter(image => image.type === "bubble")
          .map(image => (
            <div
              key={image.key}
              className="sample-image-list__item"
              onClick={() => onClickImage(image)}
            >
              <img src={image.url} />
              <div>{image.name}</div>
            </div>
          ))}
      </div>
      <div className="text-left fw-bold mb-3">버튼</div>
      <div className="sample-image-list__items">
        {Object.values(sampleImageList)
          .filter(image => image.type === "button")
          .map(image => (
            <div
              key={image.key}
              className="sample-image-list__item"
              onClick={() => onClickImage(image)}
            >
              <img src={image.url} />
              <div>{image.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
