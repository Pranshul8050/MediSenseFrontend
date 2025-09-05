import React, { useContext } from 'react';
import { Shield, Lock, Eye, Database, CheckCircle, AlertTriangle, FileText, Globe } from 'lucide-react';
import LanguageContext from '../context/LanguageContext';

const Safety: React.FC = () => {
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language];

  const privacyFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All your health data is encrypted using AES-256 encryption with perfect forward secrecy. Data is encrypted on your device before transmission and remains encrypted in our secure cloud infrastructure.',
      status: 'active'
    },
    {
      icon: Eye,
      title: 'Zero-Knowledge Privacy',
      description: 'We use zero-knowledge architecture meaning we cannot access your personal health data even if we wanted to. Your information is encrypted with keys only you control.',
      status: 'active'
    },
    {
      icon: Database,
      title: 'Secure Storage',
      description: 'Data is stored in HIPAA-compliant, SOC 2 certified data centers with military-grade security, redundant backups, and 24/7 monitoring by security experts.',
      status: 'active'
    },
    {
      icon: Shield,
      title: 'Complete Data Control',
      description: 'You have complete control over your data with granular permissions, real-time access logs, instant data export in standard formats, and permanent deletion options.',
      status: 'active'
    }
  ];

  const safetyGuidelines = [
    {
      title: 'Emergency Situations',
      content: 'MediSense is not intended for emergency use. In case of medical emergencies, call your local emergency services immediately.',
      icon: AlertTriangle,
      severity: 'high'
    },
    {
      title: 'Professional Medical Advice',
      content: 'Always consult with qualified healthcare providers for medical decisions. MediSense provides information but does not replace professional medical advice.',
      icon: CheckCircle,
      severity: 'medium'
    },
    {
      title: 'Medication Changes',
      content: 'Never stop, start, or change your medications based solely on MediSense recommendations. Always consult your healthcare provider first.',
      icon: AlertTriangle,
      severity: 'high'
    },
    {
      title: 'Accuracy Disclaimer',
      content: 'While our AI scanning is highly accurate (99.9%), always verify medication identification with your pharmacist or the original prescription.',
      icon: CheckCircle,
      severity: 'medium'
    }
  ];

  const certifications = [
    {
      name: 'HIPAA Compliant',
      description: 'Meets all Health Insurance Portability and Accountability Act requirements',
      icon: FileText
    },
    {
      name: 'FDA Guidelines',
      description: 'Developed following FDA guidance for digital health tools',
      icon: CheckCircle
    },
    {
      name: 'GDPR Compliant',
      description: 'Complies with European General Data Protection Regulation',
      icon: Globe
    },
    {
      name: 'SOC 2 Certified',
      description: 'System and Organization Controls 2 certification for security and availability',
      icon: Shield
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-amber-200 bg-amber-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getSeverityIconColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Data Privacy & Security</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your health data security and privacy are our top priorities. Learn how we protect your information and ensure safe usage.
          </p>
        </div>

        {/* Privacy Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Privacy Protection</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Safety Guidelines */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Safety Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {safetyGuidelines.map((guideline, index) => {
              const Icon = guideline.icon;
              return (
                <div key={index} className={`border-2 rounded-2xl p-6 ${getSeverityColor(guideline.severity)}`}>
                  <div className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 p-2 rounded-lg ${getSeverityIconColor(guideline.severity)}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{guideline.title}</h3>
                      <p className="text-gray-700">{guideline.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Certifications & Compliance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-green-200">
                  <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 text-sm">{cert.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Data Control */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Your Data, Your Control</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">View Your Data</h3>
                <p className="text-gray-600 mb-4">Access and review all your stored health information at any time through your account dashboard.</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  View Data
                </button>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Database className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Export Data</h3>
                <p className="text-gray-600 mb-4">Download your complete health record in standard formats to use with other healthcare apps.</p>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium">
                  Export Data
                </button>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Delete Data</h3>
                <p className="text-gray-600 mb-4">Permanently remove all your data from our systems. This action cannot be undone.</p>
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium">
                  Delete Data
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Security Measures */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Advanced Security Measures</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Security</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>256-bit SSL encryption for all data transmission</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Multi-factor authentication support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Regular security audits and penetration testing</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Automated threat detection and response</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Operational Security</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>24/7 security monitoring and incident response</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Employee background checks and security training</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Regular data backups and disaster recovery plans</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Compliance audits and third-party security assessments</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact for Security */}
        <section>
          <div className="bg-gray-900 rounded-2xl shadow-lg p-8 text-center text-white">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Security Questions?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              If you have questions about our security practices or need to report a security concern, 
              our security team is available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Contact Security Team
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200">
                Report Security Issue
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Safety;