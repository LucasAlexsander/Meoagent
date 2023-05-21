import { AddCityForm } from '@/types/AddCityForm';
import { RealtorProfile } from '@/types/RealtorProfile';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import closeIcon from '../public/close.svg'

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
    min-height: 50rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    input{
      width: 70%;
    }
  }
  .close-icon{
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
  .close{
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
  .list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 80%;
    gap: 1rem;
    p{
      background-color: var(--surface);
      color: var(--surface-2);
      padding: 1rem;
      border-radius: 3rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
  h3{
    margin-bottom: 2rem;
  }
  h4{
    font-size: 2rem;
    font-style: italic;
    color: var(--surface-2);
  }
`

type AddLanguageModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddLanguageModal = ({open, setOpen}: AddLanguageModalProps) => {

  const { register, handleSubmit } = useForm<AddCityForm>()

  const [realtor, setRealtor] = useState<RealtorProfile>()

  const [cities, setCities] = useState<Array<string>>()

  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const localId = localStorage.getItem('id')
      if(localId){

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/' + localId)
        const realtorData = await response.json()
        setRealtor(realtorData)

        const responseCities = await fetch(process.env.NEXT_PUBLIC_API_URL + '/city/' + localId)
        const data = await responseCities.json()
        setCities(data)

      }

    }

    fetchData()
  }, [open])

  const onSubmit = async (data: AddCityForm) => {

    const token = localStorage.getItem('token')

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/language', {
      method: 'POST',
      body: JSON.stringify({
        ...data
      }),
      headers:{
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      }
    })

    const text = await response.text()
    if(text === 'updated') router.reload()

  }

  const handleDeleteLanguage = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    const token = localStorage.getItem('token')

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/language/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    const text = await response.text()
    if(text === 'deleted') router.reload()

  }

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>Adicionar Idioma</h3>
        <h4>Idiomas que você fala:</h4>
        <div className="list">
          {realtor?.RealtorLanguages.map(item => (
            <p key={item.Language.id} >
              {item.Language.name}
              <Image onClick={e => handleDeleteLanguage(e)} id={String(item.Language.id)} className="close-icon" src={closeIcon} alt="close icon"/>
            </p>
          ))}
        </div>

        <input placeholder='Idioma' type="text" {...register('name', {required: true})} />
        <button type='submit'>Criar</button>

        <p className='close' onClick={() => setOpen(false)}>X</p>
      </form>
    </Container>
    : <></>
  );
};

export default AddLanguageModal;