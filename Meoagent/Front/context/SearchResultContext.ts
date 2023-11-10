import { SearchResultContextType } from "@/types/SearchResultContextType";
import { createContext } from "react";


const SearchResultContext = createContext<SearchResultContextType | null>(null)

export default SearchResultContext