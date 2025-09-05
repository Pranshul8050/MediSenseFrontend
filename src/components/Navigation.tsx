import React, { useContext, useState } from 'react';
import { 
  Home, 
  Scan, 
  Mic, 
  Activity, 
  AlertTriangle, 
  Bell, 
  HelpCircle, 
  Shield, 
  Phone,
  Menu,
  X,
  Globe,
  ChevronDown
} from 'lucide-react';
import LanguageContext from '../context/LanguageContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { language, setLanguage, translations } = useContext(LanguageContext);

  const t = translations[language];

  const navigationItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'scanner', label: t.nav.scanner, icon: Scan },
    { id: 'voice', label: t.nav.voice, icon: Mic },
    { id: 'tracking', label: t.nav.tracking, icon: Activity },
    { id: 'interactions', label: t.nav.interactions, icon: AlertTriangle },
    { id: 'reminders', label: t.nav.reminders, icon: Bell },
    { id: 'faqs', label: t.nav.faqs, icon: HelpCircle },
    { id: 'safety', label: t.nav.safety, icon: Shield },
    { id: 'emergency', label: t.nav.emergency, icon: Phone },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsLanguageOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">MediSense</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(0, 7).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center space-x-1 ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700 shadow-md'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Language Selector & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xl">{languages.find(l => l.code === language)?.flag}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-4 py-2 text-left flex items-center space-x-3 transition-colors duration-200 ${
                        language === lang.code
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => onNavigate('scanner')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              {t.nav.getStarted}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 flex flex-col items-center space-y-1 ${
                      currentPage === item.id
                        ? 'bg-blue-100 text-blue-700 shadow-md'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      language === lang.code
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => {
                  onNavigate('scanner');
                  setIsMenuOpen(false);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                {t.nav.getStarted}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;