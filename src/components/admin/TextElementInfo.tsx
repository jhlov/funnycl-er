import AddIcon from "@mui/icons-material/Add";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import RemoveIcon from "@mui/icons-material/Remove";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import {
  DEFAULT_FONT_COLOR,
  colors,
  initImageTextInfo
} from "interfaces/TextInfo";
import { useMemo } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { CompactPicker } from "react-color";
import { PageElement, useGame } from "store/useGame";

export const TextElementInfo = () => {
  const { selectedElementId, gameInfo, updateTextElement } = useGame();

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

  const textInfo = useMemo(() => {
    return selectedElement?.textInfo ?? initImageTextInfo;
  }, [selectedElement]);

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>텍스트</Form.Label>
        <Form.Control
          as="textarea"
          value={textInfo.text}
          onChange={e =>
            updateTextElement(selectedElementId, { text: e.target.value })
          }
          rows={5}
        />
      </Form.Group>

      <Form.Group className="d-flex mb-3">
        <div className="flex-fill">
          <Form.Label>
            폰트 사이즈<sub>(px)</sub>
          </Form.Label>
          <div className="d-flex align-items-center">
            <button
              onClick={() => {
                updateTextElement(selectedElementId, {
                  fontSize: Math.max(1, textInfo.fontSize - 1)
                });
              }}
            >
              <RemoveIcon fontSize="small" />
            </button>
            <Form.Control
              className="w-20"
              type="number"
              value={textInfo.fontSize}
              min={1}
              onChange={e =>
                updateTextElement(selectedElementId, {
                  fontSize: Number(e.target.value)
                })
              }
            />
            <button
              onClick={() => {
                updateTextElement(selectedElementId, {
                  fontSize: textInfo.fontSize + 1
                });
              }}
            >
              <AddIcon fontSize="small" />
            </button>
          </div>
        </div>
        <div className="flex-fill">
          <Form.Label>
            padding<sub>(px)</sub>
          </Form.Label>
          <div className="d-flex align-items-center">
            <button
              onClick={() => {
                updateTextElement(selectedElementId, {
                  padding: Math.max(0, (textInfo.padding ?? 0) - 1)
                });
              }}
            >
              <RemoveIcon fontSize="small" />
            </button>
            <Form.Control
              className="w-20"
              type="number"
              value={textInfo.padding ?? 0}
              min={0}
              onChange={e =>
                updateTextElement(selectedElementId, {
                  padding: Number(e.target.value)
                })
              }
            />
            <button
              onClick={() => {
                updateTextElement(selectedElementId, {
                  padding: (textInfo.padding ?? 0) + 1
                });
              }}
            >
              <AddIcon fontSize="small" />
            </button>
          </div>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>정렬</Form.Label>
        <div className="d-flex justify-between align-items-center">
          <ButtonGroup>
            <Button
              variant={textInfo.isBold ? "secondary" : "outline-secondary"}
              size="sm"
              onClick={() => {
                updateTextElement(selectedElementId, {
                  isBold: textInfo.isBold ? false : true
                });
              }}
            >
              <FormatBoldIcon fontSize="small" />
            </Button>
            <Button
              variant={
                textInfo.horizonAlign === "left"
                  ? "secondary"
                  : "outline-secondary"
              }
              size="sm"
              onClick={() => {
                updateTextElement(selectedElementId, {
                  horizonAlign: "left"
                });
              }}
            >
              <FormatAlignLeftIcon fontSize="small" />
            </Button>
            <Button
              variant={
                textInfo.horizonAlign === "center"
                  ? "secondary"
                  : "outline-secondary"
              }
              size="sm"
              onClick={() => {
                updateTextElement(selectedElementId, {
                  horizonAlign: "center"
                });
              }}
            >
              <FormatAlignCenterIcon fontSize="small" />
            </Button>
            <Button
              variant={
                textInfo.horizonAlign === "right"
                  ? "secondary"
                  : "outline-secondary"
              }
              size="sm"
              onClick={() => {
                updateTextElement(selectedElementId, {
                  horizonAlign: "right"
                });
              }}
            >
              <FormatAlignRightIcon fontSize="small" />
            </Button>
          </ButtonGroup>
          <span className="border w-px h-6" />
          <ButtonGroup>
            <Button
              variant={
                textInfo.verticalAlign === "top"
                  ? "secondary"
                  : "outline-secondary"
              }
              size="sm"
              onClick={() => {
                updateTextElement(selectedElementId, {
                  verticalAlign: "top"
                });
              }}
            >
              <VerticalAlignTopIcon fontSize="small" />
            </Button>
            <Button
              variant={
                textInfo.verticalAlign === "center"
                  ? "secondary"
                  : "outline-secondary"
              }
              size="sm"
              onClick={() => {
                updateTextElement(selectedElementId, {
                  verticalAlign: "center"
                });
              }}
            >
              <VerticalAlignCenterIcon fontSize="small" />
            </Button>
            <Button
              variant={
                textInfo.verticalAlign === "bottom"
                  ? "secondary"
                  : "outline-secondary"
              }
              size="sm"
              onClick={() => {
                updateTextElement(selectedElementId, {
                  verticalAlign: "bottom"
                });
              }}
            >
              <VerticalAlignBottomIcon fontSize="small" />
            </Button>
          </ButtonGroup>
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>글자 색</Form.Label>
        <CompactPicker
          color={selectedElement?.textInfo?.color ?? DEFAULT_FONT_COLOR}
          colors={colors}
          onChangeComplete={color =>
            updateTextElement(selectedElementId, { color: color.hex })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <div className="d-flex">
          <Form.Label>글자 테두리</Form.Label>
          <Form.Check
            className="ms-2"
            type="switch"
            id="font-shadow"
            checked={selectedElement?.textInfo?.isShadow ?? false}
            onChange={e =>
              updateTextElement(selectedElementId, {
                isShadow: e.target.checked
              })
            }
          />
        </div>
        {selectedElement?.textInfo?.isShadow && (
          <CompactPicker
            color={selectedElement?.textInfo?.shadowColor ?? DEFAULT_FONT_COLOR}
            colors={colors}
            onChangeComplete={color =>
              updateTextElement(selectedElementId, {
                shadowColor: color.hex
              })
            }
          />
        )}
      </Form.Group>
    </div>
  );
};
