import { AgencyProfile } from "./AgencyProfile"
import { RealtorProfile } from "./RealtorProfile"

export type PictureModalData = {
  open: boolean,
  userSigned: RealtorProfile | AgencyProfile | null
}