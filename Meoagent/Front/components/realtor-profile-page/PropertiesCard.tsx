import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import plusIcon from '@/../public/plus.svg'
import closeIcon from '@/../public/close.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AddPropertyModalContext from "context/AddPropertyModalContext"
import { Property } from "@/types/Property"
import Link from "next/link"
import PropertyTypes, { TPropertyTypes } from "@/types/PropertyTypes"
import Rooms, { TRooms } from "@/types/Rooms"
import Preservations, { TPreservations } from "@/types/Preservations"
import { timeSince } from "@/utils/timeSince"
import LoadingContext from "context/LoadingContext"
import { ApiService } from "@/services/ApiService"
import locales from "locales"

const Container = styled.div`
  .properties{
    background: #fff;
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 3rem;
    position: relative;
    .list{
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 2rem;
      scroll-snap-type: x mandatory;
      padding: 1rem;
      overflow: auto;
      .plus{
        cursor: pointer;
        height: 3rem;
        width: 3rem;
        position: absolute;
        top: 3rem;
        right: 3rem;
      }
      .propertie{
        @media only screen and (max-width: 510px){
          width: 280px;
        }
        @media only screen and (max-width: 470px){
          width: 256px;
        }
        @media only screen and (max-width: 420px){
          width: 200px;
        }
        @media only screen and (max-width: 390px){
          width: 180px;
        }
        flex-shrink: 0;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: var(--base);
        padding: 1.5rem;
        border-radius: 3rem;
        width: 40rem;
        position: relative;
        .footer{
          display: flex;
          justify-content: space-between;
          a{
            width: 50%;
          }
          .sub-text{
            font-style: italic;
          }
        }
        h2{
          color: var(--surface-2);
        }
        h3{
          color: var(--surface-2);
        }
        .property-img{
          margin-top: 3rem;
          object-fit: cover;
          opacity: 1;
          border-radius: 3rem;
          width: 100%;
          height: 100%;
          max-height: 25rem;
        }
        .close{
          position: absolute;
          right: 1rem;
        }
        .special-link{
          width: 12rem;
        }
      }
    }
    .pdf-list{
      flex-wrap: wrap;
    }
  }
`

interface PropertiesCardProps{
    localId:string;
    accType:string;
    sessionProfile: boolean;
    pdfPage?:boolean;
}

export default function PropertiesCard({localId, accType, sessionProfile, pdfPage=false}:PropertiesCardProps){

  const [properties, setProperties ] = useState<Property []>()

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addPropertySetOpen } = useContext(AddPropertyModalContext) as ModalOpenContextType

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
        const propertiesData = await apiService.getRealtorProperties(id as string)
        setLoadingOpen(false)

        setProperties(propertiesData)
      }

    }

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeleteProperty = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    const response = await apiService.deleteRealtorProperty(token as string, id, 'realtor')
    setLoadingOpen(false)
    
    if(response === 'deleted') router.reload()

  }

  return (
    <Container >
      <div className="card properties">
        <h2>{t.properties.properties}</h2>
        <div className={`list ${pdfPage && 'pdf-list'}`}>
          {properties?.map(item => (
            <div key={item.id} className="propertie">
                { sessionProfile && (
                  <Image onClick={ e => handleDeleteProperty(e)} id={String(item.id)} className="close" src={closeIcon} alt='close icon'/>
                )}
                <Image className="property-img" src={item.profilePicture} width={200} height={100} alt="profile picture"/>
                <h2>{item.price}</h2>
                <h3>{item.title}</h3>
                <p className="sub-text">
                  {PropertyTypes[locale as keyof typeof PropertyTypes][item.propertyType as keyof TPropertyTypes]} {Rooms[item.rooms as keyof TRooms]}, {t.addPropertiesModal.grossArea}: {item.grossArea}, {t.addPropertiesModal.usableArea}: {item.usefulArea}, {Preservations[locale as keyof typeof PropertyTypes][item.preservation as keyof TPreservations]}.
                </p>
                <div className="footer">
                  <Link className="special-link" href={item.link} target='_blank'>
                    {t.properties.verify}
                  </Link>
                  <p className="sub-text">
                    {timeSince(new Date(item.createdAt))}
                  </p>
                </div>
              </div>

          ))}
          { sessionProfile ? (
          <Image onClick={() => addPropertySetOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
      ): ''}
        </div>
      </div>
    </Container>
  ) 
}