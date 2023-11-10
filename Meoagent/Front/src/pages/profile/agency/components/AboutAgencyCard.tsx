import { AgencyProfile } from "@/types/AgencyProfile"
import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import editIcon from '@/../public/edit.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AboutEditModalContext from "context/AboutEditModalContext"
import LoadingContext from "context/LoadingContext"
import { ApiService } from "@/services/ApiService"
import locales from "locales"

const Container = styled.div`
  .introduction{
    padding: 3rem;
    align-items: flex-start;
    position: relative;
    p{
      @media only screen and (max-width: 500px){
        margin: 0;
      }
      margin: 2rem;
      white-space: pre-wrap;
      font-size: 1.8rem;
    }
    .elipses-button{
      cursor: pointer;
    }
  }
`

interface AboutCardProps{
    localId:string;
    accType:string;
}

export default function AboutAgencyCard({localId, accType}:AboutCardProps){

  const [elip, setElip] = useState(true)

  const [ agency, setAgency ] = useState<AgencyProfile>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType
  
  const { setOpen: aboutEditOpen } = useContext(AboutEditModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]
  
  useEffect(() => {
    const fetchData = async () => {
      if(id){
        setLoadingOpen(true)

        const apiService = new ApiService()
        const data = await apiService.getAgencyInformation(id as string)
        setAgency(data)

        setLoadingOpen(false)
      }
      

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId) && accType === 'agency') setSessionProfile(true)

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  return (
    <Container >
      <div className="card introduction">
        <h2>{t.about.about}</h2>
        <p className={elip ? "elipses" : ""}>
          {agency?.description}
        </p>
        {elip ? (
          <p className="elipses-button" onClick={() => setElip(false)}>{t.about.showMore}</p>
          ):(
          <p className="elipses-button" onClick={() => setElip(true)}>{t.about.showLess}</p>
        )}
        { sessionProfile ? (
            <Image onClick={() => aboutEditOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
          ): ''}
      </div> 
    </Container>
  ) 
}