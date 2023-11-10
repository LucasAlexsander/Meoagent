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
import MainInfoProfileEditModalContext from 'context/MainInfoProfileEditModalContext';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import Link from 'next/link';
import { ApiService } from '@/services/ApiService';
import { useRouter } from 'next/router';
import { LastExp } from '@/types/LastExp';
import locales from 'locales';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

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
      margin-left: ${porps => porps.isProfile ? '2rem': '2rem'};
      display: flex;
      gap: 5rem;
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
        overflow-wrap: break-word;
      }
      .bottom{
        display: flex;
        flex-direction: row;
        .bottom-1, .bottom-2{
          width: 20rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
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
      background: #fff;
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

    @media (width < 768px) {
      p {
        font-size: 1.8rem;  
      }
    }
    /* p{
      width: 60rem;
      max-height: 10rem;
      display: block; 
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    } */
    background: #fff;
  }
`

type ToolTipContainerProps = {
  show: boolean,
  posX: number,
  posY:number,
}


const ToolTipContainer = styled.div<ToolTipContainerProps>`
cursor: default;
background-color:#D3D2D2;
padding:10px;
position:fixed;
min-width: 150px;
  top:${porps => `${porps.posY}px`};
  left:${porps => `${porps.posX}px`};
  z-index:15;
  display:${porps => porps.show ? 'flex': 'none'};
  flex-direction:column;
  gap:3px;
  border-radius:5px;
  list-style-type: none;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  .cities-list{
    overflow-y:auto;
    max-height:290px;
  }
  `

type MainInfoProps = {
  userSigned: RealtorProfile;
  isProfile: boolean;
  lastExp?: LastExp;
  isRealtor: boolean;
  pdfPage: boolean;
}

const MainInfo = ({ userSigned , isProfile, lastExp, isRealtor, pdfPage}: MainInfoProps) => {
  
  const { setData } = useContext(PictureModalContext) as PictureModalContextType

  const { user, setUser } = useContext(UserContext) as UserContextType

  const { setOpen: mainInfoSetOpen } = useContext(MainInfoProfileEditModalContext) as ModalOpenContextType

  const [sessionProfile, setSessionProfile] = useState(false)

  const router = useRouter()

  const [tooltip,setTooltip] = useState({show: false, posX: 0, posY: 0})

  const locale = router.locale

  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    const localId = localStorage.getItem('id')
    const accounType = localStorage.getItem('accountType')
    if(Number(localId) === userSigned?.id && accounType === 'realtor'){
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

  function printCities(){
    const cities = userSigned.RealtorCities.map(city=>city.City.name)
    if(cities.length>3) return ` ${cities[0]}, ${cities[1]}`
    if(cities.length===3) return ` ${cities[0]}, ${cities[1]} e ${cities[2]}`
    if(cities.length===2) return ` ${cities[0]} e ${cities[1]}`
    if(cities.length===1) return ` ${cities[0]}`
    return 'Ainda não adicionou cidades'
  }

  function tooltipShow(e : React.MouseEvent<HTMLButtonElement>){
    setTooltip({show: true, posX: e.clientX, posY: e.clientY,})
  }

  function tooltipStill(){
    setTooltip({...tooltip, show: true})
  }

  function tooltipHide(){
    setTooltip({...tooltip, show: false})
  }

  return (

  <Container isProfile={isProfile}>
     {/* <button data-tippy-content="Tooltip">Text</button> */}
    <div className="main-info border">
      <div className='top'>
        {isProfile && (
          <>
            <Image height={1000} width={1000} src={userSigned?.coverPicture ? userSigned.coverPicture : greyImage} alt='cover image' className='cover-photo'/>
            {sessionProfile && !pdfPage && (
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
      { isProfile && sessionProfile && !pdfPage ? (
          <Image onClick={() => mainInfoSetOpen(true)} className='edit-main' src={editIcon} alt='edit icon'/>
      ): ''}

      <div className="sub-content">
        <div className="about">
          { userSigned?.firstName && (
            <h1>{userSigned?.firstName} {userSigned?.lastName} </h1>
          )}

          {userSigned?.name && (
            <h1>{userSigned.name}</h1>
          )}
          {(userSigned?.rating > 0) && (
            <h3>{'★'.repeat(Math.floor(userSigned?.rating))} ({Math.floor(userSigned?.rating)})</h3>
          )}
        </div>
        <div className="about-2">
        {userSigned?.RealtorCities && (
          <p>
            <ToolTipContainer onMouseOver={()=>tooltipStill()} onMouseLeave={()=>tooltipHide()} show={tooltip.show} posX={tooltip.posX} posY={tooltip.posY}>
              <b>Cidades que atua:</b>
              <ul className="cities-list">
              {userSigned.RealtorCities.map((city) => (
              <li key={city.City.id}>- {city.City.name}</li>
              ))}</ul>
            </ToolTipContainer>
            <div className="tt"></div>
            <b>
              {t.mainInfo.workArea}
            </b>
              {printCities()}{userSigned.RealtorCities.length>3?
                <span> e outras <b onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>)=>tooltipShow(e)} onMouseLeave={()=>tooltipHide()}>{userSigned.RealtorCities.length-2}</b> cidades</span>:""}
          </p>
          
        )}
          <p>
            <b>
              {t.mainInfo.experience}
            </b> {userSigned?.expTime} Anos
          </p>

          <p>
            <b>
            {t.mainInfo.languages}
            </b> 
            {userSigned?.RealtorLanguages?.map((language, index) => (
              ` ${language.Language.name} ${index < userSigned.RealtorLanguages.length -1 ? ',': ''} `
              ))}
          </p>
          <p>{userSigned?.email}</p>
          <p>{userSigned?.phone}</p>
          {/* <div className="bottom">
            <div className="bottom-1">
            <p>
            <b>{t.mainInfo.clientsHelped}</b>
            3
            </p>
            <p>
            <b>{t.mainInfo.salesResult}</b>
            2
            </p>
            </div>
            <div className="bottom-2">  
            </div>
            </div> */}
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

      {isRealtor && (
        <div className="current-agency border">
          {lastExp?.name}
          <Image width={10} height={10} className="agency" src={lastExp?.pic ? lastExp.pic : agencyIcon} alt='agency icon'/>
        </div>
      ) }
      
    </div>
  </Container>

  );
};

export default MainInfo;