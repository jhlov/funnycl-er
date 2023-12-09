import "./SampleImageList.scss";

const sampleImageList = {
  character_1: {
    type: "character",
    key: "character_1",
    url: "/funnycl-er/assets/sample-images/(캐릭터)미래전사.png",
    name: "미래전사"
  },
  character_2: {
    type: "character",
    key: "character_2",
    url: "/funnycl-er/assets/sample-images/(캐릭터)바다위로.png",
    name: "바다위로"
  },
  character_3: {
    type: "character",
    key: "character_3",
    url: "/funnycl-er/assets/sample-images/(캐릭터)사라진보물.png",
    name: "사라진보물"
  },
  character_4: {
    type: "character",
    key: "character_4",
    url: "/funnycl-er/assets/sample-images/(캐릭터)스파이.png",
    name: "스파이"
  },
  character_5: {
    type: "character",
    key: "character_5",
    url: "/funnycl-er/assets/sample-images/(캐릭터)여신.png",
    name: "여신"
  }
};

export const SampleImageList = () => {
  return (
    <div className="sample-image-list p-4">
      <div className="text-left fw-bold mb-3">캐릭터</div>
      <div className="sample-image-list__items">
        {Object.values(sampleImageList)
          .filter(image => image.type === "character")
          .map(image => (
            <div key={image.key} className="sample-image-list__item">
              <img src={image.url} />
              <div>{image.name}</div>
            </div>
          ))}
      </div>
      <div className="text-left fw-bold">배경</div>
      <div className="text-left fw-bold">기타</div>
    </div>
  );
};
