import { Dispatch, SetStateAction } from "react";

export type ModalOpenContextType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export type ModalOpenContextAddComplaint = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
