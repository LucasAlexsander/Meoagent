import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import editIcon from '@/../public/edit.svg'
import plusIcon from '@/../public/plus.svg'
import closeIcon from '@/../public/close.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AddAwardModalContext from "context/AddAwardModalContext"
import { Award } from "@/types/Award"
import LoadingContext from "context/LoadingContext"
import { ApiService } from "@/services/ApiService"
import locales from "locales"

const Container = styled.div`
  .awards{
    background-color: #fff;
    position: relative;
    align-items: flex-start;
    padding: 3rem;
    gap: 2rem;
    
    .awards-title {
      width: 100%;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      .edit-icons{
        display: flex;
        gap: 2rem;
        flex-shrink: 0;
        /* position: absolute; */
        top: 3rem;
        right: 3rem;
        .plus{
          position: unset;
      }
    }
    }
    ul{
      all: unset;
      padding-left: 2.25rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      list-style: disc !important;
      li{
        &::marker {
          font-size: 2rem;
        }
        .awards-items {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        color: var(--surface-2);
      }
    }
  }
`
interface AwardsCardProps{
    localId:string;
    accType:string;
    sessionProfile: boolean;
}
export default function AwardsCard({localId, accType, sessionProfile}:AwardsCardProps){

  const [awards, setAwards] = useState<Award []>() 

  const [editAwards, setEditAwards] = useState(false)

  const { user } = useContext(UserContext) as UserContextType
  
  const { setOpen: addAwardSetOpen } = useContext(AddAwardModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query
  const apiService = new ApiService()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]
  
  useEffect(() => {
    const fetchData = async () => {
      if(id){
        setLoadingOpen(true)

        const awardsData = await apiService.getRealtorAwards(id as string)
        setAwards(awardsData)

        setLoadingOpen(false)
      }

    }

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeleteAward = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    const response = await apiService.deleteRealtorAward(token as string, id)
    setLoadingOpen(false)
    
    if(response === 'deleted') router.reload()

  }

  return (
    (awards?.length && awards?.length > 0 || sessionProfile) ?
    <Container >
      <div className="card awards">
        <div className="awards-title">
          <h2>{t.awards.awards}</h2>
          { sessionProfile == false ? (
            <div className="edit-icons">
              <Image onClick={() => setEditAwards(!editAwards)} className='plus' src={editIcon} alt='edit icon'/>
              <Image onClick={() => addAwardSetOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
            </div>
          ): ''}
        </div>
        
        <ul>
          {awards?.map(item => (
              <li key={item.id}>
                <div className="awards-items">
                  {sessionProfile && editAwards ? (
                    <Image onClick={e => handleDeleteAward(e)} id={String(item.id)} className="close" src={closeIcon} alt="close icon"/>
                  ): ''}
                  {item.title}
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </Container>
    : <></>
  ) 
}