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

const Nav = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  padding: 3rem 6rem;
  position: relative;
  @media only screen and (max-width: 500px) {
    padding: 47px 47px 10px 47px;
  }
  /* .logo-area {
      height: 100%;
      display: flex;
      place-items: center;
    } */

  .logo {
    height: 60px;

    @media only screen and (max-width: 420px) {
      height: 35px;
    }
    @media only screen and (max-width: 390px) {
      /* height: 30px; */
    }
  }
  .right-side {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;

    @media only screen and (max-width: 909px) {
      gap: 1rem;
      flex-direction: column;
      align-items: start;
    }

    @media (max-width: 768px) {
      display: none;
    }

    .contact {
      position: relative;

      p {
        padding: 8px 12px;
        border: solid 0.1rem var(--border-color);
        background: var(--surface);
        border-radius: 1rem;
        z-index: 10;
      }
      &:hover p {
        border-radius: 1rem 1rem 0 0;
        border-bottom: 0;
      }
      &:hover p ~ span {
        visibility: visible;
        animation: fadeContact 0.5s ease forwards;
      }

      @keyframes fadeContact {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      span {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        left: 0%;
        bottom: -33px;
        background: var(--surface);
        padding: 8px 12px;
        border: solid 0.1rem var(--border-color);
        border-radius: 0 1rem 1rem;
        transform: translateY(-25px);
      }
    }

    .privacy-polices {
      padding: 8px 12px;
      border: solid 0.1rem var(--border-color);
      background: var(--surface);
      border-radius: 1rem;
      z-index: 10;
    }
  }
  .left-side {
    right: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    min-width: 100px;

    &:has(.profile) {
      align-items: center;
    }
    &:has(.profile) ~ .card {
      /* transform: translateY(calc(-100% + 30px)); */
      animation: fadeInProfile 0.4s;

      @media (max-width: 501px) {
        top: 100%;
      }
    }

    @keyframes fadeInProfile {
      from {
        transform: translateY(-125px);
        opacity: 0;
      }
      to {
        transform: translateY(initial);
        opacity: 1;
      }
    }
  }
  @media only screen and (max-width: 850px) {
    justify-content: space-between;

    .left-side {
      position: initial;
    }
  }
  .card {
    /* top: calc(100% + 20px); */
  }
  .locale {
    width: 5rem;
    height: 5rem;
    background-color: transparent;
    border: none;
    padding: 0.2rem;
    font-size: 1.3rem;
    option {
      background-color: transparent;
      padding: 1rem;
    }
  }
  a {
    text-decoration: none;
  }
  p,
  a {
    font-size: 1.8rem;
    cursor: pointer;
  }
  .login {
    position: relative;
    width: 125px;
    height: 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    transition: all 0.5s;
    background-color: var(--surface);
    border: solid 0.1rem var(--border-color);
    text-align: center;
    border-radius: 1rem;
    transition: all 0.5s, border-radius 0s;
    z-index: 2;

    &:has(div) {
      border-radius: 1rem 1rem 0 0;

      /* & > p {
          position: relative;
          display: flex;
          align-content: center;

          &:last-child::after {
            display: none;
          }

          &::after {
            content: '';
            position: absolute;
            width: 80%;
            height: 1px;
            background: rgba(0,0,0,.4);
            top: calc(100% + 4px);
          }
        } */
    }

    p {
      width: 100%;
      position: relative;
      display: flex;
      align-items: end;
      justify-content: center;
      z-index: 4;
      background-color: inherit;
      border-radius: 1rem;
      transition: border-radius 0s;

      &:hover {
        border-radius: 1rem 1rem 0 0;
        transition: border-radius 0.4s;
      }
    }

    div {
      position: absolute;
      background: inherit;
      width: calc(100% + 2px);
      border-radius: 0 0 1rem 1rem;
      top: 100%;
      left: -1px;
      border: solid 0.8px var(--border-color);
      border-top-color: transparent;
      animation: fadeIn 0.3s;
      z-index: 1;

      a {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: end;
        &:last-child::after {
          display: none;
        }

        &::after {
          content: "";
          position: absolute;
          width: 80%;
          height: 1px;
          background: rgba(0, 0, 0, 0.4);
          top: 100%;
        }
      }

      a p {
        font-size: 1.8rem;
      }
    }

    @keyframes fadeIn {
      from {
        transform: translateY(-30px);
        opacity: 1;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @media only screen and (max-width: 500px) {
      position: relative;
      width: 100px;
      /* height: 24px; */
      top: 0;
      right: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s, border-radius 0s;

      &:has(div) {
        border-radius: 1rem 1rem 0 0;
        div {
          position: absolute;
          background: #e8e8e8;
          top: 100%;
          border-radius: 0 0 1rem 1rem;
          animation: apear 0.5s forwards;

          a {
            display: flex;
            position: relative;
            justify-content: center;
            align-items: end;
            img {
              display: none;
            }
          }
        }
      }

      p {
        padding: 4px 0;
        font-size: 1.7rem;
      }
    }
    @media only screen and (max-width: 420px) {
      /* width: 75px; */
      font-size: 1.65rem;
    }
    @media only screen and (max-width: 390px) {
      width: 100px;
      font-size: 1.6rem;
    }
  }
  .selection {
    /* position: absolute; */
    display: flex;
    align-items: center;
    right: 25rem;
    gap: 1rem;
    background-color: var(--surface);
    border-radius: 1rem;
    padding: 1rem;
    height: 35px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .profile {
    cursor: pointer;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const Navbar = () => {
  const { user } = useContext(UserContext) as UserContextType;

  // const [open, setOpen] = useState(false)
  const [open, setOpen] = useState(false);

  const [flag, setFlag] = useState("GB");

  const [defaultLocale, setDefaultLocale] = useState("");

  const [openProfile, setOpenProfile] = useState(false);

  const [pic, setPic] = useState("");

  const router = useRouter();

  const { locale } = router;

  const t = locales[locale as keyof typeof locales];

  const { id } = router.query;

  const pdfPage = router.query.pdf ? true : false;
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
    <Nav>
      <div className="right-side">
        <div className="contact">
          <p>{t.navFooter.contact}</p>
          <span>xxxxx@meoagent.com</span>
        </div>
        <Link className="privacy-polices" href="/">
          {t.navFooter.policies}
        </Link>
      </div>
      <Link href="/" className="logo-area">
        <img
          className="logo"
          src="/logo/logo meo agent 1.png"
          alt="Meoagent-logo"
        />
      </Link>
      {pdfPage || (
        <>
          <div className="left-side">
            <div className="locale-area selection border">
              <Image
                alt="United States"
                src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flag}.svg`}
                width={20}
                height={20}
              />
              <select
                id="locale-set"
                onChange={(e) => changeLocation(e)}
                className="locale"
              >
                <option value="en">EN</option>
                <option value="pt">PT</option>
                <option value="es">ES</option>
              </select>
            </div>
            {user.token ? (
              <Image
                onClick={() => setOpenProfile(!openProfile)}
                className="profile"
                src={pic ? pic : profileIcon}
                alt={"Profile"}
                width={60}
                height={60}
              />
            ) : (
              <div
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className={open ? "login" : "login closed"}
              >
                <p>LOGIN</p>
                <LoginMoldal open={open} setOpen={setOpen} />
              </div>
            )}
          </div>

          <ProfileMoldal open={openProfile} setOpen={setOpenProfile} />
        </>
      )}
    </Nav>
  );
};

export default Navbar;
