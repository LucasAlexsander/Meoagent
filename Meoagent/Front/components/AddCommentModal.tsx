import { AddCommentForm } from "@/types/AddCommentForm";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import locales from "locales";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
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
    height: 65rem;
    width: 40%;
    border-radius: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 2rem;
    padding-top: 4rem;
    @media (max-width: 600px) {
      width: 80%;
    }
    div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      width: 80%;
      p{
        font-weight: bold;
      }
    }
  }
  textarea{
    min-height: 20rem;
  }
  .redirect{
    position: absolute;
    top: 50%;
    font-weight: bold;
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
`

type AddCommentModalProps = {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const AddCommentModal = ({open, setOpen}: AddCommentModalProps) => {
  const [marketExpertiseRating, setMarketExpertiseRating] = useState(0)
  const [responsivenessRating, setResponsivenessRating] = useState(0)
  const [negotiationSkillsRating, setNegotiationSkillsRating] = useState(0)
  const [profissionalismAndComunicationRating, setProfissionalismAndComunicationRating] = useState(0)

  const {setOpen:setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType

  const handleMarketRating = (rate: number) => {
    setMarketExpertiseRating(rate)
  }

  const handleResponsiveRating = (rate: number) => {
    setResponsivenessRating(rate)
  }

  const handleNegotiationRating = (rate: number) => {
    setNegotiationSkillsRating(rate)
  }

  const handleProfissionalismRating = (rate: number) => {
    setProfissionalismAndComunicationRating(rate)
  }

  const { register, handleSubmit } = useForm<AddCommentForm>()

  const [accType, setAccType] = useState('')

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]
  
  const profileType = router.pathname.includes("agency")?"agency":"realtor"
  const { id:profileId } = router.query
  
  const onSubmit = async (data: AddCommentForm) => {

    const localId = localStorage.getItem('id')

    setLoadingOpen(true)
    const realtorBody = {
      ...data,
      marketExpertiseRating,
      responsivenessRating,
      negotiationSkillsRating,
      profissionalismAndComunicationRating,
      clientId: Number(localId),
      realtorId: Number(profileId)
    }
    const agencyBody = {
      ...data,
      marketExpertiseRating,
      responsivenessRating,
      negotiationSkillsRating,
      profissionalismAndComunicationRating,
      clientId: Number(localId),
      agencyId: Number(profileId)
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/comment/'+profileType, {
      method: 'POST',
      body: JSON.stringify(profileType==="agency"?agencyBody:realtorBody),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const text = await response.text()
    setLoadingOpen(false)
    if(text === 'created') router.reload()

  }

  useEffect(() => {
    const accountType = localStorage.getItem('accountType')

    if(accountType){
      setAccType(accountType)
    }

  }, [open])

  return (
    (open) ?
    <Container className='modal'>
      <form onSubmit={handleSubmit(onSubmit)} action="">
        {accType === 'client' ? (
          <>
            <h3>{t.review.createAReview}</h3>
            <div>
              <p>{t.review.marketKnowledge} </p>
              <Rating
                onClick={handleMarketRating}
              />
            </div>
            <div>
              <p>{t.review.responsiveness} </p>
              <Rating
                onClick={handleResponsiveRating}
              />
            </div>
            <div>
              <p>{t.review.negotiation} </p>
              <Rating
                onClick={handleNegotiationRating}
              />
            </div>
            <div>
              <p>{t.review.professionalismAndCommunication} </p>
              <Rating
                onClick={handleProfissionalismRating}
              />
            </div>
            <textarea placeholder={t.review.writeYourCommentHere} {...register('text', {required: true})}/>
            <p className="close" onClick={() => setOpen(false)}>X</p>
            <button type="submit"> {t.addCity.add} </button>
          </>

        ): (
          <>
            <p className="close" onClick={() => setOpen(false)}>X</p>
            <p className="redirect">Faça login como cliente</p>
          </>
        ) }
      </form>
    </Container>
    : <></>
  );
};

export default AddCommentModal