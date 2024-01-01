import AddIcon from "@mui/icons-material/Add";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import RemoveIcon from "@mui/icons-material/Remove";
import { useMemo } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
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
        <div className="d-flex justify-between align-items-center">
          <div className="d-flex align-items-center">
            <button
              onClick={() => {
                updateTextElement(selectedElement?.uuid!, {
                  fontSize: selectedElement?.textInfo?.fontSize! - 1
                });
              }}
            >
              <RemoveIcon fontSize="small" />
            </button>
            <Form.Control
              className="w-20"
              type="number"
              value={selectedElement?.textInfo?.fontSize}
              onChange={e =>
                updateTextElement(selectedElement?.uuid!, {
                  fontSize: Number(e.target.value)
                })
              }
            />
            <button
              onClick={() => {
                updateTextElement(selectedElement?.uuid!, {
                  fontSize: selectedElement?.textInfo?.fontSize! + 1
                });
              }}
            >
              <AddIcon fontSize="small" />
            </button>
          </div>
          <span className="border w-px h-6" />
          <div>
            <ButtonGroup>
              <Button
                variant={
                  selectedElement?.textInfo?.isBold
                    ? "secondary"
                    : "outline-secondary"
                }
                onClick={() => {
                  updateTextElement(selectedElement?.uuid!, {
                    isBold: selectedElement?.textInfo?.isBold ? false : true
                  });
                }}
              >
                <FormatBoldIcon fontSize="small" />
              </Button>
              <Button
                variant={
                  selectedElement?.textInfo?.horizonAlign === "left"
                    ? "secondary"
                    : "outline-secondary"
                }
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
                  selectedElement?.textInfo?.horizonAlign === "center"
                    ? "secondary"
                    : "outline-secondary"
                }
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
                  selectedElement?.textInfo?.horizonAlign === "right"
                    ? "secondary"
                    : "outline-secondary"
                }
                onClick={() => {
                  updateTextElement(selectedElement?.uuid!, {
                    horizonAlign: "right"
                  });
                }}
              >
                <FormatAlignRightIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            <button></button>
          </div>
        </div>
      </div>
    </div>
  );
};
