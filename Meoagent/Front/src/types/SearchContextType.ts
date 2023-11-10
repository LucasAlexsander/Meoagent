import { Dispatch, SetStateAction } from "react"

export type SearchContextType = {
  search: string
  setSearch: Dispatch<SetStateAction<string>>
}