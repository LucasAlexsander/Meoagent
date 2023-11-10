import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import profileIcon from '@/../public/profile.svg'
import styled from 'styled-components';
import PictureModalContext from 'context/PictureModalContext';
import { PictureModalContextType } from '@/types/PictureModalContextType';
import editIcon from '../public/edit.svg'
import mailIcon from '../public/mail.svg'
import greyImage from '../public/grey.png'
import UserContext from 'context/UserContext';
import { UserContextType } from '@/types/UserContextType';
import { ModalOpenContextType } from '@/types/ModalOpenContextType';
import Link from 'next/link';
import { ApiService } from '@/services/ApiService';
import { useRouter } from 'next/router';
import { ClientProfile } from '@/types/ClientProfile';
import LoadingContext from 'context/LoadingContext';
import locales from 'locales';

type ContainerProps = {
  isProfile: boolean
}

const Container = styled.div<ContainerProps>`
  position: relative;

  min-height: ${props => props.isProfile ? '40rem' : '20rem'};
  @media only screen and (max-width: 900px){
    min-height: ${porps => porps.isProfile ? '60rem': '40rem'};
    height: auto;

  }
  .main-info{
    display: flex;
    align-items: center;
    background-color: var(--surface);
    padding: 3rem;
    border-radius: 3rem;
    height: auto;
    gap: 5rem;
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

      .form{
        display: flex;
        flex-direction: column;
        gap: 10px;
        @media only screen and (max-width: 900px){
          justify-content: center;
         align-items: center;
        } 
        li{
          display: flex;
          gap:10px;
        }
        p{
          width: auto;
        }
        input{
          height: 18px;
          font-size: 18px;
          width:250px;
          padding: 0;
          border-radius: 5px;
          padding-left: 10px;
        }
        button{
          width: 100px;
          height: 25px;
          padding: 5px;
          margin-top: 10px;
        }
      }

      @media (width < 768px) {
      label, p, h3 {
        font-size: 16px;  
      }

      .form {
        li {
          width: 100%;
          height: 25px;
          align-items: center;
          justify-content: space-between;
          gap: 10px;

          &:has(p) {
            justify-content: start;
          }
          input {
            height: 100%;
            padding: .5rem 10px;
            width: 200px;
          }
        }
      }
    }
    }
    
    .contact{
      .icon{
        height: 2rem;
        width: 2rem;
        cursor: pointer;
        opacity: 0.7;
        transition: all .5s;
        :hover{
          opacity: 1;
        }
      }
    }
  }
`

type MainInfoClientProps = {
  userSigned: ClientProfile
  isProfile: boolean
}

const MainInfoClient = ({ userSigned , isProfile}: MainInfoClientProps) => {

  const { user, setUser } = useContext(UserContext) as UserContextType

  const [editing, setEditing] = useState(false)

  const [firstName, setFirstName] = useState(userSigned?.firstName)

  const [lastName, setLastName] = useState(userSigned?.lastName)

  const [phone, setPhone] = useState(userSigned?.phone)

  const [address, setAddress] = useState(userSigned?.address)

  const [city, setCity] = useState(userSigned?.city)

  const [country, setCountry] = useState(userSigned?.country)

  const [zipCode, setZipCode] = useState(userSigned?.zipCode)

  const {setOpen: setLoadingOpen} = useContext(LoadingContext) as ModalOpenContextType
  const [sessionProfile, setSessionProfile] = useState(false)

  const router = useRouter()

  const locale = router.locale
  
  const t = locales[locale as keyof typeof locales]

  useEffect(() => {
    const localId = localStorage.getItem('id')
    const accounType = localStorage.getItem('accountType')
    if(Number(localId) === userSigned?.id && accounType === 'client'){
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

  async function sendInfo(e: any){
    e.preventDefault() 
    const token = localStorage.getItem('token')
    setLoadingOpen(true)
    await fetch(process.env.NEXT_PUBLIC_API_URL + '/client', {
        method:'PUT',
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          address,
          city,
          country,
          zipCode,
        }),
        headers:{
          authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
    })
    setLoadingOpen(false)
    router.reload()
  }

  function startEditing(e: any){
    e.preventDefault() 
    setEditing(!editing)
  }

  return (

  <Container isProfile={isProfile}>
    <div className="main-info border">
      <Image width={100} height={100} className= {isProfile ? "profile profile-pointer" : 'profile' } src={profileIcon} alt='profile icon'/>
      <div className="sub-content">
        <form className="form">
          <li>
            <label><h3>{t.signIn.email}:</h3> </label>
            <h3>{userSigned?.email}</h3>
            <div className="contact">
              {userSigned?.email ? (
                <Link href={'mailto: ' + userSigned.email} target='_blank'>
                  <Image className='icon' src={mailIcon} alt='mail icon'/>
                </Link>
              ) : '' }
            </div>
          </li>
          <li>
            <label>{t.mainInfoEditModal.name}: </label>
            {editing?
              <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
              :<p>{firstName}</p>
            }
          </li>
          <li>
            <label>{t.mainInfoEditModal.lastName}: </label>
            {editing?
              <input type="text" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
              :<p>{lastName}</p>
            }
          </li>
          <li>
            <label>{t.mainInfoEditModal.phone}: </label>
            {editing?
              <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
              :<p>{phone}</p> 
            }
          </li>
          <li>
            <label>{t.clientProfile.adress}: </label>
            {editing?
              <input type="text" value={address} onChange={(e)=>setAddress(e.target.value)}/>
              :<p>{address}</p> 
            }
          </li>
          <li>
            <label>{t.clientProfile.city}: </label>
            {editing?
              <input type="text" value={city} onChange={(e)=>setCity(e.target.value)}/>
              :<p>{city}</p> 
            }
          </li>
          <li>
            <label>{t.clientProfile.country}: </label>
            {editing?
              <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)}/>
              :<p>{country}</p> 
            }
          </li>
          <li>
            <label>{t.clientProfile.zipCode}: </label>
            {editing?
              <input type="text" value={zipCode} onChange={(e)=>setZipCode(e.target.value)}/>
              :<p>{zipCode}</p> 
            }
          </li>

        {editing?
        <button className='button' onClick={(e)=>sendInfo(e)}>{t.mainInfoEditModal.save}</button>
        :<button className='button' onClick={(e)=>startEditing(e)}>{t.aboutEditModal.edit}</button>
        }
        </form>
        
        
      </div>

      
    </div>
  </Container>

  );
};

export default MainInfoClient;