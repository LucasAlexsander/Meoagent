import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { RealtorProfile } from '@/types/RealtorProfile';
import Image from 'next/image';
import profileIcon from '../public/profile.svg'
import { PictureModalData } from '@/types/PictureModalData';
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import { useRouter } from 'next/router';
import { ApiService } from '@/services/ApiService';

type PictureProfileModalProps = {
  data: PictureModalData
  setData: Dispatch<SetStateAction<PictureModalData>>,
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
  .profile-pic{
    height: 20rem;
    width: 20rem;
    border-radius: 50%;
    object-fit: cover;
  }
  p{
    cursor: pointer;
    position: absolute;
    top: 5rem;
    right: 5rem;
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

const ProfilePictureModal = ({data, setData}:PictureProfileModalProps) => {

  const { user, setUser } = useContext(UserContext) as UserContextType

  const [pic, setPic] = useState('')

  const [sessionProfile, setSessionProfile] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const localId = localStorage.getItem('id')
    if(Number(localId) === data.userSigned?.id) setSessionProfile(true)
    else setSessionProfile(false)

    if(data.userSigned?.profilePicture) setPic(data.userSigned?.profilePicture)

  }, [user.id, data.userSigned?.id, setPic, data.userSigned?.profilePicture])



  const handleChange = (e:React.ChangeEvent) => {


    const target = e.target as HTMLInputElement

    const files = target.files as FileList

    const file = files[0]

    if(FileReader && file){
      const fr = new FileReader()
      const token = localStorage.getItem('token')
      const accountType = localStorage.getItem('accountType')

      const onload = async () => {
        const img = document.getElementById('profile-pic-modal') as HTMLImageElement
        const apiService = new ApiService()

        img.src = fr.result as string

        const text = await apiService.updateProfilePicture(accountType as string, fr, token as string)
        
        if(text === 'updated'){
          localStorage.setItem('pic', fr.result as string)
          setUser({id: user.id, token: user.token, profilePicture: fr.result as string, coverPicture: user.coverPicture, accountType: accountType})
          router.reload()
        }
      }

      fr.onload = onload

      fr.readAsDataURL(file)
    }

  }

  return (
    data.open ? 
    <Container className='modal'>
      <Image height={200} width={200} id='profile-pic-modal' className='profile-pic' src={pic ? pic : profileIcon} alt='profile picture'/>
      <p onClick={() => setData({
        open:false,
        userSigned: data.userSigned
      })}>X</p>

      {sessionProfile && (
        <>
          <label className='button' htmlFor="profile-pic">
            Editar
          </label>
          <input onChange={e => handleChange (e)} id="profile-pic" type="file" />
        </>
      )}
    </Container>
    : <></>
  );
};

export default ProfilePictureModal;