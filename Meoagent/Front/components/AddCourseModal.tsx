import { AddCourseForm } from "@/types/AddCourseForm";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext } from "react";
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
    height: 25rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    input{
      width: 80%;
    }
    @media (max-width: 700px) {
      width: 80%;
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

type AddCourseModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddCourseModal = ({open, setOpen}: AddCourseModalProps) => {

  const { register, handleSubmit } = useForm<AddCourseForm>()

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const onSubmit = async (data: AddCourseForm) => {

    const localId = localStorage.getItem('id')

    setLoadingOpen(true)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/course', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        realtorId: Number(localId)
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const text = await response.text()
    setLoadingOpen(false)
    if(text === 'created') router.reload()

  }

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>{t.addStudy.createStudy}</h3>
        <input  {...register('name', {required: true})}  placeholder={t.addStudy.title} type="text" />
        <p onClick={() => setOpen(false)}>X</p>
        <button type="submit"> {t.addStudy.create} </button>
      </form>
    </Container>
    : <></>
  );
};

export default AddCourseModal
