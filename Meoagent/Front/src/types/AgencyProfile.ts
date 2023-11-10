export class AgencyProfile{
  id!: number
  email!: string
  name!: string
  description!: string | null
  phone!: string | null
  whatsapp!: string | null
  instagram!: string | null
  facebook!: string | null
  professional_email!: string | null
  website!: string | null
  profilePicture!: string | null
  coverPicture!: string | null
  phoneCountry!: string | null
  wppCountry!: string | null
  wppText!: string | null
  AgencyCities!: any[];
  AgencyLanguages!: any[];
  address?: string | null;
}