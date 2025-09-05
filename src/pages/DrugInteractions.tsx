import React, { useState, useContext } from 'react';
import { AlertTriangle, Search, Plus, X, ShieldAlert, Info, CheckCircle } from 'lucide-react';
import LanguageContext from '../context/LanguageContext';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  active: boolean;
}

interface Interaction {
  drug1: string;
  drug2: string;
  severity: 'Low' | 'Moderate' | 'High';
  description: string;
  recommendation: string;
}

interface DrugInteractionsProps {
  medications: Medication[];
}

const DrugInteractions: React.FC<DrugInteractionsProps> = ({ medications }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedMedications, setCheckedMedications] = useState<string[]>(
    medications.map(med => med.name)
  );
  const [additionalMeds, setAdditionalMeds] = useState<string[]>([]);
  const [newMedName, setNewMedName] = useState('');
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language];

  // Mock interaction data
  const knownInteractions: Interaction[] = [
    {
      drug1: 'Amoxicillin',
      drug2: 'Warfarin',
      severity: 'Moderate',
      description: 'Amoxicillin may increase the anticoagulant effect of warfarin by altering gut bacteria that produce vitamin K, potentially leading to increased bleeding risk.',
      recommendation: 'Monitor INR more frequently (every 3-5 days initially). Watch for signs of bleeding: unusual bruising, nosebleeds, dark stools. Consider dose adjustment of warfarin if necessary.'
    },
    {
      drug1: 'Lisinopril',
      drug2: 'Ibuprofen',
      severity: 'Moderate',
      description: 'NSAIDs like ibuprofen may reduce the antihypertensive effect of ACE inhibitors by inhibiting prostaglandin synthesis and increase the risk of acute kidney injury.',
      recommendation: 'Use lowest effective dose of NSAID for shortest duration. Monitor blood pressure weekly and kidney function (creatinine, BUN). Consider alternative pain management.'
    },
    {
      drug1: 'Metformin',
      drug2: 'Alcohol',
      severity: 'High',
      description: 'Alcohol can increase the risk of lactic acidosis when combined with metformin, especially in patients with kidney or liver problems. Both can affect lactate metabolism.',
      recommendation: 'Limit alcohol to 1 drink/day for women, 2 for men. Avoid binge drinking completely. Stop metformin if experiencing nausea, vomiting, stomach pain, or unusual fatigue.'
    },
    {
      drug1: 'Warfarin',
      drug2: 'Aspirin',
      severity: 'High',
      description: 'Combining warfarin with aspirin significantly increases bleeding risk through different anticoagulant mechanisms.',
      recommendation: 'Generally contraindicated unless specifically prescribed by cardiologist. Requires frequent INR monitoring and bleeding assessment.'
    },
    {
      drug1: 'Simvastatin',
      drug2: 'Grapefruit',
      severity: 'Moderate',
      description: 'Grapefruit juice inhibits CYP3A4 enzyme, increasing simvastatin levels and risk of muscle toxicity (rhabdomyolysis).',
      recommendation: 'Avoid grapefruit juice completely. Watch for muscle pain, weakness, or dark urine. Consider switching to pravastatin or rosuvastatin if needed.'
    }
  ];

  const commonMedications = [
    'Acetaminophen', 'Ibuprofen', 'Aspirin', 'Metformin', 'Atorvastatin',
    'Omeprazole', 'Sertraline', 'Montelukast', 'Rosuvastatin', 'Escitalopram'
  ];

  const addMedication = () => {
    if (newMedName.trim() && !checkedMedications.includes(newMedName) && !additionalMeds.includes(newMedName)) {
      setAdditionalMeds(prev => [...prev, newMedName.trim()]);
      setNewMedName('');
    }
  };

  const removeMedication = (medName: string) => {
    setAdditionalMeds(prev => prev.filter(med => med !== medName));
  };

  const toggleMedication = (medName: string) => {
    setCheckedMedications(prev => {
      if (prev.includes(medName)) {
        return prev.filter(med => med !== medName);
      } else {
        return [...prev, medName];
      }
    });
  };

  const getAllMedications = () => {
    const activeMeds = medications
      .filter(med => checkedMedications.includes(med.name))
      .map(med => med.name);
    return [...activeMeds, ...additionalMeds];
  };

  const checkInteractions = () => {
    const allMeds = getAllMedications();
    const interactions: Interaction[] = [];

    // Check for known interactions
    knownInteractions.forEach(interaction => {
      const hasDrug1 = allMeds.some(med => 
        med.toLowerCase().includes(interaction.drug1.toLowerCase()) || 
        interaction.drug1.toLowerCase().includes(med.toLowerCase())
      );
      const hasDrug2 = allMeds.some(med => 
        med.toLowerCase().includes(interaction.drug2.toLowerCase()) || 
        interaction.drug2.toLowerCase().includes(med.toLowerCase())
      );
      
      if (hasDrug1 && hasDrug2) {
        interactions.push(interaction);
      }
    });

    return interactions;
  };

  const detectedInteractions = checkInteractions();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-yellow-700 bg-yellow-100 border-yellow-200';
      case 'Moderate': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'High': return 'text-red-700 bg-red-100 border-red-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Low': return <Info className="w-5 h-5" />;
      case 'Moderate': return <AlertTriangle className="w-5 h-5" />;
      case 'High': return <ShieldAlert className="w-5 h-5" />;
      default: return <Info className="w-5 h-5" />;
    }
  };

  const filteredMedications = commonMedications.filter(med =>
    med.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !checkedMedications.includes(med) &&
    !additionalMeds.includes(med)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Drug Interaction Checker</h1>
          <p className="text-xl text-gray-600">
            Check for potentially dangerous interactions between your medications
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Medication Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Medications */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Medications</h2>
              <div className="space-y-3">
                {medications.map((medication) => (
                  <div key={medication.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={checkedMedications.includes(medication.name)}
                      onChange={() => toggleMedication(medication.name)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{medication.name}</div>
                      <div className="text-sm text-gray-600">{medication.dosage} • {medication.frequency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Additional Medications */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Other Medications</h2>
              
              <div className="flex space-x-3 mb-6">
                <input
                  type="text"
                  placeholder="Enter medication name..."
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addMedication()}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={addMedication}
                  disabled={!newMedName.trim()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {/* Search Common Medications */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search common medications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {searchTerm && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Common Medications</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {filteredMedications.slice(0, 6).map((med) => (
                      <button
                        key={med}
                        onClick={() => {
                          setAdditionalMeds(prev => [...prev, med]);
                          setSearchTerm('');
                        }}
                        className="text-left px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 text-sm"
                      >
                        {med}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Added Medications */}
              {additionalMeds.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Added Medications</h3>
                  <div className="flex flex-wrap gap-2">
                    {additionalMeds.map((med) => (
                      <div key={med} className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium">{med}</span>
                        <button
                          onClick={() => removeMedication(med)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interaction Results */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Interaction Results</h2>

            {detectedInteractions.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Interactions Detected</h3>
                <p className="text-gray-600">
                  Based on the medications you've selected, no significant interactions were found.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {detectedInteractions.map((interaction, index) => (
                  <div key={index} className={`border-l-4 rounded-lg p-4 ${getSeverityColor(interaction.severity)}`}>
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getSeverityIcon(interaction.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{interaction.drug1} + {interaction.drug2}</h3>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/50">
                            {interaction.severity}
                          </span>
                        </div>
                        <p className="text-sm mb-3">{interaction.description}</p>
                        <div className="bg-white/30 rounded-lg p-3">
                          <h4 className="font-medium text-sm mb-1">Recommendation:</h4>
                          <p className="text-sm">{interaction.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Important Notice</p>
                  <p>
                    This tool provides general information only. Always consult your healthcare provider 
                    or pharmacist before making any changes to your medications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugInteractions;