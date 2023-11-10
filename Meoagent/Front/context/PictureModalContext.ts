import { PictureModalContextType } from "@/types/PictureModalContextType";
import { createContext } from "react";


const PictureModalContext = createContext<PictureModalContextType | null>(null)

export default PictureModalContext 