import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import LoginMoldal from "./LoginMoldal";
import UserContext from "context/UserContext";
import ProfileMoldal from "./ProfileMoldal";
import { UserContextType } from "@/types/UserContextType";
import profileIcon from "../public/profile.svg";
import { useRouter } from "next/router";
import locales from "../locales";

const FooterStyle = styled.div`
  width: 100%;
  height: auto;
  display: none;
  align-items: start;
  justify-content: center;
  gap: 3rem;
  padding: 25px 6rem 30px 6rem;
  position: relative;
  @media only screen and (max-width: 768px) {
    display: flex;
  }

  @media only screen and (max-width: 525px) {
    flex-direction: column;
    align-items: center;
  }

  .selection {
    /* position: absolute; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 80px;
    right: 25rem;
    gap: 1rem;
    background-color: #fff;
    border-radius: 1rem;
    padding: 1rem;
    height: 5rem;
    transform: translateY(-5px);
  }
  .locale {
    position: relative;
    width: 40px;
    height: 100%;
    background-color: #fff;
    border: none;
    padding: 0.2rem;
    font-size: 1.3rem;
    border-radius: 0;

    option {
      background-color: transparent;
      padding: 1rem;
      width: 100%;
      border-radius: 0;
    }
  }

  .right-side {
    display: flex;
    align-items: start;
    justify-content: center;
    gap: 3rem;

    @media only screen and (max-width: 420px) {
      flex-direction: column;
      align-items: start;
    }

    .contact {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      p {
        font-size: 1.8rem;
        font-weight: bold;
        text-decoration: underline;
      }

      span {
        font-size: 1.8rem;
        font-weight: 600;
      }
    }

    .privacy-polices {
      font-size: 1.8rem;
      font-weight: bold;
      text-decoration: underline;
      display: flex;
      align-items: center;
      gap: 5px;
      flex-shrink: 0;
    }
  }
`;

const Footer = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const [flag, setFlag] = useState("GB");

  const [defaultLocale, setDefaultLocale] = useState("");

  const [pic, setPic] = useState("");

  const router = useRouter();

  const { locale } = router;

  const t = locales[locale as keyof typeof locales];

  const { id } = router.query;

  useEffect(() => {
    let locale = localStorage.getItem("locale");
    if (!locale) locale = router.locale as string;
    const localeSet = document.getElementById(
      "locale-set"
    ) as HTMLSelectElement;
    localeSet.value = locale;
    setDefaultLocale(locale);
    if (locale === "en") {
      setFlag("GB");
    } else {
      setFlag(locale.toUpperCase());
    }
    if (id && typeof id === "string") {
      const finalPath = router.asPath.replace("[id]", id);
      router.push(finalPath, finalPath, { locale });
    } else {
      router.push(router.asPath, router.asPath, { locale });
    }
  }, []);

  const changeLocation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value as string;
    localStorage.setItem("locale", locale);
    router.push(router.asPath, router.asPath, { locale });
    setDefaultLocale(locale);
    if (locale === "en") {
      setFlag("GB");
    } else {
      setFlag(locale.toUpperCase());
    }
  };

  useEffect(() => {
    console.log(defaultLocale);
  }, [defaultLocale]);

  useEffect(() => {
    const profilePicture = localStorage.getItem("pic");
    if (profilePicture === "undefined") return;
    if (user.profilePicture) setPic(user.profilePicture);
    else if (profilePicture && profilePicture !== "null")
      setPic(profilePicture);
  }, [user]);

  return (
    <FooterStyle>
      <div className="selection border">
        <Image
          alt="United States"
          src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flag}.svg`}
          width={20}
          height={20}
        />
        <select
          id="locale-set"
          name="language"
          onChange={(e) => changeLocation(e)}
          className="locale"
        >
          <option value="en">EN</option>
          <option value="pt">PT</option>
          <option value="es">ES</option>
        </select>
      </div>
      <div className="right-side">
        <div className="contact">
          <p>{t.navFooter.contact}</p>
          <span>xxxxx@meoagent.com</span>
        </div>
        <Link className="privacy-polices" href="/">
          {t.navFooter.policies}
          <span>
            <img src="/arrow link.svg" alt="Arrow Icon" />
          </span>
        </Link>
      </div>
    </FooterStyle>
  );
};

export default Footer;
