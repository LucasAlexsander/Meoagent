
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";


const AddCourseModalContext = createContext<ModalOpenContextType | null>(null)

export default AddCourseModalContext