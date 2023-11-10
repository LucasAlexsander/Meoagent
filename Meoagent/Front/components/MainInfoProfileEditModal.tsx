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
import LoadingContext from 'context/LoadingContext';
import locales from 'locales';

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
    height: auto;
    width: 90%;
    max-width: 90rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem;
    gap: 1rem;
    overflow-y: scroll;
    textarea{
      min-height: 20rem;
      @media (max-width: 650px) {
        min-height: 15rem;
        width:90%;
      }
    }
    input{
      min-width: 30rem;
      @media (max-width: 650px) {
        height: 5rem;
      }
    }
    h3{
      margin-bottom: 2rem;
    }
    .input-group{
      display: flex;
      @media (max-width: 650px) {
        flex-direction: column;
        align-items: center;
      }
      gap: 1rem;
      justify-content: center;
      width: 100%;
      select{
        width: 50%;
      }
    }
    .options{
      @media (max-width: 650px) {
        flex-direction: row;
        button{
          @media (max-width: 400px) {
            width: 10px;
          }
        }
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

const MainInfoProfileEditModal = ({open, setOpen}: MainInfoProfileEditModalProps) => {

  const { register, handleSubmit } = useForm<MainEditForm>()
  const { user } = useContext(UserContext) as UserContextType

  const { setOpen: setCityModalOpen } = useContext(AddCityModalContext) as ModalOpenContextType

  const { setOpen: setLanguageModalOpen } = useContext(AddLanguageModalContext) as ModalOpenContextType

  const {setOpen: setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const [accType, setAccType] = useState('')
  
  const [userSigned, setUserSigned] = useState<RealtorProfile>()
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  const [wppMask, setWppMask] = useState('')
  const [phoneMask, setPhoneMask] = useState('')

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

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
  }, [user.id, setLoadingOpen])

  const onSubmit = async (data: MainEditForm) => {
    const token = localStorage.getItem('token')
    if(data.website && !data.website.startsWith('https://')){
      data.website = 'https://' + data.website
    }
    if(accType === 'realtor'){
      setLoadingOpen(true)
      const { expTime, ...payload} = data
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor/', {
        method:'PUT',
        body: JSON.stringify({
          ...payload,
          expTime: Number(expTime),
          whatsapp,
          phone
        }),
        headers:{
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      })
      const text = await response.text()
      setLoadingOpen(false)
      router.reload()
    }else if(accType === 'agency'){
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/agency/', {
        method:'PUT',
        body: JSON.stringify({
          
          address: data.address,
          email: data.email,
          facebook: data.facebook,
          instagram: data.instagram,
          name: data.name,
          phoneCountry: data.phoneCountry,
          website: data.website,
          wppCountry: data.wppCountry,
          wppText: data.wppText,
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
  }
  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>Editar Perfil</h3>
        <div className="input-group">
          {accType === 'realtor' && (
            <>
              <input {...register('firstName', {required: true})} defaultValue={userSigned?.firstName} type="text" placeholder={t.mainInfoEditModal.name} />
              <input {...register('lastName',  {required: true})} defaultValue={userSigned?.lastName} type="text" placeholder={t.mainInfoEditModal.lastName} />
            </>
          )}
          {accType === 'agency' && (
            <input {...register('name', {required: true})} defaultValue={userSigned?.name} type="text" placeholder='Nome' />
          )}
        </div>
        <div className="input-group options">
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
          <InputMask type='text' onChange={e => setPhone(e.target.value)} defaultValue={userSigned?.phone ? userSigned?.phone : '+55 99 9 9999 9999'} placeholder={t.mainInfoEditModal.phone} mask={phoneMask} maskChar="_" />
          <InputMask type='text' onChange={e => setWhatsapp(e.target.value)} defaultValue={userSigned?.whatsapp ? userSigned?.whatsapp : '+55 99 9 9999 9999'} placeholder='Whatsapp' mask={wppMask} maskChar="_" />
        </div>
        <div className="input-group">
          <input {...register('email', {required: true})} defaultValue={userSigned?.email} type="email" placeholder={t.mainInfoEditModal.email}/>
          <input {...register('instagram')} defaultValue={userSigned?.instagram ? userSigned?.instagram : ''} type="text" placeholder={t.mainInfoEditModal.instagramLink} />
        </div>
        <div className="input-group">
          <input {...register('facebook')} defaultValue={userSigned?.facebook ? userSigned?.facebook : ''} type="text" placeholder={t.mainInfoEditModal.facebookLink}/>
          <input {...register('website')} defaultValue={userSigned?.website ? userSigned?.website : ''} type="text" placeholder={t.mainInfoEditModal.personalWebsite} />
        </div>
        {accType === 'realtor' && (          
          <div className="input-group">
            <input {...register('expTime')} defaultValue={userSigned?.expTime ? userSigned?.expTime : 0} type="number" placeholder={t.mainInfoEditModal.whenYouStarted}/>
          </div>
        )}
        {accType === 'agency' && (          
          <div className="input-group">
            <input {...register('address')} defaultValue={userSigned?.address ? userSigned?.address : ""} type="text" placeholder={"Endereço"}/>
          </div>
        )}
        <textarea {...register('wppText')} defaultValue={ userSigned?.wppText ? userSigned.wppText : ''} placeholder={t.mainInfoEditModal.welcomeMessage}></textarea>
        <div className="input-group options">
          <button onClick={handleAddCity}>{t.mainInfoEditModal.addWorkArea}</button>
          <button onClick={handleAddLanguage}>{t.mainInfoEditModal.addLanguage}</button>
        </div>
          <button>{t.mainInfoEditModal.save}</button>
        <p onClick={() => setOpen(false)}>X</p>
      </form>
    </Container>
    : <></>
  );
};

export default MainInfoProfileEditModal;