import { Dispatch, SetStateAction } from "react"
import { RealtorList } from "./RealtorList"

export type SearchResultContextType = {
  searchResult: RealtorList
  setSearchResult: Dispatch<SetStateAction<RealtorList>>
}