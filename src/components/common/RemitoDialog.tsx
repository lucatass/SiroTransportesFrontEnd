import React from "react";
import RemitoFormMock from "../../remito-maqueta/RemitoFormMock"
import { Cliente, RemitoDto, Option } from "../../types/types";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

interface RemitoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  remito: RemitoDto | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  remitentesOptions: Option[];
  destinatariosOptions: Option[];
  remitentesData: Cliente[];
  destinatariosData: Cliente[];
}

const RemitoDialog: React.FC<RemitoDialogProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{"Remito"}</DialogTitle>
      <DialogContent>
        <RemitoFormMock

        />
      </DialogContent>
    </Dialog>
  );
};

export default RemitoDialog;
