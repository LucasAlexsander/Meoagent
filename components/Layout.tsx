import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from './Navbar';
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  main{
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    
    @media (max-width: 768px) {
      height: auto;
      justify-content: start;
      padding-top: 20px;
    }
  }
`

export default function Layout({ children } : LayoutProps) {

    const [path, setPath] = useState('')
    const router = useRouter()

    useEffect(() => {
      setPath(router.pathname)
    }, [router])

      return (
        <Container className={path === '/' ? 'home' : ''}>
          <Head>
              <title>Meoagent</title>
              <meta name="description" content="Generated by create next app" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/meoagent-favicon.png" />
          </Head>

          <Navbar />
          <main>{children}</main>
          <Footer />
        </Container>
        
    )
}