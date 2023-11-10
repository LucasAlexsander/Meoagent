import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import LoadingContext from "context/LoadingContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import styled from "styled-components";

const VerifyContainer = styled.div`
`

const Verify = () => {

  const { setOpen:setLoadingOpen } = useContext(LoadingContext) as ModalOpenContextType

  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    const fetchData = async () => {
      setLoadingOpen(true)
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/agency' + '/verify', {
        method: 'PUT',
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: 'Bearer ' + token
        }
      })
  
      const text = await response.text()
  
      if(text === 'updated') router.push('/')
      setLoadingOpen(false)
    } 
    fetchData()
  }, [router, token, setLoadingOpen])

    return (
      <VerifyContainer>
      </VerifyContainer>
    );
};

export default Verify;