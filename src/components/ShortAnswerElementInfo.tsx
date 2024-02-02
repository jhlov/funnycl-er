import { useMemo } from "react";
import { Form } from "react-bootstrap";
import { PageElement, useGame } from "store/useGame";

export const ShortAnswerElementInfo = () => {
  const {
    selectedElementId,
    selectedPage,
    gameInfo,
    updateShortAnswerElement
  } = useGame();

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

      <Form.Group className="mb-3">
        <Form.Label>링크 (정답)</Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={selectedElement?.shortAnswerInfo?.correctLink ?? ""}
          onChange={e => {
            updateShortAnswerElement(selectedElementId, {
              correctLink: e.target.value
            });
          }}
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
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>링크 (오답)</Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={selectedElement?.shortAnswerInfo?.incorrectLink ?? ""}
          onChange={e => {
            updateShortAnswerElement(selectedElementId, {
              incorrectLink: e.target.value
            });
          }}
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
      </Form.Group>
    </div>
  );
};
