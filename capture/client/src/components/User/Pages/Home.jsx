import React from 'react'

import HeroSection from '../../Atoms/HeroSection'
import Owner from '../../Atoms/Owner'
import Photography from '../../Atoms/Photography'
import Videography from '../../Atoms/Videography'
import Comments from '../../Atoms/Comments'
import Footer from '../../Atoms/Footer'
import { LoaderContext } from '../../../LoaderContext'

function Home() {
  return (
    <div>
      <HeroSection />
      <div style={{padding: "0vw 5vw"}}>
        <Owner />
        <Photography />
        <Videography />
        <Comments />
      </div>
      <Footer />
    </div>
  )
}

export default Home