import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import { RealtorProfile } from '@/types/RealtorProfile';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { MainEditForm, MainEditFormAgency } from '@/types/MainEditForm';
import { AgencyProfile } from '@/types/AgencyProfile';
import AddCityModalContext from 'context/AddCityModalContext';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import AddLanguageModalContext from 'context/AddLanguageModalContext';

type MainInfoProfileEditModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Container = styled.div`
  position: absolute;
  z-index: 3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;
  form{
    position: relative;
    height: 90%;
    width: 90rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem;
    gap: 2rem;
    overflow-y: scroll;
    textarea{
      min-height: 20rem;
    }
    input{
      min-width: 30rem;
    }
    h3{
      margin-bottom: 2rem;
    }
    .input-group{
      display: flex;
      gap: 2rem;
      justify-content: center;
      width: 100%;
      select{
        width: 50%;
      }
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
    color: white;
    border-radius: 1rem;
    font-weight: bold;
  }
`

const MainInfoAgencyEditModal = ({open, setOpen}: MainInfoProfileEditModalProps) => {
  const { register, handleSubmit } = useForm<MainEditForm>()
  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: setCityModalOpen } = useContext(AddCityModalContext) as ModalOpenContextType

  const { setOpen: setLanguageModalOpen } = useContext(AddLanguageModalContext) as ModalOpenContextType

  const [accType, setAccType] = useState('')
  
  const [userSigned, setUserSigned] = useState<AgencyProfile>()
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  const [wppMask, setWppMask] = useState('')
  const [phoneMask, setPhoneMask] = useState('')

  const router = useRouter()

  const handleAddCity = () => {
    setCityModalOpen(true)
    setOpen(false)
  }

  const handleAddLanguage = () => {
    setLanguageModalOpen(true)
    setOpen(false)
  }

  useEffect(() => {
    const accountType = localStorage.getItem('accountType')
    if(accountType){
      setAccType(accountType)
    }
  }, [])

  useEffect(() => {
    const accountType = localStorage.getItem('accountType')
    const fetchData = async () => {

      const localId = localStorage.getItem('id')
      if(localId !== undefined){
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/${accountType}/` + localId, {
          method: 'GET'
        })
        const json = await response.json()
        setUserSigned(json)
        setWhatsapp(json.whatsapp)
        setPhone(json.phone)
      }


    }
    fetchData()
  }, [user.id])

  const onSubmit = async (data: MainEditForm) => {
    const token = localStorage.getItem('token')
    if(data.website && !data.website.startsWith('https://')){
      data.website = 'https://' + data.website
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/agency/', {
      method:'PUT',
      body: JSON.stringify({
        ...data,
        whatsapp,
        phone
      }),
      headers:{
        authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    const text = await response.text()
    router.reload()
    
  }

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>Editar Perfil</h3>
        <div className="input-group">

          <input {...register('name', {required: true})} defaultValue={userSigned?.name} type="text" placeholder='Nome' />

        </div>
        <div className="input-group">
          <select {...register('phoneCountry', {required: true})} defaultValue={userSigned?.phoneCountry as string} onChange={e => setPhoneMask(e.target.value)} >
            <option value="+55 99 9 9999 9999">Brasil</option>
            <option value="+351 999 999 999">Portugal</option>
            <option value="+34 999 999 999">Espanha</option>
          </select>
          <select {...register('wppCountry', {required: true})} defaultValue={userSigned?.wppCountry as string} onChange={e => setWppMask(e.target.value)} >
            <option value="+55 99 9 9999 9999">Brasil</option>
            <option value="+351 999 999 999">Portugal</option>
            <option value="+34 999 999 999">Espanha</option>
          </select>

        </div>
        <div className="input-group">
          <InputMask type='text' onChange={e => setPhone(e.target.value)} defaultValue={userSigned?.phone ? userSigned?.phone : '+55 99 9 9999 9999'} placeholder='telefone' mask={phoneMask} maskChar="_" />
          <InputMask type='text' onChange={e => setWhatsapp(e.target.value)} defaultValue={userSigned?.whatsapp ? userSigned?.whatsapp : '+55 99 9 9999 9999'} placeholder='whatsapp' mask={wppMask} maskChar="_" />
        </div>
        <div className="input-group">
          <input {...register('email', {required: true})} defaultValue={userSigned?.email} type="email" placeholder='mail@mail.com'/>
          <input {...register('instagram')} defaultValue={userSigned?.instagram ? userSigned?.instagram : ''} type="text" placeholder='link instagram' />
        </div>
        <div className="input-group">
          <input {...register('facebook')} defaultValue={userSigned?.facebook ? userSigned?.facebook : ''} type="text" placeholder='link facebook'/>
          <input {...register('website')} defaultValue={userSigned?.website ? userSigned?.website : ''} type="text" placeholder='link site pessoal' />
        </div>

        <textarea {...register('wppText')} defaultValue={ userSigned?.wppText ? userSigned.wppText : ''} placeholder='Defina uma mensagem de boas vindas no whatsapp'></textarea>
        {/* <div className="input-group">
          <button onClick={handleAddCity}>Adicionar Local de Atuação</button>
          <button onClick={handleAddLanguage}>Adicionar Idioma Falado</button>
        </div> */}
          <button>Salvar</button>
        <p onClick={() => setOpen(false)}>X</p>
      </form>
    </Container>
    : <></>
  );
};

export default MainInfoAgencyEditModal;