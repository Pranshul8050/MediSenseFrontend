import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MedicineScanner from './pages/MedicineScanner';
import VoiceAssistant from './pages/VoiceAssistant';
import HealthTracking from './pages/HealthTracking';
import DrugInteractions from './pages/DrugInteractions';
import Reminders from './pages/Reminders';
import FAQs from './pages/FAQs';
import Safety from './pages/Safety';
import EmergencyServices from './pages/EmergencyServices';
import LanguageContext from './context/LanguageContext';
import { translations } from './utils/translations';


function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('en');

  // --- mock medications (replace later with Firestore) ---
  const [medications, setMedications] = useState([
    {
      id: 1,
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Twice daily',
      lastTaken: new Date(Date.now() - 2 * 60 * 60 * 1000),
      nextDue: new Date(Date.now() + 4 * 60 * 60 * 1000),
      active: true
    },
    {
      id: 2,
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      lastTaken: new Date(Date.now() - 8 * 60 * 60 * 1000),
      nextDue: new Date(Date.now() + 16 * 60 * 60 * 1000),
      active: true
    }
  ]);

  // --- mock symptoms (replace later with Firestore) ---
  const [symptoms, setSymptoms] = useState([
    {
      id: 1,
      description: 'Mild headache',
      severity: 'Low',
      date: new Date(),
      time: '10:30 AM'
    },
    {
      id: 2,
      description: 'Slight nausea',
      severity: 'Low',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      time: '2:15 PM'
    }
  ]);

  // --- page switcher ---
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'scanner':
        return <MedicineScanner />;
      case 'voice':
        return <VoiceAssistant />;
      case 'tracking':
        return (
          <HealthTracking
            medications={medications}
            setMedications={setMedications}
            symptoms={symptoms}
            setSymptoms={setSymptoms}
          />
        );
      case 'interactions':
        return <DrugInteractions medications={medications} />;
      case 'reminders':
        return (
          <Reminders
            medications={medications}
            setMedications={setMedications}
          />
        );
      case 'faqs':
        return <FAQs />;
      case 'safety':
        return <Safety />;
      case 'emergency':
        return <EmergencyServices />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      <div className="min-h-screen bg-gray-50">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="transition-all duration-300 ease-in-out">
          {renderPage()}
        </main>
      </div>
    </LanguageContext.Provider>
  );
} 

export default App;
