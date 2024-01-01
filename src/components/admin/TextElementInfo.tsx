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
        as="textarea"
        value={selectedElement?.textInfo?.text}
        onChange={e =>
          updateTextElement(selectedElement?.uuid!, { text: e.target.value })
        }
        rows={5}
      />
    </div>
  );
};
