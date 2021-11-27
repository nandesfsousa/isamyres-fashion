import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {BrowserRouter} from 'react-router-dom';

import NavBar from '../components/NavBar/NavBar';

const Home: NextPage = () => {
  return (
    <div>
      <NavBar/>
    </div>
  )
}

export default Home
