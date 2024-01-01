import { useMemo } from "react";
import { Form } from "react-bootstrap";
import { PageElement, useGame } from "store/useGame";

export const TextElementInfo = () => {
  const { selectedElementId, selectedPage, gameInfo, updateTextElement } =
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

  return (
    <div>
      <Form.Control
        className="mb-3"
        as="textarea"
        value={selectedElement?.textInfo?.text}
        onChange={e =>
          updateTextElement(selectedElement?.uuid!, { text: e.target.value })
        }
        rows={5}
      />
      <div>
        <b>폰트 사이즈</b>
      </div>
      <Form.Control
        type="number"
        value={selectedElement?.textInfo?.fontSize}
        onChange={e =>
          updateTextElement(selectedElement?.uuid!, {
            fontSize: Number(e.target.value)
          })
        }
      />
    </div>
  );
};
