import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import editIcon from '@/../public/edit.svg'
import closeIcon from '@/../public/close.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AddServiceModalContext from "context/AddServiceModalContext"
import { RealtorService } from "@/types/RealtorService"
import LoadingContext from "context/LoadingContext"
import { ApiService } from "@/services/ApiService"
import locales, { servicesLocales } from "locales"

const Container = styled.div`
  .services{
    background: #fff;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 3rem;
    gap: 2rem;
    position: relative;
    flex-wrap: wrap;
    .service{
      @media only screen and (max-width: 400px){
        font-size: 1.3rem;
      }
      flex-shrink: 0;
      scroll-snap-align: start;
      background-color: var(--base);
      padding: 1rem;
      border-radius: 3rem;
      position: relative;
      display: flex;
      align-items: center;
      gap: 2rem;
      .close{
        position: relative;
      }
    }
  }
`
interface ServicesCardProps{
    localId:string;
    accType:string;
    sessionProfile: boolean;
}
export default function ServicesCard({localId, accType, sessionProfile}:ServicesCardProps){

  const [services, setServices] = useState<RealtorService []>()

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addServiceSetOpen } = useContext(AddServiceModalContext) as ModalOpenContextType

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
        const serviceData = await apiService.getRealtorServices(id as string)
        setLoadingOpen(false)

        setServices(serviceData)
      }

    }

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeleteService = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')
    const accountType = localStorage.getItem('accountType')

    setLoadingOpen(true)
    const response = await apiService.deleteService(String(token),Number(id),String(accountType))
    setLoadingOpen(false)

    if(response === 'deleted') router.reload()
  }

  return (
    <Container >
      <div className="card services">
          <h3>{t.services.thisRealtorWorkWith}:</h3>
          {services?.map((item) =>
                <p className="service" key={item.id}>
                  {locale === 'en' && servicesLocales.en[item.service.title as keyof typeof servicesLocales.en]}
                  {locale === 'pt' && servicesLocales.pt[item.service.title as keyof typeof servicesLocales.pt]}
                  {locale === 'es' && servicesLocales.es[item.service.title as keyof typeof servicesLocales.es]}
                  { sessionProfile && (
                  <Image onClick={ e => handleDeleteService(e)} id={String(item.id)} className="close" src={closeIcon} alt='close icon'/>
                )}
                </p> 
          )}

          { sessionProfile ? (
            <Image onClick={() => addServiceSetOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
          ): ''}
      </div>
    </Container>
  ) 
}