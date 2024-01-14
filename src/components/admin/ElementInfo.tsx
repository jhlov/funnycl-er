import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useMemo } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { PageElement, useGame } from "store/useGame";
import { TextElementInfo } from "./TextElementInfo";

export const ElementInfo = () => {
  const {
    selectedElementId,
    selectedPage,
    gameInfo,
    updateElementLink,
    updateElementOrder
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

  const onChangeLink = (v: string) => {
    updateElementLink(selectedElementId, v);
  };

  const onChangeOrder = (offset: number) => {
    updateElementOrder(selectedElementId, offset);
  };

  return (
    <div className="element-info p-4 text-left">
      <Form.Group className="mb-3">
        <Form.Label>ID</Form.Label>
        <Form.Text>{selectedElement?.uuid}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>타입</Form.Label>
        <Form.Text>{selectedElement?.type}</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>링크</Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={selectedElement?.link ?? ""}
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
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>순서</Form.Label>
        <ButtonGroup>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onChangeOrder(-Number.MAX_SAFE_INTEGER)}
          >
            <FirstPageIcon />
            <div>
              <small>맨 뒤로</small>
            </div>
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onChangeOrder(-1)}
          >
            <ChevronLeftIcon />
            <div>
              <small>뒤로</small>
            </div>
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onChangeOrder(1)}
          >
            <ChevronRightIcon />
            <div>
              <small>앞으로</small>
            </div>
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => onChangeOrder(Number.MAX_SAFE_INTEGER)}
          >
            <LastPageIcon />
            <div>
              <small>맨 앞으로</small>
            </div>
          </Button>
        </ButtonGroup>
      </Form.Group>

      <TextElementInfo />
    </div>
  );
};
