import { AddCourseForm } from "@/types/AddCourseForm";
import { EditAboutForm } from "@/types/EditAboutForm";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import { RealtorProfile } from "@/types/RealtorProfile";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  form{
    position: relative;
    height: 80%;
    width: 50%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding-top: 5rem;
    textarea{
      height: 70%;
    }
    @media (max-width: 1000px) {
      width: 90%;
    }
  }
  p{
    cursor: pointer;
    position: absolute;
    top: 3rem;
    right: 3rem;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--surface-2);
    color: var(--surface);
    border-radius: 1rem;
    font-weight: bold;
  }
`

type AboutEditModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AboutEditModal = ({open, setOpen}: AboutEditModalProps) => {

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const { register, handleSubmit } = useForm<EditAboutForm>()

  const [introduction, setIntroduction] = useState('')

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    const fetchData = async () => {

      const localId = localStorage.getItem('id')
      const accountType = localStorage.getItem('accountType')
      if(localId !== undefined){
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/'+accountType+'/' + localId, {
          method: 'GET'
        })
        const json = await response.json()
        setIntroduction(accountType==="agency"?json.description:json.introduction)

      }
    }
    fetchData()
  }, [])

  const onSubmit = async (data: EditAboutForm) => {
    const token = localStorage.getItem('token')
    const accountType = localStorage.getItem('accountType')
    const realtorBody = {introduction: data.introduction}
    const agencyBody = {description: data.introduction}
    setLoadingOpen(true)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/'+accountType+'/', {
      method:'PUT',
      body: JSON.stringify(accountType==="agency"?agencyBody:realtorBody),
      headers:{
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    const text = await response.text()
    setLoadingOpen(false)
    router.reload()
  }

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h2>{t.aboutEditModal.whoIsYou}</h2>
        <textarea {...register('introduction')} defaultValue={introduction ? introduction : ''} placeholder={t.aboutEditModal.putYourDescriptionHere}/>
        <p onClick={() => setOpen(false)}>X</p>
        <button type="submit"> {t.aboutEditModal.edit} </button>
      </form>
    </Container>
    : <></>
  );
};

export default AboutEditModal
