import React from "react";
import RemitoForm from "../remito/RemitoForm";
import { RemitoDto } from "../../types/types";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

interface RemitoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  remito: RemitoDto | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
}

const RemitoDialog: React.FC<RemitoDialogProps> = ({
  isOpen,
  onClose,
  remito,
  onSubmit,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{"Remito"}</DialogTitle>
      <DialogContent>
        <RemitoForm initialData={remito} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default RemitoDialog;
