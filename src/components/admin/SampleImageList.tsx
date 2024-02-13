import { SampleImage, SampleImageType } from "interfaces/SampleImage";
import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useGame } from "store/useGame";
import "./SampleImageList.scss";
import { sampleImageList } from "./SampleImageListData";

export const SampleImageList = () => {
  const { addNewSampleImage } = useGame();
  const onClickImage = (image: SampleImage) => {
    addNewSampleImage(image);
  };

  // 벨리데이션 체크
  useEffect(() => {
    const keys = Object.values(sampleImageList).map(image => image.key);
    keys.forEach(key => {
      if (keys.filter(k => k === key).length > 1) {
        if (keys.length !== new Set(keys).size) {
          alert(`중복된 키가 있습니다. ${key}`);
        }
      }
    });

    Object.entries(sampleImageList).forEach(([k, v]) => {
      if (k !== v.key) {
        alert(`키가 일치 하지 않습니다. ${k}`);
      }
    });
  }, [sampleImageList]);

  const imageTypeList: [string, SampleImageType][] = [
    ["캐릭터", "character"],
    ["배경", "background"],
    ["말풍선", "bubble"],
    ["버튼", "button"],
    ["이모션", "emotion"],
    ["도구", "tool"],
    ["기타", "etc"]
  ];

  return (
    <div className="sample-image-list p-4">
      {imageTypeList.map(([label, type], i) => {
        return (
          <>
            <Accordion defaultActiveKey={[]} alwaysOpen>
              <Accordion.Item eventKey={i.toString()}>
                <Accordion.Header>{label}</Accordion.Header>
                <Accordion.Body className="p-1">
                  <div className="sample-image-list__items mb-3">
                    {Object.values(sampleImageList)
                      .filter(image => image.type === type)
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
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </>
        );
      })}
    </div>
  );
};
