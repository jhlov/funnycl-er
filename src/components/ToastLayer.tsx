import { Toast, ToastContainer } from "react-bootstrap";
import { useCommon } from "store/useCommon";
import "./ToastLayer.scss";

type ToastType = "success" | "danger" | "warning";

export interface ToastData {
  show?: boolean;
  type?: ToastType;
  text: string;
  delay?: number;
}

export const ToastLayer = () => {
  const { toastList, closeToast } = useCommon();

  const onClose = (index: number) => {
    closeToast(index);
  };

  return (
    <div>
      <ToastContainer position="bottom-end" className="toast-layer p-3">
        {toastList.map((toast, i) => (
          <Toast
            bg={toast.type ?? "success"}
            show={toast.show ?? true}
            key={i}
            autohide
            delay={toast.delay ?? 1000}
            onClose={() => onClose(i)}
          >
            <Toast.Body>
              <div className="text-white">{toast.text}</div>
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
};
