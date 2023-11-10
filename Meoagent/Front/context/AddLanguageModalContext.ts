import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";

const AddLanguageModalContext = createContext<ModalOpenContextType | null>(null)

export default AddLanguageModalContext