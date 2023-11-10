import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/router";
import locales from "locales";

const VerifyRealtorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  form{
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 50%;
    gap: 2rem;
    h4{
      font-size: 1.3rem;
    }
    h2{
      margin-bottom: 2rem;
    }
    padding: 2rem 3rem;
  }
`

const VerifyRealtor = () => {

  const { register, handleSubmit } = useForm<{email:string}>()

  const { setOpen:setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {

    const fetchData = async () => {

      const token = localStorage.getItem('token') as string
      if(token === null) router.push('/')
      else{
        setLoadingOpen(true)
        const user = decode(token) as { id:number, email:string, firstName: string, lastName: string}
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/realtor' + '/verify', {
          method: 'POST',
          body: JSON.stringify({email: user.email}),
          headers: {"Content-type": "application/json; charset=UTF-8"}
        })
  
        const text = await response.text()
  
        if(text === 'email sended') console.log(text)
        setLoadingOpen(false)
      }
    }

    fetchData()
  }, [router, setLoadingOpen])


    return (
      <VerifyRealtorContainer >

        <form action="">

          <h2>{t.verifyAccount.verifyYourAccount}</h2>

          <p>{t.verifyAccount.weSend}</p>

        </form>


      </VerifyRealtorContainer>
    );
};

export default VerifyRealtor;