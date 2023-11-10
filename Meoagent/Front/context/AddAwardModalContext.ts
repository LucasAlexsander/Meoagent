
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";


const AddAwardModalContext = createContext<ModalOpenContextType | null>(null)

export default AddAwardModalContext