
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";


const MainInfoProfileEditModalContext = createContext<ModalOpenContextType | null>(null)

export default MainInfoProfileEditModalContext