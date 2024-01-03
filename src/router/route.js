import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import { rootLoader } from './rootLoader.js'
import Login from '../pages/Auth/Login'

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>,
        loader: ({ request, params }) => rootLoader(
            { request, params }, false, 'LOAD_AUTH_PAGE'
        )
    },
    {
        path: '',
        element: <Home/>,
        loader: ({ request, params }) => rootLoader(
            { request, params }, true
        )
    }
])

export default router
