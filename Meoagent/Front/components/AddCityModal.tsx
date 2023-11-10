import { AddCityForm } from '@/types/AddCityForm';
import { RealtorProfile } from '@/types/RealtorProfile';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import closeIcon from '../public/close.svg'
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import LoadingContext from 'context/LoadingContext';
import locales from 'locales';

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
    select{
      width: 70%;
    }
    @media (max-width: 600px) {
      width: 80%;
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

type AddCityModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddCityModal = ({open, setOpen}: AddCityModalProps) => {

  const { register, handleSubmit } = useForm<AddCityForm>()

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const [user, setUser] = useState<any>()

  const [cities, setCities] = useState<Array<string>>()

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    const fetchData = async () => {
      const localId = localStorage.getItem('id')
      const accType = localStorage.getItem('accountType')
      if(localId){

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/'+accType+'/' + localId)
        const userData = await response.json()
        setUser(userData)

        const responseCities = await fetch(process.env.NEXT_PUBLIC_API_URL + '/city/'+accType+'/' + localId)
        const data = await responseCities.json()
        setCities(data)

      }

    }

    fetchData()
  }, [open])

  function reload() {
    const fetchData = async () => {
      const localId = localStorage.getItem('id')
      const accType = localStorage.getItem('accountType')
      if(localId){
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/'+accType+'/' + localId)
        const userData = await response.json()
        setUser(userData)

        const responseCities = await fetch(process.env.NEXT_PUBLIC_API_URL + '/city/'+accType+'/' + localId)
        const data = await responseCities.json()
        setCities(data)
      }
    }
    fetchData()
  }

  const onSubmit = async (data: AddCityForm) => {
    const token = localStorage.getItem('token')
    const accType = localStorage.getItem('accountType')
    setLoadingOpen(true)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/city/'+accType, {
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
    setLoadingOpen(false)
    reload()

  }

  const handleDeleteCity = async (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    
    const { id } = target

    console.log(id)

    const token = localStorage.getItem('token')
    const accType = localStorage.getItem('accountType')
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/city/'+accType+'/' + id, {
      method: 'DELETE',
      headers:{
        authorization: 'Bearer ' + token
      }
    })

    const text = await response.text()
    reload()

  }

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>{t.addCity.addCity}</h3>
        <h4>{t.addCity.placeWhere}</h4>
        <div className="list">
          {user?.RealtorCities?.map((item:any) => (
            <p key={item.id} >
              {item.City.name}
              <Image onClick={e => handleDeleteCity(e)} id={String(item.id)} className="close-icon" src={closeIcon} alt="close icon"/>
            </p>
          ))}
          {user?.AgencyCities?.map((item:any) => (
            <p key={item.id} >
              {item.City.name}
              <Image onClick={e => handleDeleteCity(e)} id={String(item.id)} className="close-icon" src={closeIcon} alt="close icon"/>
            </p>
          ))}
        </div>
        {cities?.length === 0 ? (
          <h4>{t.addCity.youHaveNoMore}</h4>
        ): (
          <>
            <select {...register('name', { required: true})}>
              {cities?.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
            <button type='submit'>{t.addCity.add}</button>
          </>

        )}
        <p className='close' onClick={() => setOpen(false)}>X</p>
      </form>
    </Container>
    : <></>
  );
};

export default AddCityModal;