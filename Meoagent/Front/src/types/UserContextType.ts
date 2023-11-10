import { Dispatch, SetStateAction } from "react"
import { User } from "./User"

export type UserContextType = {
  user: User
  setUser: Dispatch<SetStateAction<User>>
}