import { SearchContextType } from "@/types/SearchContextType";
import { createContext } from "react";

const SearchContext = createContext<SearchContextType | null>(null)

export default SearchContext