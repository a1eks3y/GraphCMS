import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Layout, Loader } from '../components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function MyApp( { Component, pageProps }: AppProps ) {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleStart = ( url: string ) => (url !== router.asPath) && setLoading(true)
        const handleComplete = ( url: string ) => (url === router.asPath) && setLoading(false)

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })
    if ( loading )
        return <Loader/>
    return (
        <Layout>
            <Component { ...pageProps } />
        </Layout>
    )
}

export default MyApp
