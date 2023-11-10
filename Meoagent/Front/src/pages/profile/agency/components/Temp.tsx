import { AgencyProfile } from "@/types/AgencyProfile";
import MainInfoAgency from "components/MainInfoAgency";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 4rem;
  gap: 2rem;

  .services{

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding: 3rem;
    gap: 2rem;
    position: relative;
    flex-wrap: wrap;
    .service{
      flex-shrink: 0;
      scroll-snap-align: start;
      background-color: var(--base);
      padding: 1rem;
      border-radius: 3rem;
      position: relative;
      display: flex;
      align-items: center;
      gap: 2rem;
      .close{
        position: relative;
      }
    }
  }

  .plus{
      cursor: pointer;
      height: 3rem;
      width: 3rem;
      position: absolute;
      top: 3rem;
      right: 3rem;
  }

  .introduction{
    padding: 3rem;
    align-items: flex-start;
    position: relative;
    p{
      margin: 2rem;
      white-space: pre-wrap;
    }
    .elipses-button{
      cursor: pointer;
    }
  }

  .properties{
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 3rem;
    position: relative;
    .list{
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 2rem;
      scroll-snap-type: x mandatory;
      padding: 1rem;
      overflow: auto;
      .plus{
        cursor: pointer;
        height: 3rem;
        width: 3rem;
        position: absolute;
        top: 3rem;
        right: 3rem;
      }
      .propertie{
        flex-shrink: 0;
        scroll-snap-align: start;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background-color: var(--base);
        padding: 1.5rem;
        border-radius: 3rem;
        width: 40rem;
        position: relative;
        .footer{
          display: flex;
          justify-content: space-between;
          .sub-text{
            font-style: italic;
          }
        }
        h2{
          color: var(--surface-2);
        }
        h3{
          color: var(--surface-2);
        }
        .property-img{
          margin-top: 3rem;
          object-fit: cover;
          opacity: 1;
          border-radius: 3rem;
          width: 100%;
          height: 100%;
          max-height: 25rem;
        }
        .close{
          position: absolute;
          right: 1rem;
        }
        .special-link{
          width: 12rem;
        }
      }
    }
  }


`

export default function Temp(){

  const [agency, setAgency] = useState<AgencyProfile>()

  const [sessionProfile, setSessionProfile] = useState(false)

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    const fetchData = async () => {
      if(id){
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/agency/' + id)
        const data = await response.json()
        setAgency(data)
      }
    }
    const localId = localStorage.getItem('id') as string
    if(Number(id) === Number(localId)) setSessionProfile(true)

    fetchData()

  }, [id])

  return(
    <Container>
      <MainInfoAgency userSigned={agency as AgencyProfile} isProfile={true}/>
    </Container>
  )
}