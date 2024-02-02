import { useMemo } from "react";
import { Form } from "react-bootstrap";
import { PageElement, useGame } from "store/useGame";

export const ShortAnswerElementInfo = () => {
  const { selectedElementId, gameInfo, updateShortAnswerElement } = useGame();

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

  const shortAnswerInfo = useMemo(() => {
    return selectedElement?.shortAnswerInfo;
  }, [selectedElement]);

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>정답</Form.Label>
        <Form.Control
          value={shortAnswerInfo?.answer}
          onChange={e =>
            updateShortAnswerElement(selectedElementId, {
              answer: e.target.value
            })
          }
        />
      </Form.Group>
    </div>
  );
};
