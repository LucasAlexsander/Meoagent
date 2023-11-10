
import { ModalOpenContextAddReply, ModalOpenContextType } from "@/types/ModalOpenContextType";
import { createContext } from "react";

const AddReplyModalContext = createContext<ModalOpenContextAddReply | null>(null)

export default AddReplyModalContext