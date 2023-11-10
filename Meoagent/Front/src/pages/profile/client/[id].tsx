import { AgencyProfile } from "@/types/AgencyProfile";
import MainInfoClient from "components/MainInfoClient";
import { RealtorProfile } from "@/types/RealtorProfile"
import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import { LastExp } from "@/types/LastExp"
import LoadingContext from "context/LoadingContext"
import { ClientProfile } from "@/types/ClientProfile";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 4rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
  .plus{
      cursor: pointer;
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 3rem;
      right: 3rem;
  }
`

export default function Profile(){

  const [localId, setLocalId] = useState('')

  const [accType, setAccType] = useState('')

  //--------
  const [client, setClient] = useState<ClientProfile>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      if(id){
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/client/' + id)
        const data = await response.json()
        setClient(data)
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
      {client?<MainInfoClient userSigned={client as ClientProfile} isProfile={true}/>:""}
    </Container>
  ) 
}