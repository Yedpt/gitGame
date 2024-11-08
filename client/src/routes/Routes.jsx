import React from 'react'
import {createBrowserRouter} from 'react-router-dom'
import Layout from '../layout/Layout'
import Home from '../pages/Home'
import CreateReview from '../pages/CreateReview'
import Login from '../pages/Login'
import News from '../pages/News'
import PageUnderConstruction from '../pages/PageUnderConstruction'
import NewsDetails from '../pages/NewsDetails'
import Profile from '../pages/Profile'
import Register from '../pages/Register'
import Reviews from '../pages/Reviews'
import Videos from '../pages/Videos'
import CreateNew from '../pages/CreateNew'
import UpcomingReleases from '../components/UpcomingReleases'
import CreateVideo from '../pages/CreateVideo'
import ManageVideos from '../pages/ManageVideos'
import ManageUsers from '../pages/ManageUsers'
import ManageNews from '../pages/ManageNews'
import ManageReviews from '../pages/ManageReviews'
import CreateLaunch from '../pages/CreateLaunch'
import ManageLaunch from '../pages/ManageLaunch'

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
            path: 'managereviews',
            element: <ManageReviews/>
        },
        {
            path: 'login',
            element: <Login/>
        },
        {
            path: 'createnews',
            element: <CreateNew/>
        },
        {
            path: 'managenews',
            element: <ManageNews/>
        },
        {
            path: 'manageusers',
            element: <ManageUsers/>
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
        },
        {
            path: 'upcoming',
            element: <UpcomingReleases/>
        },
        {
            path: 'createvideos',
            element: <CreateVideo/>
        },
        {
            path: 'managevideos',
            element: <ManageVideos/>
        },
        {
           path: 'createlaunch',
           element: <CreateLaunch/>
        },
        {
            path: 'managelaunches',
            element: <ManageLaunch/>
        }


    ]
}])
