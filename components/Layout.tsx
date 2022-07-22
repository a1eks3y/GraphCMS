import * as React from 'react'
import { Header } from './index'

const Layout: React.FC<{ children: JSX.Element }> = ( { children } ) => {
    return (
        <>
            <Header/>
            { children }
        </>
    )
}

export default Layout