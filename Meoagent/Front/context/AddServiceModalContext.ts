
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";


const AddServiceModalContext = createContext<ModalOpenContextType | null>(null)

export default AddServiceModalContext