import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import realtorIcon from "../public/realtor.svg";
import agencyIcon from "../public/agency.svg";
import clientIcon from "../public/profile.svg";
import locales from "locales";
import { useRouter } from "next/router";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  text-align: center;
  gap: 1.5rem;
  animation: apear 2s forwards;
  z-index: 2;

  a {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem;
    transition: all 0.5s;
    :hover {
      background-color: var(--base);
    }
    img {
      height: 2rem;
      width: auto;
    }
  }
`;

type LoginMoldalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const LoginMoldal = ({ open, setOpen }: LoginMoldalProps) => {
  const router = useRouter();

  const { locale } = router;

  const handleClick = () => {
    setOpen(false);
  };

  const t = locales[locale as keyof typeof locales];

  return open ? (
    <Container onMouseEnter={() => setOpen(true)}>
      <Link href={"/sign-in/client"}>
        <p onClick={handleClick}>{t.loginModal.client}</p>
        <Image src={clientIcon} alt="realtor icon" />
      </Link>
      <Link href={"/sign-in/realtor"}>
        <p onClick={handleClick}>{t.loginModal.realtor}</p>
        <Image src={realtorIcon} alt="realtor icon" />
      </Link>
      <Link href={"/sign-in/agency"}>
        <p onClick={handleClick}>{t.loginModal.agency}</p>
        <Image src={agencyIcon} alt="realtor icon" />
      </Link>
    </Container>
  ) : (
    <></>
  );
};

export default LoginMoldal;
