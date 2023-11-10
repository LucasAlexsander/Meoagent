import { AgencyProfile } from "@/types/AgencyProfile";
import MainInfoAgency from "components/MainInfoAgency";
import { RealtorProfile } from "@/types/RealtorProfile"
import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import { LastExp } from "@/types/LastExp"
import LoadingContext from "context/LoadingContext"
import AwardsAgencyCard from "./components/AwardsAgencyCard";
import PropertiesAgencyCard from "./components/PropertiesAgencyCard";
import ServicesAgencyCard from "./components/ServicesAgencyCard";
import AboutAgencyCard from "./components/AboutAgencyCard";
import CommentsAgencyCard from "./components/CommentsAgencyCard";
import AgencyRealtorsPropertiesCard from "./components/AgencyRealtorsPropertiesCard";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 4rem;
  gap: 2rem;
  .plus{
      cursor: pointer;
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 3rem;
      right: 3rem;
  }
  @media (max-width: 768px) {
      p {
        font-size: 22rem;  
      }
    }
`

export default function Profile(){

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const [localId, setLocalId] = useState('')

  const [accType, setAccType] = useState('')

  //--------
  const [agency, setAgency] = useState<AgencyProfile>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      if(id){
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/agency/' + id)
        const data = await response.json()
        setAgency(data)
      }
    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId)) setSessionProfile(true)

    fetchData()

  }, [id])

  //---------


  useEffect(() => {
    const localStorageId = localStorage.getItem('id')
    const accountType = localStorage.getItem('accountType')

    if(localStorageId){
      setLocalId(localStorageId)
    }
    if(accountType){
      setAccType(accountType)
    }
    
  }, [])

  return (
    <Container>
      <MainInfoAgency userSigned={agency as AgencyProfile} isProfile={true}/>
      <ServicesAgencyCard localId={localId} accType={accType}/>
      <AboutAgencyCard localId={localId} accType={accType}/>
      {agency&&<AgencyRealtorsPropertiesCard agency={agency}/>}
      {/* <PropertiesAgencyCard localId={localId} accType={accType}/> */}
      {/* <AwardsAgencyCard localId={localId} accType={accType}/> */}
      <CommentsAgencyCard localId={localId} accType={accType}/>
    </Container>
  )
}