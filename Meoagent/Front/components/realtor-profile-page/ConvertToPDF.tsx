import { RealtorProfile } from "@/types/RealtorProfile"
import { UserContextType } from "@/types/UserContextType"
import UserContext from "context/UserContext"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import { Property } from "@/types/Property"
import { RealtorService } from "@/types/RealtorService"
import PropertyTypes, { TPropertyTypes } from "@/types/PropertyTypes"
import Rooms, { TRooms } from "@/types/Rooms"
import Preservations, { TPreservations } from "@/types/Preservations"
import { Award } from "@/types/Award"
import { Course } from "@/types/Course"
import LoadingContext from "context/LoadingContext"
import jsPDF from "jspdf"
import { ApiService } from "@/services/ApiService"
import locales from "locales"
import { PdfService } from "@/services/PdfService"

const Container = styled.button`
    width: 10%;
    margin-left: auto;
    font-size: 1.3rem;
`
interface ConvertToPDFProps{
    localId:string;
    accType:string;
    sessionProfile: boolean;
}
export default function ConvertToPDF({localId, accType, sessionProfile}:ConvertToPDFProps){

  const [ realtor, setRealtor ] = useState<RealtorProfile>()

  const [properties, setProperties ] = useState<Property []>()

  const [services, setServices] = useState<RealtorService []>()

  const [awards, setAwards] = useState<Award []>() 

  const [courses, setCourses] = useState<Course []>()

  const { user } = useContext(UserContext) as UserContextType

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
        
        const data = await apiService.getRealtorInformation(id as string)
        setRealtor(data)

        const responseProperties = await apiService.getRealtorProperties(id as string)
        setProperties(responseProperties)

        const responseAwards = await apiService.getRealtorAwards(id as string)
        setAwards(responseAwards)

        const responseCourses = await apiService.getRealtorCourses(id as string)
        setCourses(responseCourses)
  
        const responseServices = await apiService.getRealtorServices(id as string)
        setServices(responseServices)

        setLoadingOpen(false)
      }

    }

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleConvertToPDF = async () => {
    setLoadingOpen(true)
    const pdfService = new PdfService()
    await pdfService.exportPdf(realtor?.id as number, realtor?.firstName as string, realtor?.lastName as string, locale as string)
    setLoadingOpen(false)
  }

  return (
    <>
      {sessionProfile && (
        <Container onClick={handleConvertToPDF}>{t.convertToPdf.button}</Container>
      )}
    </>
  ) 
}