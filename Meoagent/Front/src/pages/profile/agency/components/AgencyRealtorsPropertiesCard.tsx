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
import { AgencyProfile } from "@/types/AgencyProfile"
import housePaceholder from '../../../../../public/placeholder.jpg'
import locales from "locales"

const Container = styled.div`
  .properties{
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
      .properties-column{
        display: flex;
        flex-direction: column;
        gap:20px;
      }
      .plus{
        cursor: pointer;
        height: 3rem;
        width: 3rem;
        position: absolute;
        top: 3rem;
        right: 3rem;
      }
      .propertie{
        flex-shrink: 0;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: var(--base);
        padding: 1rem;
        border-radius: 1rem;
        width: 30rem;
        position: relative;
        .footer{
          display: flex;
          justify-content: space-between;
          .sub-text{
            font-style: italic;
          }
        }
        h2{
          margin-top: -5px;
          color: var(--surface-2);
        }
        h3{
          margin-top: -5px;
          margin-bottom: -8px;
          color: var(--surface-2);
        }
        .property-img{
          object-fit: fill;
          opacity: 1;
          border-radius: 1rem;
          width: 100%;
          height: 100%;
          max-height: 14rem;
        }
        .special-link{
          width: 12rem;
        }
      }
    }
  }
`

export default function AgencyRealtorsPropertiesCard({agency}:any){

  const [properties, setProperties ] = useState<any>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addPropertySetOpen } = useContext(AddPropertyModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { id } = router.query

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]
  

  useEffect(() => {
    const allProperties = agency.Partnerships.map((part:any)=> part.Realtor)
    const agencyRealtors = allProperties.map((item:any)=> {
        return {name:item.firstName,lastName:item.lastName, id:item.id, properties:item.Properties}
    })
    const agencyRealtorsProperties: any = []
    for(let i = 0; i< agencyRealtors.length;i++){
        for(let j = 0; j< agencyRealtors[i].properties.length;j++){
            agencyRealtorsProperties.push({
                ...agencyRealtors[i].properties[j],
                realtorLastName:agencyRealtors[i].lastName,
                realtorId:agencyRealtors[i].id,
                realtorName:agencyRealtors[i].name
            })
        }
    }
    const agencyRealtorsPropertiesInPairs: any =[]
    for(let i = 0; i< agencyRealtorsProperties.length;i=i+2){
      agencyRealtorsPropertiesInPairs.push([agencyRealtorsProperties[i],agencyRealtorsProperties[i+1]])
    }

    setProperties(agencyRealtorsPropertiesInPairs)
  }, [])
  
  return (
    <Container >
      <div className="card properties">
        <h2>{t.properties.properties} </h2>
        <div className="list">
          {properties?.map((item:any) => (
            <div key={item[0].id} className="properties-column">
              <div  className="propertie">
              <div className="realtor-name">
                    <span>Consultor(a): </span>
                    <a className="special-link" onClick={()=>router.push(`/profile/realtor/${item[0].realtorId}`)}>
                        {`${item[0].realtorName} ${item[0].realtorLastName}`}
                    </a>
                </div>
                <div className="image-container">
                <Image className="property-img" src={item[0].profilePicture||housePaceholder} width={200} height={100} alt="profile picture"/>

                </div>
                
                <h2>{item[0].price}</h2>
                <h3>{item[0].title}</h3>
                <p className="sub-text">
                  {PropertyTypes[locale as keyof typeof PropertyTypes][item[0].propertyType as keyof TPropertyTypes]} {Rooms[item[0].rooms as keyof TRooms]} {item[0].grossArea} de Área Bruta e {item[0].usefulArea} de Área Útil, {Preservations[locale as keyof typeof Preservations][item[0].preservation as keyof TPreservations]}.
                </p>
                <div className="footer">
                  <Link className="special-link" href={item[0].link} target='_blank'>
                    Conferir Imóvel
                  </Link>
                  <p className="sub-text">
                    {timeSince(new Date(item[0].createdAt))}
                  </p>
                </div>
              </div>
              {item[1] && <div  className="propertie">
                <div>
                    <span>Consultor(a): </span>
                    <a className="special-link" onClick={()=>router.push(`/profile/realtor/${item[1].realtorId}`)}>
                        {`${item[1].realtorName} ${item[1].realtorLastName}`}
                    </a>
                </div>
                <Image className="property-img" src={item[1].profilePicture||housePaceholder} width={200} height={100} alt="profile picture"/>
                <h2>{item[1].price}</h2>
                <h3>{item[1].title}</h3>
                <p className="sub-text">
                  {PropertyTypes[locale as keyof typeof PropertyTypes][item[1].propertyType as keyof TPropertyTypes]} {Rooms[item[1].rooms as keyof TRooms]} {item[1].grossArea} de Área Bruta e {item[1].usefulArea} de Área Útil, {Preservations[locale as keyof typeof Preservations][item[1].preservation as keyof TPreservations]}.
                </p>
                <div className="footer">
                  <Link className="special-link" href={item[1].link} target='_blank'>
                    {t.properties.verify}
                  </Link>
                  <p className="sub-text">
                    {timeSince(new Date(item[1].createdAt))}
                  </p>
                </div>
              </div>
}
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