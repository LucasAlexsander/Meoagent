import Link from "next/link";
import Image from "next/image";
import styled from 'styled-components';
import { useContext, useEffect, useState } from "react";
import LoginMoldal from "./LoginMoldal";
import UserContext from "context/UserContext";
import ProfileMoldal from "./ProfileMoldal";
import { UserContextType } from "@/types/UserContextType";
import profileIcon from '../public/profile.svg'
import { useRouter } from "next/router";

const FooterStyle = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 0 30px 0;
    position: relative;
    @media only screen and (max-width: 500px){
      padding: 45px;

    }
    .selection{
      /* position: absolute; */
      display: none;
      align-items: center;
      justify-content: space-between;
      min-width: 80px;
      right: 25rem;
      gap: 1rem;
      background-color: #fff;
      border-radius: 1rem;
      padding: 1rem;
      height: 5rem;
      @media (width < 768px) {
        display: flex;
      }
    }
    .locale{
      width: 5rem;
      height: 5rem;
      background-color: transparent;
      border: none;
      padding: 0.2rem;
      font-size: 1.3rem;
      border-radius: 0;

      option{
        background-color: transparent;
        padding: 1rem;
        width: 100%;
        border-radius: 0;
      }
    }
`

const Footer = () => {

    const { user } = useContext(UserContext) as UserContextType

    const [flag, setFlag] = useState('GB')

    const [defaultLocale, setDefaultLocale] = useState('')

    const [pic, setPic] = useState('')

    const router = useRouter()

    const { id } = router.query

    useEffect(() => {
      let locale = localStorage.getItem('locale')
      if(!locale) locale = router.locale as string
      const localeSet = document.getElementById('locale-set') as HTMLSelectElement
      localeSet.value = locale
      setDefaultLocale(locale)
      if(locale === 'en'){
        setFlag('GB')
      }else{
        setFlag(locale.toUpperCase())
      }
      if(id && typeof id === 'string'){
        const finalPath = router.asPath.replace('[id]', id)
        router.push(finalPath, finalPath, { locale })
      }else{
        router.push(router.asPath, router.asPath, { locale })
      }

    }, [])

    const changeLocation = (e:React.ChangeEvent<HTMLSelectElement>) => {
      const locale = e.target.value as string
      localStorage.setItem('locale', locale)
      router.push(router.asPath, router.asPath, { locale })
      setDefaultLocale(locale)
      if(locale === 'en'){
        setFlag('GB')
      }else{
        setFlag(locale.toUpperCase())
      }

    }

    useEffect(() => { console.log(defaultLocale)}, [defaultLocale])

    useEffect(() => {
      const profilePicture = localStorage.getItem('pic')
      if(profilePicture === "undefined") return
      if(user.profilePicture) setPic(user.profilePicture)
      else if(profilePicture && profilePicture !== 'null') setPic(profilePicture)
    }, [user])

    return (
        <FooterStyle>
            <div className="selection border">
                  <Image
                    alt="United States"
                    src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flag}.svg`}
                    width={20}
                    height={20}
                  />
                  <select id="locale-set" onChange={e => changeLocation(e)} className="locale">
                    <option value="en">EN</option>
                    <option value="pt">PT</option>
                    <option value="es">ES</option>
                  </select>
                </div>
        </FooterStyle>
    );
};

export default Footer;