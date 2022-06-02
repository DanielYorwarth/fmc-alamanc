import React, { useState } from 'react';
import { ThemeProvider } from '@emotion/react'
import theme from './theme'
import { Global } from "@emotion/react";
import { GlobalStyles } from './App.styles.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Sidebar, Container } from './components';
import {
  Dashboard,
  Committees,
  Contact,
  Calendar,
  OfficersAndTheCourt,
  CorporateMembership
} from "./pages";
import { MobileHeader } from './components/mobile-header';
import MemberInfo from './pages/member-info';


const App = () => {

  const [isMenuActive, setIsMenuActive] = useState(false)

  return (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <Router>
        <Sidebar onMenuClick={() => setIsMenuActive(false)} onOutsideClick={() => setIsMenuActive(false)} left={!isMenuActive ? '-100%' : '0'} />
        <MobileHeader onClick={() => setIsMenuActive(!isMenuActive)} />
        <Container>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route exact path="/calendar" element={<Calendar />} />
            <Route exact path="/committees" element={<Committees />} />
            <Route exact path="/officers-and-the-court" element={<OfficersAndTheCourt />} />
            <Route exact path="/corporate-membership" element={<CorporateMembership />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/member" element={<MemberInfo />} />

          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
