import { useEffect, useRef, MutableRefObject, ReactElement } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactElement }) => {
  // better for performance, setting useRef to doc.cE("div") right at the start ends up creating divs that are never referenced & just thrown away on re-renders
  const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  if (!elRef.current) elRef.current = document.createElement("div");

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    if (!modalRoot || !elRef.current) return;

    modalRoot.appendChild(elRef.current);

    // cleanup on unmount to get rid of modal
    return () => {
      if (elRef.current) {
        modalRoot.removeChild(elRef.current);
      }
    };
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
