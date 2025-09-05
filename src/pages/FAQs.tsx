import React, { useState, useContext } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, Book, Shield, Phone } from 'lucide-react';
import LanguageContext from '../context/LanguageContext';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
  tags: string[];
}

const FAQs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language];

  const categories = ['all', 'scanning', 'safety', 'interactions', 'dosages', 'side-effects', 'general'];

  const faqs: FAQ[] = [
    {
      id: 1,
      category: 'scanning',
      question: 'How accurate is the medicine scanning feature?',
      answer: 'Our AI-powered medicine scanner achieves 99.9% accuracy for identifying common medications using advanced computer vision trained on over 2 million pharmaceutical images. The system recognizes pills by shape, color, imprint codes, and packaging. Accuracy varies by image quality, lighting, and medication type. Generic medications may have lower recognition rates. Always verify results with healthcare providers, especially for critical medications or when confidence is below 95%.',
      tags: ['accuracy', 'scanning', 'AI', 'verification', 'computer vision']
    },
    {
      id: 2,
      category: 'scanning',
      question: 'What types of medications can be scanned?',
      answer: 'MediSense identifies: Tablets (scored, coated, chewable), capsules (hard/soft gelatin), liquid medications with clear labeling, topical creams/ointments in original packaging, inhalers, and injection pens. Our database covers 50,000+ medications from 200+ manufacturers globally. Best results with: good lighting, clear focus, visible imprint codes, and original packaging. Cannot scan: loose powders, compounded medications, or severely damaged pills.',
      tags: ['types', 'scanning', 'tablets', 'capsules', 'liquids', 'database', 'packaging']
    },
    {
      id: 3,
      category: 'safety',
      question: 'Is my health data secure and private?',
      answer: 'Your data security is our top priority. We implement: AES-256 encryption for data at rest and in transit, zero-knowledge architecture (we cannot access your personal health data), HIPAA compliance with regular audits, SOC 2 Type II certification, data minimization (we only collect necessary information), and automatic data deletion after account closure. Your medication images are processed locally when possible and deleted immediately after scanning. You maintain full control with data export and deletion options.',
      tags: ['privacy', 'security', 'HIPAA', 'encryption', 'data protection', 'zero-knowledge', 'SOC2']
    },
    {
      id: 4,
      category: 'interactions',
      question: 'How does the drug interaction checker work?',
      answer: 'Our interaction checker compares your medications against a comprehensive database of known drug interactions. It identifies potential conflicts, explains the risks, and provides recommendations. The system checks for interactions with prescription drugs, over-the-counter medications, supplements, and common foods. Always consult your healthcare provider for personalized advice.',
      tags: ['interactions', 'checker', 'database', 'conflicts', 'recommendations']
    },
    {
      id: 5,
      category: 'dosages',
      question: 'Can MediSense tell me the correct dosage for my medication?',
      answer: 'MediSense provides general dosage information based on standard medical guidelines, but we cannot provide personalized dosage recommendations. Your correct dosage depends on factors like your age, weight, medical condition, and other medications. Always follow your doctor\'s prescription and consult your healthcare provider for dosage questions.',
      tags: ['dosage', 'prescription', 'guidelines', 'personalized', 'doctor']
    },
    {
      id: 6,
      category: 'side-effects',
      question: 'What should I do if I experience side effects?',
      answer: 'If you experience mild side effects, document them in your symptom journal and contact your healthcare provider. For severe side effects like difficulty breathing, chest pain, severe allergic reactions, or signs of serious complications, seek immediate medical attention or call emergency services. Never stop taking prescribed medications without consulting your doctor first.',
      tags: ['side effects', 'symptoms', 'emergency', 'healthcare provider', 'reactions']
    },
    {
      id: 7,
      category: 'general',
      question: 'How do I set up medication reminders?',
      answer: 'Go to the Reminders section, click "Add Reminder," select your medication, set the time and days you need to take it. Enable push notifications in your browser for timely alerts. You can set multiple reminders for different medications and customize the frequency. The system will send notifications even when the app is closed.',
      tags: ['reminders', 'notifications', 'setup', 'alerts', 'schedule']
    },
    {
      id: 8,
      category: 'general',
      question: 'Can I use MediSense offline?',
      answer: 'Some features like viewing your medication history and symptom journal work offline. However, medicine scanning, drug interaction checking, and voice assistant require an internet connection to access our AI services and medical databases. We recommend having an internet connection for the best experience.',
      tags: ['offline', 'internet', 'connection', 'features', 'AI services']
    },
    {
      id: 9,
      category: 'safety',
      question: 'Is MediSense a replacement for medical advice?',
      answer: 'No, MediSense is a health management tool that provides general information and helps you organize your medications. It does not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical decisions. In emergencies, contact emergency services immediately.',
      tags: ['medical advice', 'healthcare', 'diagnosis', 'treatment', 'emergency']
    },
    {
      id: 10,
      category: 'interactions',
      question: 'What should I do if the system finds drug interactions?',
      answer: 'If interactions are detected, don\'t panic. Review the severity level and recommendations provided. For high-severity interactions, contact your healthcare provider immediately. For moderate interactions, schedule an appointment to discuss alternatives. Always bring the interaction report to show your doctor or pharmacist for professional guidance.',
      tags: ['interactions', 'severity', 'healthcare provider', 'alternatives', 'professional guidance']
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (faqId: number) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      all: 'All Topics',
      scanning: 'Medicine Scanning',
      safety: 'Safety & Privacy',
      interactions: 'Drug Interactions',
      dosages: 'Dosages',
      'side-effects': 'Side Effects',
      general: 'General'
    };
    return labels[category] || category;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'scanning': return <HelpCircle className="w-4 h-4" />;
      case 'safety': return <Shield className="w-4 h-4" />;
      case 'interactions': return <Book className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about MediSense and medication management
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {getCategoryIcon(category)}
                  <span>{getCategoryLabel(category)}</span>
                </button>
              ))}
            </div>

            {filteredFAQs.length > 0 && (
              <div className="text-sm text-gray-600">
                Showing {filteredFAQs.length} of {faqs.length} questions
              </div>
            )}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs Found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or selecting a different category.
              </p>
            </div>
          ) : (
            filteredFAQs.map(faq => (
              <div key={faq.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {getCategoryLabel(faq.category)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-8 pb-6 border-t border-gray-100">
                    <div className="pt-6">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {faq.answer}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {faq.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-blue-600 rounded-2xl shadow-lg p-8 text-center text-white">
          <Phone className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-blue-100 mb-6">
            Our support team is here to help you with any questions about MediSense
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
              Contact Support
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;