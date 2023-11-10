import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";

const AddCityModalContext = createContext<ModalOpenContextType | null>(null)

export default AddCityModalContext