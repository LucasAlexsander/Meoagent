import { AddServiceForm } from '@/types/AddServiceForm';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import { RealtorService } from '@/types/RealtorService';
import { Service } from '@/types/Service';
import LoadingContext from 'context/LoadingContext';
import locales, { servicesLocales } from 'locales';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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
    select{
      width: 70%;
    }
    @media (max-width: 800px) {
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
  h3{
    margin-bottom: 2rem;
  }
  h4{
    font-size: 2rem;
    font-style: italic;
    color: var(--surface-2);
  }
`

type AddServiceModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddServiceModal = ({open, setOpen}: AddServiceModalProps) => {

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const { register, handleSubmit } = useForm<AddServiceForm>()

  const [services, setServices] = useState<Service []>()

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    const fetchData = async () => {
      const localId = localStorage.getItem('id')
      const accountType = localStorage.getItem('accountType')
      if(localId){
        const responseServices = await fetch(process.env.NEXT_PUBLIC_API_URL + '/service')
  
        let data = await responseServices.json() as Service []
  
        const responseRealtorServices = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/service/${accountType==="agency"?"agenct":"realtor"}/${localId}`)
  
        const realtorServicesData = await responseRealtorServices.json() as RealtorService []
  
        const realtorServicesNames = realtorServicesData.map( item => item.service.title )
  
        const deleteSet = new Set(realtorServicesNames)
  
        data = data.filter(item => !deleteSet.has(item.title))
        setServices(data)
      }
    }
    fetchData()
  }, [open, setLoadingOpen])

  const onSubmit = async (data: AddServiceForm) => {

    const localId = localStorage.getItem('id')
    const accountType = localStorage.getItem('accountType')
    const realtorBody = {
      serviceId: Number(data.serviceId),
      realtorId: Number(localId)
    }
    const agencyBody = {
      serviceId: Number(data.serviceId),
      agencyId: Number(localId)
    }

    setLoadingOpen(true)
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/service/'+accountType, {
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

  return (
    open ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        <h3>{t.addServices.createService}</h3>
        {services?.length === 0 ? (
          <h4>{t.addServices.YouHaveNoMore}</h4>
        ): (
          <>
            <select {...register('serviceId', { required: true})} name="serviceId" >
              {
                locale === 'pt' &&(

                  services?.map(item => (
                  
                    <option key={item.id} value={item.id}>{servicesLocales.pt[item.title as keyof typeof servicesLocales.pt]}</option>

                  ))
                )
              }
              {
                locale === 'en' &&(

                  services?.map(item => (
                  
                    <option key={item.id} value={item.id}>{servicesLocales.en[item.title as keyof typeof servicesLocales.en]}</option>

                  ))
                )
              }
              {
                locale === 'es' &&(

                  services?.map(item => (
                  
                    <option key={item.id} value={item.id}>{servicesLocales.es[item.title as keyof typeof servicesLocales.es]}</option>

                  ))
                )
              }
            </select>
            <button type='submit'>{t.addServices.create}</button>
          </>

        )}
        <p onClick={() => setOpen(false)}>X</p>
      </form>
    </Container>
    : <></>
  );
};

export default AddServiceModal;