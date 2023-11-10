import { Dispatch, SetStateAction } from "react"
import { PictureModalData } from "./PictureModalData"

export type PictureModalContextType = {
  data: PictureModalData,
  setData:  Dispatch<SetStateAction<PictureModalData>>
}