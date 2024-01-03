import React, { useEffect } from 'react'
import MainLayout from '../../layouts/MainLayout/index.jsx'
import { useDispatch } from 'react-redux'
import { setBreadcrumb, setTitlePage } from '../../states/modules/app/index.js'

function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTitlePage(''))
        dispatch(setBreadcrumb([]))
    })

    return (
        <MainLayout>
            Home page
        </MainLayout>
    )
}

export default Home
