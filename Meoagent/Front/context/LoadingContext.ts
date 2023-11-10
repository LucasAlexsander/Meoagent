
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";


const LoadingContext = createContext<ModalOpenContextType | null>(null)

export default LoadingContext