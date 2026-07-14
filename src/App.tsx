/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Simulation from './pages/Simulation';
import Universities from './pages/Universities';
import Government from './pages/Government';
import Library from './pages/Library';
import Community from './pages/Community';
import EdTechHub from './pages/EdTechHub';
import SpecificEducation from './pages/SpecificEducation';
import { AccessibilityProvider } from './contexts/AccessibilityContext';

export default function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/government" element={<Government />} />
            <Route path="/library" element={<Library />} />
            <Route path="/community" element={<Community />} />
            <Route path="/edtech" element={<EdTechHub />} />
            <Route path="/specific-education" element={<SpecificEducation />} />
          </Routes>
        </Layout>
      </Router>
    </AccessibilityProvider>
  );
}
