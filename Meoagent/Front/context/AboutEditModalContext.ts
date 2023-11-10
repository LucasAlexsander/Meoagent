
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";


const AboutEditModalContext = createContext<ModalOpenContextType | null>(null)

export default AboutEditModalContext