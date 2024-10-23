import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import CreateReview from '../pages/CreateReview'
import Launch from '../pages/Launch'
import Login from '../pages/Login'
import News from '../pages/News'
import PageUnderConstruction from '../pages/PageUnderConstruction'
import NewsDetails from '../pages/NewsDetails'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Reviews from '../pages/Reviews'
import Videos from '../pages/Videos'

export const routes = createBrowserRouter([{
    path : '/',
    element: <Layout/>,
    children:[
        {
            index:true,
            element: <Home/>
        },
        {
            path: 'createreview',
            element: <CreateReview/>
        },
        {
            path: 'launch',
            element: <Launch/>
        },
        {
            path: 'login',
            element: <Login/>
        },
        {
            path: 'news',
            element: <News/>
        },
        {
            path: 'newsdetails/:id',
            element: <NewsDetails/>
        },
        {
            path: 'pageunderconstruction',
            element: <PageUnderConstruction/>
        },
        {
            path: 'profile',
            element: <Profile/>
        },
        {
            path: 'register',
            element: <Register/>
        },
        {
            path: 'reviews',
            element: <Reviews/>
        },
        {
            path: 'videos',
            element: <Videos/>
        }

    ]
}])
