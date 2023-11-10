import { AddPropertyForm } from '@/types/AddPropertyForm';
import Preservations from '@/types/Preservations';
import PropertyTypes from '@/types/PropertyTypes';
import Rooms from '@/types/Rooms';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import placeholderImg from '../public/placeholder.jpg'
import CurrencyInput from './CurrencyInput';
import AreaInput from './AreaInput';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import LoadingContext from 'context/LoadingContext';
import locales from 'locales';

type AddPropertyModalProps = {
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
    width: 75%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 4rem;
    gap: 1rem;
    @media (max-width: 1200px) {
      width: 75%;
    }
    @media (max-width: 500px) {
      width: 90%;
    }
    .all-infos{
      display: flex;
      gap: 2rem;
      @media (max-width: 1200px) {
        width: 100%;
        flex-direction: column;
      }
      .infos{
        display: flex;
        gap: 2rem;
        .inputs{
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 50%;
        }
        .selections{
          display: flex;
          flex-direction: column;
          gap: 2rem;
          width: 50%;
          select{
            width: 100%;
          }
        }
      }
      .image-place{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (max-width: 1200px) {
          max-height: 25rem;
          max-width: 40rem;
          margin-left: calc(50% - 20rem);
        }
        @media (max-width: 500px) {
          max-height: 20rem;
          max-width: 30rem;
          margin-left: calc(50% - 15rem);
        }
        img{
          opacity: 0.7;
          border-radius: 1rem;
          max-height: 25rem;
          max-width: 40rem;
          object-fit: cover;
          @media (max-width: 500px) {
            max-height: 20rem;
            max-width: 30rem;
            
          }
        }
        label{
          position: absolute;
          top: 5rem;
          right: 0.5rem;
          @media (max-width: 1200px) {
            top: 1rem;
          }
        }
      }
    }
    label{
      background-color: var(--base);
      padding: 1rem;
      border-radius: 1rem;
      cursor: pointer;
    }
  }
  input{
    width: 100%;
  }
  h3{
      margin-bottom: 2rem;
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

const AddPropertyModal = ({open, setOpen}: AddPropertyModalProps) => {

  const { register, handleSubmit } = useForm<AddPropertyForm>()

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const [price, setPrice] = useState('')
  const [grossArea, setGrossArea] = useState('')
  const [usefulArea, setUsefulArea] = useState('')

  const [pic, setPic] = useState('')

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    setPic('')
  }, [open])

  const onSubmit = async (data:AddPropertyForm) => {

    const localId = localStorage.getItem('id')
    const accountType = localStorage.getItem('accountType')
    const realtorBody = {
      propertyData:{
        ...data,
        price,
        grossArea,
        usefulArea,
        profilePicture: pic,
      },
      realtorId: Number(localId)
    }
    const agencyBody = {
      propertyData:{
        ...data,
        price,
        grossArea,
        usefulArea,
        profilePicture: pic,
      },
      agencyId: Number(localId)
    }
    setLoadingOpen(true)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/property/' + accountType, {
      method: 'POST',
      body: JSON.stringify(accountType==="agency"?agencyBody:realtorBody),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    setLoadingOpen(false)
    const text = await response.text()
    if(text === 'created') router.reload()

  }

  const handleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement

    const files = target.files as FileList

    const file = files[0]

    if(FileReader && file){
      const fr = new FileReader()
      const token = localStorage.getItem('token')

      const onload = async () => {
        const img = document.getElementById('property-img') as HTMLImageElement

        img.src = fr.result as string

        setPic(fr.result as string)
        
      }

      fr.onload = onload

      fr.readAsDataURL(file)
    }
  }

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>{t.addPropertiesModal.uploadPropertie}</h3>
        <div className="all-infos">
          <div className="infos">
            <div className="inputs">
              <input {...register('title', {required: true})} type="text" placeholder={t.addPropertiesModal.title} />
              <input {...register('link', {required: true})} type="text" placeholder={t.addPropertiesModal.link}/>
              <CurrencyInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} placeholder="0.00 €"/>
              <AreaInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => setGrossArea(e.target.value)} placeholder={t.addPropertiesModal.grossArea}/>
            </div>
            <div className="selections">
              <select {...register('propertyType')} name="propertyType" id="propertyType">
                {Object.entries(PropertyTypes[locale as keyof typeof PropertyTypes]).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                  ))}
              </select>
              <select {...register('rooms')} name="rooms" id="rooms">
                {Object.entries(Rooms).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                  ))}
              </select>
              <select {...register('preservation', { required: true})} name="preservation" id="preservation">
                {Object.entries(Preservations[locale as keyof typeof Preservations]).map(([key, value]) => (
                  <option key={key} value={key}>{value}</option>
                  ))}
              </select>
              <AreaInput onChange={(e:React.ChangeEvent<HTMLInputElement>) => setUsefulArea(e.target.value)}  placeholder={t.addPropertiesModal.usableArea}/>
            </div>
          </div>
          <div className="image-place">
            <Image id="property-img" height={400} width={400} className='property-img' src={pic ? pic : placeholderImg} alt='property image'>
            </Image>
            <label htmlFor="property-pic">
                {t.addPropertiesModal.edit}
            </label>
            <input onChange={e => handleChange (e)} id="property-pic" type="file" />
          </div>
        </div>
        <p onClick={() => setOpen(false)}>X</p>
        <button type='submit'>{t.addPropertiesModal.uploadPropertie}</button>
      </form>
    </Container>
    : <></>
  );
};

export default AddPropertyModal;