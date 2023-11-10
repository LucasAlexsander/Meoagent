
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";


const AddPropertyModalContext = createContext<ModalOpenContextType | null>(null)

export default AddPropertyModalContext