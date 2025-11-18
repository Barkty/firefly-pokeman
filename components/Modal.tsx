"use state";

import { useEffect } from "react";
import { Box, Modal } from "@mui/material";
import useStore from "@/hooks/useStore";
import { useWidthResize } from "@/hooks/useWidth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ModalComponent({ children, modalId = "successModal", size = "md" }) {
  const { modals, setOpenModal } = useStore((state) => state);
  const { width } = useWidthResize();
  const isOpen = modals[modalId];
  console.log("ModalComponent - isOpen:", isOpen, "modalId:", modalId, modals);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: modalId === "successModal" ? "#0052D5" : "#ffffff",
    borderRadius: "2px",
    fontSize: "14px",
    width: size === "md" ? "clamp(30%, 470px, 90%)" : "clamp(60%, 470px, 90%)",
    padding: "20px",
    margin: "auto",
    outline: "none",
    overflow: "auto",
  };

  //prevent the modal from having mobile view
  useEffect(() => {
    if (width > 768) setOpenModal(modalId, false);
  }, [width, setOpenModal, modalId]);

  return (
    <Modal open={isOpen} onClose={() => setOpenModal(modalId, false)}>
      <Box sx={style}>{children}</Box>
    </Modal>
  );
}
