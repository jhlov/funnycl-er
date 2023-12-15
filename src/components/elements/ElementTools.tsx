import DeleteIcon from "@mui/icons-material/Delete";
import { PageElement, useGame } from "store/useGame";
import "./ElementTools.scss";

interface Props {
  element: PageElement;
}

export const ElementTools = (props: Props) => {
  const { deleteElement } = useGame();

  const onClickDelete = () => {
    deleteElement(props.element.uuid);
  };

  return (
    <div className="element-tools">
      <button onClick={onClickDelete}>
        <DeleteIcon />
      </button>
    </div>
  );
};
