import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CertificateModal } from './components/CertificateModal';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { GasConfigModal } from './components/GasConfigModal';
import { SheetLedgerModal } from './components/SheetLedgerModal';
import { Project, Certificate } from './data/portfolioData';
import { 
  initAuth, 
  subscribeToAuth, 
  getAccessToken 
} from './services/auth';
import { 
  findOrCreatePortfolioSheet, 
  getStoredSpreadsheetId, 
  SheetInfo 
} from './services/googleSheets';
import { User as FirebaseUser } from 'firebase/auth';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isGasConfigOpen, setIsGasConfigOpen] = useState<boolean>(false);
  const [isSheetLedgerOpen, setIsSheetLedgerOpen] = useState<boolean>(false);

  // Google Account & Google Sheets State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [sheetInfo, setSheetInfo] = useState<SheetInfo | null>(null);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = subscribeToAuth(async (user, token) => {
      setCurrentUser(user);
      setAccessToken(token);

      if (token && user) {
        try {
          const sheet = await findOrCreatePortfolioSheet(token);
          setSheetInfo(sheet);
        } catch (e) {
          console.warn('Could not auto-fetch sheet info:', e);
        }
      } else {
        // Check if there is an existing stored spreadsheet ID for reference
        const storedId = getStoredSpreadsheetId();
        if (storedId) {
          setSheetInfo({
            spreadsheetId: storedId,
            spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${storedId}/edit`,
            title: 'Deepak Portfolio Contact Inquiries',
            rowCount: 0
          });
        }
      }
    });

    initAuth();

    return () => unsubscribe();
  }, []);

  const handleSheetConnected = (sheet: SheetInfo, token: string, user: FirebaseUser) => {
    setSheetInfo(sheet);
    setAccessToken(token);
    setCurrentUser(user);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Certifications onSelectCertificate={(cert) => setSelectedCertificate(cert)} />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Contact 
          onOpenGasConfig={() => setIsGasConfigOpen(true)}
          currentUser={currentUser}
          accessToken={accessToken}
          sheetInfo={sheetInfo}
          onSheetConnected={handleSheetConnected}
          onOpenSheetLedger={() => setIsSheetLedgerOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <GasConfigModal
        isOpen={isGasConfigOpen}
        onClose={() => setIsGasConfigOpen(false)}
      />

      <SheetLedgerModal
        isOpen={isSheetLedgerOpen}
        onClose={() => setIsSheetLedgerOpen(false)}
        sheetInfo={sheetInfo}
        accessToken={accessToken}
        user={currentUser}
        onRefreshSheet={() => {
          if (accessToken) {
            findOrCreatePortfolioSheet(accessToken).then(setSheetInfo);
          }
        }}
      />
    </div>
  );
}
