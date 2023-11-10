import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";


const MainInfoAgencyEditModalContext = createContext<ModalOpenContextType | null>(null)

export default MainInfoAgencyEditModalContext