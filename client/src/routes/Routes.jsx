import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '../pages/Home'

export const routes = createBrowserRouter([{
    path : '/',
    element: <Layout/>,
    children:[
        {
            index:true,
            element: <Home/>
        },
        {
            
        }


    ]
}])
