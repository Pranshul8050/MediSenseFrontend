import React, { useState, useContext } from 'react';
import { Phone, MapPin, Clock, AlertTriangle, Heart, Shield, Users, ChevronRight } from 'lucide-react';
import LanguageContext from '../context/LanguageContext';

const EmergencyServices: React.FC = () => {
  const [userLocation, setUserLocation] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState('US');
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language];

  // Emergency numbers by country
  const emergencyNumbers = {
    US: { general: '911', poison: '1-800-222-1222' },
    UK: { general: '999', poison: '111' },
    CA: { general: '911', poison: '1-844-POISON-X' },
    AU: { general: '000', poison: '13 11 26' },
    DE: { general: '112', poison: '030 19240' },
    FR: { general: '112', poison: '01 40 05 48 48' },
    ES: { general: '112', poison: '91 562 04 20' },
    IT: { general: '112', poison: '06 3054343' },
    JP: { general: '119', poison: '029-726-9899' },
    IN: { general: '102', poison: '1066' }
  };

  const emergencyTypes = [
    {
      type: 'Medical Emergency',
      icon: Heart,
      color: 'red',
      situations: [
        'Chest pain or heart attack symptoms',
        'Difficulty breathing or shortness of breath',
        'Severe allergic reactions',
        'Loss of consciousness',
        'Severe bleeding',
        'Signs of stroke (facial drooping, arm weakness, speech difficulty)'
      ]
    },
    {
      type: 'Poisoning',
      icon: AlertTriangle,
      color: 'orange',
      situations: [
        'Accidental medication overdose',
        'Ingestion of household chemicals',
        'Suspected drug poisoning',
        'Food poisoning with severe symptoms',
        'Chemical exposure'
      ]
    },
    {
      type: 'Mental Health Crisis',
      icon: Users,
      color: 'purple',
      situations: [
        'Suicidal thoughts or attempts',
        'Severe panic attacks',
        'Psychotic episodes',
        'Substance abuse emergencies',
        'Self-harm incidents'
      ]
    }
  ];

  const getLocation = () => {
    if (navigator.geolocation) {
      setUserLocation('Getting location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const accuracy = position.coords.accuracy;
          
          // Reverse geocoding simulation (in real app, use actual geocoding service)
          const locationString = `Lat: ${lat.toFixed(6)}, Lon: ${lon.toFixed(6)} (±${Math.round(accuracy)}m)`;
          setUserLocation(locationString);
          
          // Store location for emergency use
          localStorage.setItem('emergencyLocation', JSON.stringify({
            latitude: lat,
            longitude: lon,
            accuracy: accuracy,
            timestamp: new Date().toISOString()
          }));
        },
        (error) => {
          let errorMessage = 'Location access denied';
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access denied by user';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          setUserLocation(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      setUserLocation('Geolocation not supported');
    }
  };

  const callEmergency = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      red: 'bg-red-100 text-red-700 border-red-200',
      orange: 'bg-orange-100 text-orange-700 border-orange-200',
      purple: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  const getIconColorClasses = (color: string) => {
    const colorMap = {
      red: 'text-red-600 bg-red-100',
      orange: 'text-orange-600 bg-orange-100',
      purple: 'text-purple-600 bg-purple-100'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.red;
  };

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'IN', name: 'India', flag: '🇮🇳' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center">
              <Phone className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Emergency Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quick access to emergency numbers and services. In a medical emergency, don't delay - call for help immediately.
          </p>
        </div>

        {/* Critical Warning */}
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-red-800 mb-2">⚠️ CRITICAL NOTICE</h2>
              <p className="text-red-700 text-lg font-medium">
                If you are experiencing a medical emergency, do not rely on this app. Call your local emergency services immediately. 
                MediSense is not a substitute for professional emergency medical care.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Numbers */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Emergency Numbers</h2>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {countries.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <div className="text-center">
                  <Phone className="w-12 h-12 text-red-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Emergency Services</h3>
                  <div className="text-4xl font-bold text-red-600 mb-4">
                    {emergencyNumbers[selectedCountry as keyof typeof emergencyNumbers]?.general}
                  </div>
                  <button
                    onClick={() => callEmergency(emergencyNumbers[selectedCountry as keyof typeof emergencyNumbers]?.general)}
                    className="w-full bg-red-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors duration-200"
                  >
                    CALL NOW
                  </button>
                  <p className="text-sm text-gray-600 mt-3">
                    Police, Fire, Medical Emergency
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6">
                <div className="text-center">
                  <AlertTriangle className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Poison Control</h3>
                  <div className="text-2xl font-bold text-orange-600 mb-4">
                    {emergencyNumbers[selectedCountry as keyof typeof emergencyNumbers]?.poison}
                  </div>
                  <button
                    onClick={() => callEmergency(emergencyNumbers[selectedCountry as keyof typeof emergencyNumbers]?.poison)}
                    className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors duration-200"
                  >
                    CALL POISON CONTROL
                  </button>
                  <p className="text-sm text-gray-600 mt-3">
                    Medication overdose, poisoning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Services */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Location Services</h2>
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600 mb-6">
                Share your location with emergency services for faster response times
              </p>
              <button
                onClick={getLocation}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 mb-4"
              >
                Get Current Location
              </button>
              {userLocation && (
                <div className="bg-blue-50 rounded-lg p-4 mt-4">
                  <p className="text-sm text-gray-700">
                    <strong>Your Location:</strong> {userLocation}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Share this information with emergency responders
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Emergency Types */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Types of Emergencies</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {emergencyTypes.map((emergency, index) => {
              const Icon = emergency.icon;
              return (
                <div key={index} className={`border-2 rounded-2xl p-6 ${getColorClasses(emergency.color)}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${getIconColorClasses(emergency.color)}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{emergency.type}</h3>
                  <ul className="space-y-2">
                    {emergency.situations.map((situation, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm">
                        <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{situation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* First Aid Tips */}
        <section className="mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">While Waiting for Help</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Medical Emergency</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Stay calm and assess the situation</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Check for responsiveness and breathing</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Control bleeding with direct pressure</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Keep the person comfortable and warm</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Poisoning/Overdose</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Do not induce vomiting unless instructed</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Collect medication containers/labels</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Monitor breathing and consciousness</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <span>Be ready to perform CPR if needed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Important Disclaimer */}
        <section>
          <div className="bg-gray-900 rounded-2xl shadow-lg p-8 text-center text-white">
            <AlertTriangle className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Important Disclaimer</h2>
            <div className="text-gray-300 max-w-4xl mx-auto space-y-4">
              <p>
                This emergency services page is provided for informational purposes only and should not be used as a substitute 
                for professional emergency medical services.
              </p>
              <p>
                In case of a real emergency, always call your local emergency services immediately. Do not delay seeking 
                professional medical help while using this app.
              </p>
              <p className="text-sm">
                Emergency numbers and procedures may vary by location. Verify your local emergency numbers and procedures 
                with your local authorities.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EmergencyServices;