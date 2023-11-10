import { ModalOpenContextAddComplaint } from "@/types/ModalOpenComplaintType";
import { createContext } from "react";

const AddComplaintModalContext =
  createContext<ModalOpenContextAddComplaint | null>(null);

export default AddComplaintModalContext;
