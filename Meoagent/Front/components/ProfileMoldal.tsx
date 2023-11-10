import { UserContextType } from '@/types/UserContextType';
import UserContext from 'context/UserContext';
import locales from 'locales';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

type ProfileMoldalProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
} 

const Container = styled.div`
  @media only screen and (max-width: 1000px){
    top: 12rem;
    right: 6rem;
  }
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10rem;
  right: 5rem;
  text-align: center;
  z-index: 2;
  background-color: var(--surface);
  border: solid 0.1rem var(--border-color);
  a, p{
    padding: 2rem;
    width: 100%;
    border-top-left-radius: 3rem;
    border-top-right-radius: 3rem;
    font-size: 1.7rem;
    transition: all .5s;
    :hover{
      background-color: #cecece;
    }
  }
  .out{
    
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 3rem;
    border-bottom-right-radius: 3rem;
  }
`

const ProfileMoldal = ({ open, setOpen }: ProfileMoldalProps) => {

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  const { user, setUser } = useContext(UserContext) as UserContextType

  const [accType, setAccType] = useState('')

  const [id, setId] = useState('')

  const signOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('pic')
    localStorage.removeItem('accountType')
    setUser({token:'', id:null, profilePicture: null, coverPicture: null, accountType: null})
    setOpen(false)
    router.reload()
  }

  useEffect(() => {
    const accountType = localStorage.getItem('accountType')
    if(accountType){
      setAccType(accountType)
    }
  },[])

  useEffect(() => {
    const id = localStorage.getItem('id')
    if(user.id) setId(String(user.id))
    else if(id) setId(id)
  }, [user])
  return (

    open ?
    <Container className='card'>

      <Link onClick={() => setOpen(false)} href={`/profile/` + accType + '/' + id}>{t.profileModal.profile}</Link>
      <p onClick={signOut} className='out'>{t.profileModal.signOut}</p>

    </Container>
    : <></>
  );
};

export default ProfileMoldal;