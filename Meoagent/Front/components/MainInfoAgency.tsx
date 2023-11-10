import { RealtorProfile } from '@/types/RealtorProfile';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import profileIcon from '@/../public/profile.svg'
import agencyIcon from '@/../public/agency.svg'
import styled from 'styled-components';
import PictureModalContext from 'context/PictureModalContext';
import { PictureModalContextType } from '@/types/PictureModalContextType';
import editIcon from '../public/edit.svg'
import whatsappIcon from '../public/whatsapp.svg'
import mailIcon from '../public/mail.svg'
import webIcon from '../public/web.svg'
import instagramIcon from '../public/instagram.svg'
import facebookIcon from '../public/facebook.svg'
import greyImage from '../public/grey.png'
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import Link from 'next/link';
import { ApiService } from '@/services/ApiService';
import { useRouter } from 'next/router';
import { AgencyProfile } from '@/types/AgencyProfile';
import MainInfoAgencyEditModalContext from 'context/MainInfoAgencyEditModal';
import locales from 'locales';


type ContainerProps = {
  isProfile: boolean
}

const Container = styled.div<ContainerProps>`
  position: relative;

  min-height: ${props => props.isProfile ? '40rem' : '20rem'};
  @media only screen and (max-width: 900px){
    min-height: ${porps => porps.isProfile ? '60rem': '40rem'};
    height: 100%;

  }
  .main-info{
    .top{
      position: absolute;
      width: 100%;
      height: 22rem;
      top: 0;
      left: 0;
      .label-back{
        background-color: var(--surface);
        border-radius: 50%;
        height: 4rem;
        width: 4rem;
        position: absolute;
        top: 1rem;
        right: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          position: unset;
        }
      }
    }
    display: flex;
    align-items: center;
    background-color: var(--surface);
    padding: 3rem;
    border-radius: 3rem;
    height: 100%;
    gap: 1rem;
    .cover-photo{
      position: absolute;
      height: 100%;
      top: 0;
      left: 0;
      width: 100%;
      border-top-left-radius: 3rem;
      border-top-right-radius: 3rem;
      object-fit: cover;
    }
    .profile{      
      height: ${porps => porps.isProfile ? '20rem': '10rem'};
      width: ${porps => porps.isProfile ? '20rem': '10rem'};
      border-radius: 50%;
      object-fit: cover;
      position: relative;
      @media only screen and (max-width: 900px){
        margin-bottom: unset;
      }
    }
    @media only screen and (max-width: 900px){
      flex-direction: column;
    }
    .sub-content{
      @media only screen and (max-width: 900px){
        flex-direction: column;
        gap: 2rem;
        margin-top: unset;
        margin-left: unset;
      }
      margin-top: ${porps => porps.isProfile ? '20rem': 'unset'};
      margin-left: ${porps => porps.isProfile ? '10rem': '2rem'};
      width: 60%;
      display: flex;
      justify-content: space-between;
      gap: 10rem;
    }
    .about{
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      min-width: 15rem;
      color: var(--surface-2);
      @media only screen and (max-width: 900px){
        align-items: center;
        min-width: 100%;
      }
    }
    .about-2{
      position: relative;
      @media only screen and (max-width: 900px){
        align-items: center;
        text-align: center;
      }
      height: 100%;
      display: flex;
      color: var(--surface-2);
      flex-direction: column;
      justify-content: flex-end;
      gap: 0.5rem;
      p{
        gap: .5rem;
      }
    }
    .contact{
      flex-grow: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 2rem;
      position: absolute;
      bottom: 8rem;
      right: 2rem;
      @media only screen and (max-width: 900px){
        position: unset;
      }
      .icon{
        height: 3rem;
        width: 3rem;
        cursor: pointer;
        opacity: 0.7;
        transition: all .5s;
        :hover{
          opacity: 1;
        }
      }
    }
    .current-agency{
      background-color: var(--surface);
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 1rem;
      border-radius: 1rem;
      position: absolute;
      bottom: ${porps => porps.isProfile ? '20rem': 'unset'};
      right: 2rem;
      @media only screen and (max-width: 900px){
        position: unset;
      }
      .agency{
        height: 3rem;
        width: 3rem;
      }
    }
    .profile-pointer{
      cursor: pointer;
    }
    h1{
      font-weight: normal;
    }
    h3{
      color: var(--star);
    }
    p{
      width: 60rem;
      max-height: 10rem;
      display: block; 
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`

type MainInfoAgencyProps = {
  userSigned: AgencyProfile
  isProfile: boolean
}

const MainInfoAgency = ({ userSigned , isProfile}: MainInfoAgencyProps) => {

  const { setData } = useContext(PictureModalContext) as PictureModalContextType

  const { user, setUser } = useContext(UserContext) as UserContextType

  const { setOpen: mainInfoSetOpen } = useContext(MainInfoAgencyEditModalContext) as ModalOpenContextType

  const [sessionProfile, setSessionProfile] = useState(false)

  const router = useRouter()

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    const localId = localStorage.getItem('id')
    const accounType = localStorage.getItem('accountType')
    if(Number(localId) === userSigned?.id && accounType === 'agency'){
      setSessionProfile(true)
    } 

  }, [user.id, userSigned?.id])

  const handleChangeCover = (e:React.ChangeEvent) => {


    const target = e.target as HTMLInputElement

    const files = target.files as FileList

    const file = files[0]

    if(FileReader && file){
      const fr = new FileReader()
      const token = localStorage.getItem('token')
      const accountType = localStorage.getItem('accountType')

      const onload = async () => {
        const img = document.getElementById('cover-pic') as HTMLImageElement
        const apiService = new ApiService()

        img.src = fr.result as string

        const text = await apiService.updateCoverPicture(accountType as string, fr, token as string)
        
        if(text === 'updated'){

          setUser({id: user.id, token: user.token, coverPicture: fr.result as string, profilePicture: user.profilePicture, accountType: user.accountType})
          router.reload()
        }
      }

      fr.onload = onload

      fr.readAsDataURL(file)
    }

  }

  return (

  <Container isProfile={isProfile}>
    <div className="main-info border">
      <div className='top'>
        {isProfile && (
          <>
            <Image height={1000} width={1000} src={userSigned?.coverPicture ? userSigned.coverPicture : greyImage} alt='cover image' className='cover-photo'/>
            {sessionProfile && (
              <>
                <div className='label-back'>
                  <label htmlFor="cover-pic">
                    <Image className='edit-main' src={editIcon} alt='edit icon'/>
                  </label>
                </div>
                <input onChange={e => handleChangeCover(e)} id="cover-pic" type="file" />
              </>
            )}
          </>
        )}
      </div>
      <Image width={100} height={100} onClick={isProfile ? () => setData({open: true, userSigned}) : () => {}} className= {isProfile ? "profile profile-pointer" : 'profile' } src={ userSigned?.profilePicture ? userSigned.profilePicture : profileIcon} alt='profile icon'/>
      { isProfile && sessionProfile ? (
          <Image onClick={() => mainInfoSetOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
      ): ''}

      <div className="sub-content">
        <div className="about">
          <h1>{userSigned?.name}</h1>
        </div>
        <div className="about-2">
        {userSigned?.AgencyCities && (
          <p>
            <b>
            {t.mainInfo.workArea}
            </b>
              {userSigned.AgencyCities.map((city, index) => (
              ` ${city.City.name} ${index < userSigned.AgencyCities.length -1 ? ',': ''} `
              ))}
          </p>
        )}
        <p>
            <b>
            {t.mainInfo.languages}
            </b> 
            {userSigned?.AgencyLanguages?.map((language, index) => (
              ` ${language.Language.name} ${index < userSigned.AgencyLanguages.length -1 ? ',': ''} `
              ))}
          </p>
          <p><b>{"Email: "}</b>{userSigned?.email}</p>
          <p><b>{"Telefone: "}</b>{userSigned?.phone}</p>
          <p><b>{"Endereço: "}</b>{userSigned?.address}</p>
        </div>
      </div>

      {isProfile ?  (
        <div className="contact">
          {userSigned?.email ? (
            <Link href={'mailto: ' + userSigned.email} target='_blank'>
              <Image className='icon' src={mailIcon} alt='mail icon'/>
            </Link>
          ) : '' }
          {userSigned?.website ? (
            <Link href={userSigned.website} target='_blank'>
              <Image className='icon' src={webIcon} alt='web icon'/>
            </Link>
          ) : '' }
          {userSigned?.whatsapp ? (
            <Link href={'https://wa.me/' + userSigned.whatsapp.split(' ').join('') + `${userSigned.wppText ? '?text=' + encodeURI(userSigned.wppText) :''}` } target='_blank'>
              <Image className='icon' src={whatsappIcon} alt='whatsapp icon'/>
            </Link>
          ) : '' }
          {userSigned?.instagram ? (
            <Link href={userSigned.instagram} target='_blank'>
              <Image className='icon' src={instagramIcon} alt='instagram icon'/>
            </Link>
          ) : '' }
          {userSigned?.facebook ? (
            <Link href={userSigned.facebook} target='_blank'>
              <Image className='icon' src={facebookIcon} alt='facebook icon'/>
            </Link>
          ) : '' }
        </div>
      ): ''}
      
    </div>
  </Container>

  );
};

export default MainInfoAgency;