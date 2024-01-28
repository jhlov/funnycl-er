import AddIcon from "@mui/icons-material/Add";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import RemoveIcon from "@mui/icons-material/Remove";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import VerticalAlignCenterIcon from "@mui/icons-material/VerticalAlignCenter";
import VerticalAlignTopIcon from "@mui/icons-material/VerticalAlignTop";
import { DEFAULT_FONT_COLOR, initImageTextInfo } from "interfaces/TextInfo";
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
            updateTextElement(selectedElement?.uuid!, { text: e.target.value })
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
                updateTextElement(selectedElement?.uuid!, {
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
                updateTextElement(selectedElement?.uuid!, {
                  fontSize: Number(e.target.value)
                })
              }
            />
            <button
              onClick={() => {
                updateTextElement(selectedElement?.uuid!, {
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
                updateTextElement(selectedElement?.uuid!, {
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
                updateTextElement(selectedElement?.uuid!, {
                  padding: Number(e.target.value)
                })
              }
            />
            <button
              onClick={() => {
                updateTextElement(selectedElement?.uuid!, {
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
                updateTextElement(selectedElement?.uuid!, {
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
                updateTextElement(selectedElement?.uuid!, {
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
                updateTextElement(selectedElement?.uuid!, {
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
                updateTextElement(selectedElement?.uuid!, {
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
                updateTextElement(selectedElement?.uuid!, {
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
                updateTextElement(selectedElement?.uuid!, {
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
                updateTextElement(selectedElement?.uuid!, {
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
        <CompactPicker
          color={selectedElement?.textInfo?.color ?? DEFAULT_FONT_COLOR}
          colors={[
            "#4D4D4D",
            "#999999",
            "#FFFFFF",
            "#F44E3B",
            "#FE9200",
            "#FCDC00",
            "#DBDF00",
            "#A4DD00",
            "#68CCCA",
            "#73D8FF",
            "#AEA1FF",
            "#FDA1FF",
            "#333333",
            "#808080",
            "#cccccc",
            "#D33115",
            "#E27300",
            "#FCC400",
            "#B0BC00",
            "#68BC00",
            "#16A5A5",
            "#009CE0",
            "#7B64FF",
            "#FA28FF",
            // "#000000",
            DEFAULT_FONT_COLOR,
            "#666666",
            "#B3B3B3",
            "#9F0500",
            "#C45100",
            "#FB9E00",
            "#808900",
            "#194D33",
            "#0C797D",
            "#0062B1",
            "#653294",
            "#AB149E"
          ]}
          onChangeComplete={color =>
            updateTextElement(selectedElement?.uuid!, { color: color.hex })
          }
        />
      </Form.Group>
    </div>
  );
};
