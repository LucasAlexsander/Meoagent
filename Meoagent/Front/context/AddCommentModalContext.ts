
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";

const AddCommentModalContext = createContext<ModalOpenContextType | null>(null)

export default AddCommentModalContext