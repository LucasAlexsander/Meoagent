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
import AddCourseModalContext from "context/AddCourseModalContext"
import { Course } from "@/types/Course"
import LoadingContext from "context/LoadingContext"
import { ApiService } from "@/services/ApiService"
import locales from "locales"


const Container = styled.div`
  display: block;
  width: 100%;

  .awards{
    background: #fff;
    position: relative;
    align-items: flex-start;
    padding: 3rem;
    gap: 2rem;
    .awards-title {
      width: 100%;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      @media only screen and (max-width: 395px) {
        h2 {
          font-size: 3rem;
        }
      }
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
interface CoursesCardProps{
    localId:string;
    accType:string;
    sessionProfile: boolean;
}
export default function CoursesCard({localId, accType, sessionProfile}:CoursesCardProps){

  const [courses, setCourses] = useState<Course []>()

  const [editCourses, setEditCourses] = useState(false)

  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: addCourseSetOpen } = useContext(AddCourseModalContext) as ModalOpenContextType

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
        const coursesData = await apiService.getRealtorCourses(id as string)       
        setLoadingOpen(false)

        setCourses(coursesData)
      }

    }

    fetchData()

  }, [id, user.id, accType, setLoadingOpen])

  const handleDeleteCourse = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    setLoadingOpen(true)
    const response = await apiService.deleteRealtorCourse(token as string, id)
    setLoadingOpen(false)

    if(response === 'deleted') router.reload()
  }

  return (
    (courses?.length && courses.length > 0 || sessionProfile) ?
    <Container>
      <div className="card awards">
        <div className="awards-title">
          <h2>{t.study.study}</h2>
          { sessionProfile == false ? (
            <div className="edit-icons">
              <Image onClick={() => setEditCourses(!editCourses)} className='plus' src={editIcon} alt='edit icon'/>
              <Image onClick={() => addCourseSetOpen(true)} className='plus' src={plusIcon} alt='edit icon'/>
            </div>
          ): ''}
        </div>
        
        <ul>
          {courses?.map(item => (
              <li key={item.id}>
                <div className="awards-items">
                  {sessionProfile && editCourses ? (
                    <Image onClick={e => handleDeleteCourse(e)} id={String(item.id)} className="close" src={closeIcon} alt="close icon"/>
                  ): ''}
                  {item.name}
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