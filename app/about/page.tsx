'use client';

import React from 'react'
import AppFooter from '@/app/components/common/Footer/footer';
import Header from '@/app/components/common/Header/header';
import AboutDryva from '@/app/components/About/aboutdryva';
import WhoWeAre from '@/app/components/About/whoweare';
import OurMission from '@/app/components/About/ourmission';
import OurGoal from '@/app/components/About/ourgoal';
import OurValue from '@/app/components/About/ourvalue';
import OurTeam from '@/app/components/About/ourteam';

export default function About() {

  return (
    <>
          <Header />
    <AboutDryva />
    <WhoWeAre />
    <OurMission />
    <OurGoal />
    <OurValue />
    <OurTeam />
    <AppFooter />
  </>
  )
}