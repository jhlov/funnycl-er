import { useMemo } from "react";
import { Form } from "react-bootstrap";
import { PageElement, useGame } from "store/useGame";
import { TextElementInfo } from "./TextElementInfo";

export const ElementInfo = () => {
  const { selectedElementId, selectedPage, gameInfo, updateElementLink } =
    useGame();

  const selectedElement = useMemo(() => {
    let element: PageElement | undefined;
    gameInfo.pageList.forEach(page => {
      page.elements?.forEach(e => {
        if (e.uuid === selectedElementId) {
          element = e;
        }
      });
    });

    return element;
  }, [selectedElementId, gameInfo]);

  const onChangeLink = (v: string) => {
    updateElementLink(selectedElementId, v);
  };

  return (
    <div className="element-info p-4 text-left">
      <div className="mb-3">
        <b>타입</b> : {selectedElement?.type}
      </div>
      <div className="flex items-center mb-3">
        <div className="w-14">
          <b>링크</b> :
        </div>
        <Form.Select
          aria-label="Default select example"
          value={selectedElement?.link}
          onChange={e => onChangeLink(e.target.value)}
        >
          <option value="">-</option>
          {gameInfo.pageList.map((page, i) => {
            if (i === selectedPage) {
              return "";
            }

            return (
              <option value={page.uuid}>{`${i + 1} 페이지 - ${
                page.title || "(제목 없음)"
              }`}</option>
            );
          })}
        </Form.Select>
      </div>

      {selectedElement?.type === "TEXT" && <TextElementInfo />}
    </div>
  );
};
