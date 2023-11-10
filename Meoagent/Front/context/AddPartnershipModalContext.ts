
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";


const AddPartnershipModalContext = createContext<ModalOpenContextType | null>(null)

export default AddPartnershipModalContext