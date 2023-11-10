import { RealtorCity } from "./RealtorCity"
import { RealtorLanguage } from "./RealtorLanguage"

export class RealtorProfile {
  id!: number
  email!: string
  firstName!: string
  lastName!: string
  name!: string
  introduction!: string | null
  phone!: string | null
  whatsapp!: string | null
  instagram!: string | null
  facebook!: string | null
  professional_email!: string | null
  website!: string | null
  expTime!: number | null
  profilePicture!: string | null
  coverPicture!: string | null
  phoneCountry!: string | null
  wppCountry!: string | null
  wppText!: string | null
  rating!: number
  agencyName!: string | null
  agencyPic!: string | null
  RealtorCities!: RealtorCity[]
  RealtorLanguages!: RealtorLanguage[]
  address?: string | null
}