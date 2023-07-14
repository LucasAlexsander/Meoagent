import { RealtorProfile } from "@/types/RealtorProfile"
import { UserContextType } from "@/types/UserContextType"
import MainInfo from "components/MainInfo"
import UserContext from "context/UserContext"
import Image from "next/image"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import editIcon from '@/../public/edit.svg'
import plusIcon from '@/../public/plus.svg'
import closeIcon from '@/../public/close.svg'
import { ModalOpenContextType } from "@/types/ModalOpenContextType"
import AddPropertyModalContext from "context/AddPropertyModalContext"
import { Property } from "@/types/Property"
import Link from "next/link"
import AddServiceModalContext from "context/AddServiceModalContext"
import { RealtorService } from "@/types/RealtorService"
import PropertyTypes, { TPropertyTypes } from "@/types/PropertyTypes"
import Rooms, { TRooms } from "@/types/Rooms"
import Preservations, { TPreservations } from "@/types/Preservations"
import agencyIcon from '@/../public/agency.svg'
import { timeSince } from "@/utils/timeSince"
import AddAwardModalContext from "context/AddAwardModalContext"
import AddPartnershipModalContext from "context/AddPartnershipModalContext"
import { Award } from "@/types/Award"
import AddCourseModalContext from "context/AddCourseModalContext"
import { Course } from "@/types/Course"
import { Comment } from "@/types/Comment"
import AboutEditModalContext from "context/AboutEditModalContext"
import { PartnershipList } from "@/types/PartnershipList"
import { LastExp } from "@/types/LastExp"
import AddCommentModalContext from "context/AddCommentModalContext"
import LoadingContext from "context/LoadingContext"
import jsPDF from "jspdf"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 4rem;
  gap: 2rem;

  .convert-pdf-button{
    width: 10%;
    margin-left: auto;
    font-size: 1.3rem;
  }
  .services{

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 3rem;
    gap: 2rem;
    position: relative;
    flex-wrap: wrap;
    .service{
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
  .plus{
      cursor: pointer;
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 3rem;
      right: 3rem;
  }
  .introduction{
    padding: 3rem;
    align-items: flex-start;
    position: relative;
    p{
      margin: 2rem;
      white-space: pre-wrap;
    }
    .elipses-button{
      cursor: pointer;
    }
  }
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
        padding: 1.5rem;
        border-radius: 3rem;
        width: 40rem;
        position: relative;
        .footer{
          display: flex;
          justify-content: space-between;
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
  }
  .expiriences{
    align-items: flex-start;
    padding: 3rem;
    position: relative;
    gap: 2rem;
    .list{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      .work{

        @media only screen and (max-width: 1000px){
          width: 100%;
        }
        @media only screen and (max-width: 500px){
          padding: 5rem;
        }
        position: relative;
        width: 80%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 2rem;
        background-color: var(--base);
        .header{
          display: flex;
          gap: 2rem;
          .infos{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .position{
              display: flex;
              flex-direction: column;
              gap: 1rem;
              div{
                display: flex;
                gap: 1rem;
              }
              h4{
                font-size: 1.6rem;
                margin-left: 1rem;
              }
              p{
                font-size: 1.2rem;
                margin-left: 1rem;
                font-style: italic;
              }
            }
          }
        }
        .agency-img{
          height: 10rem;
          width: auto;
        }
      }
    }
  }

  .comments{
    padding: 3rem;
    align-items: flex-start;
    gap: 2rem;
    .list{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .comment{
        position: relative;
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 2rem;
        padding: 2rem;
        background-color: var(--base);
        border-radius: 3rem;
        .close{
          position: absolute;
          top: 2rem;
          right: 2rem;
        }
        .title{
          display: flex;
          gap: 1rem;
          align-items: center;
          p{
            color: var(--star);
          }
        }
      }
    }
  }

  .awards{
    position: relative;
    align-items: flex-start;
    padding: 3rem;
    gap: 2rem;
    .edit-icons{
      display: flex;
      gap: 2rem;
      position: absolute;
      top: 3rem;
      right: 3rem;
      .plus{
        position: unset;
      }
    }
    ul{
      all: unset;
      padding-left:3rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      li{
        color: var(--surface-2);
        display: flex;
        align-items: center;
        gap: 1rem;
      }
    }
  }
`

export default function Temp(){

  const [elip, setElip] = useState(true)

  const [ realtor, setRealtor ] = useState<RealtorProfile>()

  const [properties, setProperties ] = useState<Property []>()

  const [services, setServices] = useState<RealtorService []>()

  const [awards, setAwards] = useState<Award []>() 

  const [courses, setCourses] = useState<Course []>()
  
  const [partnerships, setPartnerships] = useState<PartnershipList []>()
  
  const [comments, setComments] = useState<Comment []>()

  const [lastExp, setLastExp] = useState<LastExp>()

  const [editAwards, setEditAwards] = useState(false)

  const [editCourses, setEditCourses] = useState(false)

  const [indexPartnership, setIndexPartnership] = useState(-1)

  const [sessionProfile, setSessionProfile] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addPropertySetOpen } = useContext(AddPropertyModalContext) as ModalOpenContextType

  const { setOpen: addServiceSetOpen } = useContext(AddServiceModalContext) as ModalOpenContextType
  
  const { setOpen: addAwardSetOpen } = useContext(AddAwardModalContext) as ModalOpenContextType

  const { setOpen: addCourseSetOpen } = useContext(AddCourseModalContext) as ModalOpenContextType

  const { setOpen: addPartnershipOpen } = useContext(AddPartnershipModalContext) as ModalOpenContextType
  
  const { setOpen: aboutEditOpen } = useContext(AboutEditModalContext) as ModalOpenContextType

  const { setOpen: addCommentSetOpen } = useContext(AddCommentModalContext) as ModalOpenContextType

  const { setOpen: setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const [localId, setLocalId] = useState('')

  const [accType, setAccType] = useState('')

  const router = useRouter()
  const { id } = router.query

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
  
  useEffect(() => {
    const fetchData = async () => {
      if(id){
        setLoadingOpen(true)
        console.log("INFORMATIONNNNNNNNNNNNNNNNNNNNNNNNNn")
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/' + id)
        const data = await response.json()
        setRealtor(data)
        console.log("data=",data)
  
        const responseProperties = await fetch(process.env.NEXT_PUBLIC_API_URL + '/property/realtor/' + id)
        const propertiesData = await responseProperties.json()
        setProperties(propertiesData)
        console.log("propertiesData=",propertiesData)

        const responseAwards = await fetch(process.env.NEXT_PUBLIC_API_URL + '/award/realtor/' + id)
        const awardsData = await responseAwards.json()
        setAwards(awardsData)
        console.log("awardsData=",awardsData)

        const responseCourses = await fetch(process.env.NEXT_PUBLIC_API_URL + '/course/realtor/' + id)
        const coursesData = await responseCourses.json()
        setCourses(coursesData)
        console.log("coursesData=",coursesData)
  
        const responseServices = await fetch(process.env.NEXT_PUBLIC_API_URL + '/service/realtor/' + id)
        const serviceData = await responseServices.json()
        setServices(serviceData)
        console.log("serviceData=",serviceData)

        const responsePartnerships = await fetch(process.env.NEXT_PUBLIC_API_URL + '/partnership/realtor/' + id)
        const partnershipData = await responsePartnerships.json()
        setPartnerships(partnershipData)
        console.log("partnershipData=",partnershipData)

        const responseComments = await fetch(process.env.NEXT_PUBLIC_API_URL + '/comment/realtor/' + id)
        const commentData = await responseComments.json()
        setComments(commentData)
        console.log("commentData=",commentData)

        setLastExp({name: partnershipData[0]?.name, pic: partnershipData[0]?.pic })
        console.log("lastExp=",{name: partnershipData[0]?.name, pic: partnershipData[0]?.pic })
        setLoadingOpen(false)
      }

    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId) && accType === 'realtor') setSessionProfile(true)

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeleteProperty = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/property/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    setLoadingOpen(false)
    
    const text = await response.text()
    if(text === 'deleted') router.reload()

  }

  const handleDeleteAward = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/award/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    setLoadingOpen(false)
    
    const text = await response.text()
    if(text === 'deleted') router.reload()

  }

  const handleDeleteCourse = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/course/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    setLoadingOpen(false)

    const text = await response.text()
    if(text === 'deleted') router.reload()

  }

  const handleDeleteService = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/service/realtor/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    setLoadingOpen(false)

    const text = await response.text()
    if(text === 'deleted') router.reload()

  }

  const handleDeleteComment = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/comment/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    setLoadingOpen(false)

    const text = await response.text()
    if(text === 'deleted') router.reload()

  }

  const handleDeletePartnership = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/partnership/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    setLoadingOpen(false)

    const text = await response.text()
    if(text === 'deleted') router.reload()

  }

  const handleEditPartnership = (index:number) => {

    if(index === indexPartnership){
      setIndexPartnership(-1)
    } else {
      setIndexPartnership(index)
    }
    
  }

  function dottedLine(doc:jsPDF, xFrom:number, yFrom:number, xTo:number, yTo:number, segmentLength:number)
{
    // Calculate line length (c)
    var a = Math.abs(xTo - xFrom);
    var b = Math.abs(yTo - yFrom);
    var c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));

    // Make sure we have an odd number of line segments (drawn or blank)
    // to fit it nicely
    var fractions = c / segmentLength;
    var adjustedSegmentLength = (Math.floor(fractions) % 2 === 0) ? (c / Math.ceil(fractions)) : (c / Math.floor(fractions));

    // Calculate x, y deltas per segment
    var deltaX = adjustedSegmentLength * (a / c);
    var deltaY = adjustedSegmentLength * (b / c);

    var curX = xFrom, curY = yFrom;
    while (curX <= xTo && curY <= yTo)
    {
        doc.line(curX, curY, curX + deltaX, curY + deltaY);
        curX += 2*deltaX;
        curY += 2*deltaY;
    }
}

  const handleConvertToPDF = () => {
    const doc = new jsPDF()
    doc.setFillColor('#e8e8e8')
    doc.rect(0, 0, 1000, 1000, 'F');
    doc.setTextColor('#454545');
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(23)
    doc.text(`${realtor?.firstName} ${realtor?.lastName}`, 20, 20)
    doc.setFont('Helvetica', 'normal')
    doc.setFontSize(13)
    doc.text(`Atua em: ${realtor?.RealtorCities.map(city => ` ${city.City.name}`)}`, 25, 30)
    doc.text(`Experiencia: ${realtor?.expTime} anos`, 25, 40)
    doc.text(`Idiomas: ${realtor?.RealtorLanguages.map(languages => ` ${languages.Language.name}`)}`, 25, 50)
    doc.text(`Email: ${realtor?.email}`, 25, 60)
    doc.text(`Telefone: ${realtor?.phone}`, 25, 70)
    dottedLine(doc, 20, 80, 180, 80, 1)
    doc.setFontSize(23)
    doc.setFont('Helvetica', 'bold')
    doc.text(`Serviços: `, 20, 100)
    doc.setFontSize(13)
    doc.setFont('Helvetica', 'normal')
    services?.forEach((service, index) => {
      doc.text(`${service.service.title}`, 25, 100 + ((index + 1) * 10))
    })
    const height1 = 100 + ((services?.length as number + 1) * 10)
    dottedLine(doc, 20, height1, 180, height1, 1)
    doc.setFontSize(23)
    doc.setFont('Helvetica', 'bold')
    doc.text(`Imóveis: `, 20, height1 + 20)
    doc.setFontSize(13)
    doc.setFont('Helvetica', 'normal')
    doc.setTextColor('#2e6b89')
    properties?.forEach((propertie, index) => {
      doc.textWithLink(`${propertie.title}: ${PropertyTypes[propertie.propertyType as keyof TPropertyTypes]} ${Rooms[propertie.rooms as keyof TRooms]} ${propertie.grossArea} de Área Bruta e ${propertie.usefulArea} de Área Útil,\n${Preservations[propertie.preservation as keyof TPreservations]}`, 25, height1 + 20 + ((index + 1) * 15), {url: propertie.link})
    })
    doc.addPage()
    doc.setFillColor('#e8e8e8')
    doc.rect(0, 0, 1000, 1000, 'F');
    doc.setTextColor('#454545');
    const height = 0
    dottedLine(doc, 20, height, 180, height, 1)
    doc.setFontSize(23)
    doc.setFont('Helvetica', 'bold')
    doc.text(`Prêmios e Distinções: `, 20, height + 20)
    doc.setFontSize(13)
    doc.setFont('Helvetica', 'normal')
    awards?.forEach((award, index) => {
      doc.text(`${award.title}`, 25, height + 30 + (index * 10))
    })
    const height2 = height + 30 + (awards?.length as number * 10)
    dottedLine(doc, 20,  height2, 180, height2, 1)
    doc.setFontSize(23)
    doc.setFont('Helvetica', 'bold')
    doc.text(`Cursos e Especializações: `, 20, height2 + 20)
    doc.setFontSize(13)
    doc.setFont('Helvetica', 'normal')
    courses?.forEach((course, index) => {
      doc.text(`${course.name}`, 25, height2 + 30 + (index * 10))
    })
    doc.save(`${realtor?.firstName}-${realtor?.lastName}-profile.pdf`.toLowerCase())

  }

  return (
    <Container >
      {sessionProfile && (
        <button className="convert-pdf-button" onClick={handleConvertToPDF}>Converter Perfil em PDF</button>
      )}
      <MainInfo isRealtor={true} lastExp={lastExp as LastExp} userSigned={realtor as RealtorProfile} isProfile={true}/>
      
      <div className="card services">
          <h3>Este consultor trabalha com:</h3>
          {services?.map((item) =>
                <p className="service" key={item.id}>
                  {item.service.title}
                  { sessionProfile && (
                  <Image onClick={ e => handleDeleteService(e)} id={String(item.id)} className="close" src={closeIcon} alt='close icon'/>
                )}
                </p> 
          )}

          { sessionProfile ? (
            <Image onClick={() => addServiceSetOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
          ): ''}
      </div>

      <div className="card introduction">
        <h2>Sobre</h2>
        <p className={elip ? "elipses" : ""}>
          {realtor?.introduction}
        </p>
        {elip ? (
          <p className="elipses-button" onClick={() => setElip(false)}>Mostrar Mais</p>
          ):(
          <p className="elipses-button" onClick={() => setElip(true)}>Mostrar Menos</p>
        )}
        { sessionProfile ? (
            <Image onClick={() => aboutEditOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
          ): ''}
      </div>

      <div className="card properties">
        <h2>Imóveis</h2>
        <div className="list">
          {properties?.map(item => (
            <div key={item.id} className="propertie">
                { sessionProfile && (
                  <Image onClick={ e => handleDeleteProperty(e)} id={String(item.id)} className="close" src={closeIcon} alt='close icon'/>
                )}
                <Image className="property-img" src={item.profilePicture} width={200} height={100} alt="profile picture"/>
                <h2>{item.price}</h2>
                <h3>{item.title}</h3>
                <p className="sub-text">
                  {PropertyTypes[item.propertyType as keyof TPropertyTypes]} {Rooms[item.rooms as keyof TRooms]} {item.grossArea} de Área Bruta e {item.usefulArea} de Área Útil, {Preservations[item.preservation as keyof TPreservations]}.
                </p>
                <div className="footer">
                  <Link className="special-link" href={item.link} target='_blank'>
                    Conferir Imóvel
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

      <div className="card awards">
        <h2>Prêmios e distinções</h2>
        { sessionProfile ? (
          <div className="edit-icons">
            <Image onClick={() => setEditAwards(!editAwards)} className='plus' src={editIcon} alt='edit icon'/>
            <Image onClick={() => addAwardSetOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
          </div>
        ): ''}
        <ul>
          {awards?.map(item => (
              <li key={item.id}>
                {sessionProfile && editAwards ? (
                  <Image onClick={e => handleDeleteAward(e)} id={String(item.id)} className="close" src={closeIcon} alt="close icon"/>
                ): ''}
                {item.title}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="card awards">
        <h2>Cursos e Especializações</h2>
        { sessionProfile ? (
          <div className="edit-icons">
            <Image onClick={() => setEditCourses(!editCourses)} className='plus' src={editIcon} alt='edit icon'/>
            <Image onClick={() => addCourseSetOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
          </div>
        ): ''}
        <ul>
          {courses?.map(item => (
              <li key={item.id}>
                {sessionProfile && editCourses ? (
                  <Image onClick={e => handleDeleteCourse(e)} id={String(item.id)} className="close" src={closeIcon} alt="close icon"/>
                ): ''}
                {item.name}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="card expiriences">
        <h2> Experiência </h2>
        { sessionProfile ? (
          <Image onClick={() => addPartnershipOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
        ): ''}
        <div className="list">
          {partnerships?.map((item, index) => (
            <div key={index} className="card work">
            { sessionProfile ? (
            <Image onClick={() => handleEditPartnership(index)} className='plus' src={editIcon} alt='edit icon'/>
          ): ''}
              <div className="header">
                <Image width={10} height={10} className="agency-img" src={item.pic ? item.pic : agencyIcon} alt="" />
                <div className="infos">
                {item.list.map((partnership) => (
                    <div key={partnership.id} className="position">
                      <div>
                        {sessionProfile && index === indexPartnership ?(
                            <Image onClick={e => handleDeletePartnership(e)} id={String(partnership.id)} className="close" src={closeIcon} alt="close icon"/>
                            ): ''}
                        <h3>{partnership.title}</h3>
                      </div>
                      <h4>{item.name}</h4>
                      <p>{partnership.workTime}</p>
                    </div>
                ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card comments">
        <h2>Avaliações</h2>
        {
          comments?.map(comment => comment.clientId).includes(Number(localId)) ? '': (
            <button onClick={() => addCommentSetOpen(true)}>Adicionar Comentário</button>
          )
        }
        <div className="list">
            {comments?.map(comment => (
              <div key={ comment.id } className="comment">
                {accType === 'client' && Number(localId) === comment.clientId ? (
                  <Image onClick={e => handleDeleteComment(e)} id={String(comment.id)} className="close" src={closeIcon} alt="close icon"/>
                ): ''}
                <div className="title">
                  <h4>
                    {comment.clientName}
                  </h4>
                  <p>{'★'.repeat(Math.floor(comment.rating))}</p>
                </div>
                <p>
                  {comment.text}
                </p>
              </div>
            ))}
                          
        </div>
      </div>
    </Container>
  ) 
}