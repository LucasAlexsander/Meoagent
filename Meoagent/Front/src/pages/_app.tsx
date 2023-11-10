import '@/styles/globals.css'
import Layout from 'components/Layout'
import type { AppProps } from 'next/app'
import ModalWrapper from 'components/ModalWrapper'

export default function App({ Component, pageProps }: AppProps) {

  return (
    <ModalWrapper>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ModalWrapper>

    ) 
}
