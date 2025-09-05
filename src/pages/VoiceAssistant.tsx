import React, { useState, useRef, useContext } from 'react';
import { Mic, MicOff, MessageCircle, Volume2, VolumeX, Send, User, Bot, Copy, Trash2 } from 'lucide-react';
import LanguageContext from '../context/LanguageContext';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const VoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your MediSense voice assistant. I can help you with questions about your medications, dosages, side effects, and drug interactions. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const { language, translations } = useContext(LanguageContext);
  const t = translations[language];

  const exampleQuestions = [
    "What are the side effects of ibuprofen?",
    "What's the correct dosage for amoxicillin?",
    "Does lisinopril interact with other medicines?",
    "When should I take my blood pressure medication?",
    "Can I take ibuprofen with food?",
    "What should I do if I miss a dose?",
    "Are there any foods I should avoid with warfarin?",
    "How long should I take antibiotics?",
    "What are the signs of an allergic reaction?",
    "Can I drink alcohol while taking this medication?"
  ];

  // Check for speech recognition support
  React.useEffect(() => {
    const hasSupport = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setVoiceSupported(hasSupport);
  }, []);

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language === 'en' ? 'en-US' : 
                                   language === 'es' ? 'es-ES' :
                                   language === 'fr' ? 'fr-FR' :
                                   language === 'de' ? 'de-DE' :
                                   language === 'zh' ? 'zh-CN' : 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleUserMessage(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } else {
      setVoiceSupported(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleUserMessage = (content: string) => {
    if (!content.trim()) return;
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setTextInput('');

    setIsProcessing(true);
    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(content);
      const assistantMessage: Message = {
        id: Date.now() + 1,
        type: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
      speakResponse(response);
    }, 1500);
  };

  const generateResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Enhanced response system with more comprehensive medical knowledge
    if (input.includes('ibuprofen') && input.includes('side effect')) {
      return 'Ibuprofen side effects include: Common (1-10%): stomach upset, heartburn, nausea, dizziness, headache. Serious (rare): stomach ulcers, kidney problems, increased cardiovascular risk. Take with food, maximum 1200mg/day for adults. Seek immediate care for: severe stomach pain, black stools, difficulty breathing, or chest pain.';
    } else if (input.includes('amoxicillin') && (input.includes('dosage') || input.includes('dose'))) {
      return 'Amoxicillin dosing: Adults: 500mg every 8 hours OR 875mg every 12 hours. Children: 20-40mg/kg/day divided into 2-3 doses. Duration: typically 7-10 days. CRITICAL: Complete full course even if feeling better. Can take with/without food. Contact doctor if: severe diarrhea, rash, or breathing difficulties occur.';
    } else if (input.includes('blood pressure') && (input.includes('medication') || input.includes('medicine'))) {
      return 'Blood pressure medications work best when taken consistently at the same time daily. Common types: ACE inhibitors (lisinopril), ARBs (losartan), diuretics (hydrochlorothiazide), beta-blockers (metoprolol). Monitor BP regularly, avoid sudden position changes, limit sodium intake. Never stop abruptly - consult doctor first.';
    } else if (input.includes('diabetes') && input.includes('medication')) {
      return 'Diabetes medications include: Metformin (first-line), insulin, sulfonylureas, SGLT2 inhibitors. Take as prescribed, monitor blood sugar, maintain consistent meal timing. Signs of low blood sugar: shakiness, sweating, confusion, rapid heartbeat. Always carry glucose tablets. Regular A1C testing recommended.';
    } else if (input.includes('antibiotic') && input.includes('resistance')) {
      return 'Antibiotic resistance occurs when bacteria adapt to survive antibiotic treatment. Prevention: Take full prescribed course, never share antibiotics, don\'t save leftover pills, never pressure doctors for antibiotics for viral infections. Proper use preserves effectiveness for future serious infections.';
    } else if (input.includes('generic') && input.includes('brand')) {
      return 'Generic medications contain the same active ingredients as brand names, with identical strength, dosage, and effectiveness. FDA requires bioequivalence testing. Generics cost 80-85% less than brands. Inactive ingredients may differ, rarely affecting tolerability. Switching requires doctor approval for certain medications.';
    } else if (input.includes('lisinopril') && input.includes('interact')) {
      return 'Lisinopril can interact with several medications including NSAIDs (like ibuprofen), potassium supplements, lithium, and certain diuretics. It may also interact with diabetes medications, causing low blood sugar. Always inform your healthcare provider about all medications and supplements you\'re taking. Avoid salt substitutes containing potassium unless approved by your doctor.';
    } else if (input.includes('blood pressure') && input.includes('when')) {
      return 'Blood pressure medications like lisinopril are typically taken once daily, preferably at the same time each day. Many people take them in the morning, but your doctor may recommend evening dosing if you experience dizziness. Consistency is key - try to take it at the same time every day for best results.';
    } else if (input.includes('ibuprofen') && input.includes('food')) {
      return 'Yes, it\'s recommended to take ibuprofen with food or milk to reduce stomach irritation. Taking it on an empty stomach can increase the risk of stomach upset, ulcers, and bleeding. If you must take it without food, consider taking it with a full glass of water.';
    } else if (input.includes('miss') && input.includes('dose')) {
      return 'If you miss a dose, take it as soon as you remember, unless it\'s almost time for your next dose. Never double up on doses to make up for a missed one. For critical medications like blood pressure or heart medications, contact your healthcare provider for specific guidance. Setting up medication reminders can help prevent missed doses.';
    } else if (input.includes('warfarin') && input.includes('food')) {
      return 'With warfarin, maintain consistent vitamin K intake. Foods high in vitamin K include leafy greens like spinach, kale, and broccoli. You don\'t need to avoid these foods, but keep your intake consistent. Avoid excessive alcohol, cranberry juice, and grapefruit juice. Always consult your doctor before making significant dietary changes.';
    } else if (input.includes('antibiotic') && input.includes('long')) {
      return 'The duration of antibiotic treatment varies by infection type and severity, typically ranging from 3-14 days. It\'s crucial to complete the entire prescribed course, even if you feel better before finishing. Stopping early can lead to antibiotic resistance and infection recurrence. Never save leftover antibiotics for future use.';
    } else if (input.includes('allergic reaction') && input.includes('sign')) {
      return 'Signs of allergic reactions to medications include skin rash, hives, itching, swelling (especially face, lips, tongue, or throat), difficulty breathing, wheezing, dizziness, or rapid heartbeat. Severe reactions (anaphylaxis) require immediate emergency care. If you experience any of these symptoms after taking medication, seek medical attention immediately.';
    } else if (input.includes('alcohol') && input.includes('medication')) {
      return 'Alcohol can interact dangerously with many medications, including antibiotics, pain relievers, blood thinners, and antidepressants. It can increase side effects, reduce medication effectiveness, or cause dangerous reactions. Always check with your healthcare provider or pharmacist about alcohol interactions with your specific medications.';
    } else if (input.includes('dosage') || input.includes('dose')) {
      return 'Medication dosages vary depending on the specific drug, your age, weight, medical condition, and other factors. Always follow the dosage instructions on your prescription label or medication package. Never exceed the recommended dose unless directed by your healthcare provider. If you\'re unsure about your dosage, consult your doctor or pharmacist.';
    } else if (input.includes('interact') || input.includes('combination')) {
      return 'Drug interactions can be serious and potentially dangerous. Some medications can increase or decrease the effectiveness of others, or cause harmful side effects when combined. Always inform your healthcare provider about all medications, supplements, and herbal products you\'re taking. You can also use our drug interaction checker for preliminary screening.';
    } else if (input.includes('when') && (input.includes('take') || input.includes('medication'))) {
      return 'The timing of medication depends on the specific drug and your doctor\'s instructions. Some medications should be taken with food to reduce stomach irritation, while others work best on an empty stomach. Some are taken once daily, others multiple times. Always follow the schedule prescribed by your healthcare provider and try to take medications at the same times each day.';
    } else if (input.includes('side effect')) {
      return 'Side effects vary by medication, but common ones include nausea, dizziness, headache, and drowsiness. Most side effects are mild and temporary. However, contact your healthcare provider if you experience severe or persistent side effects. Keep a record of any side effects you experience to discuss with your doctor.';
    } else if (input.includes('storage') || input.includes('store')) {
      return 'Most medications should be stored in a cool, dry place away from direct sunlight, typically at room temperature (68-77°F). Avoid storing medications in bathrooms or kitchens where humidity and temperature fluctuate. Some medications require refrigeration. Always check the label for specific storage instructions and keep medications in their original containers.';
    } else if (input.includes('expire') || input.includes('expiration')) {
      return 'Never use expired medications as they may be less effective or potentially harmful. Most medications remain stable for 1-2 years past their expiration date when stored properly, but this varies by medication type. Dispose of expired medications safely through pharmacy take-back programs or follow FDA disposal guidelines.';
    } else {
      return 'I understand you have a question about medications. While I can provide general information, please remember that I cannot replace professional medical advice. For specific medical concerns, always consult with your healthcare provider, pharmacist, or call emergency services if it\'s urgent. Is there a specific aspect of medication management I can help you with?';
    }
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window && !isSpeaking) {
      // Stop any current speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'en' ? 'en-US' : 
                      language === 'es' ? 'es-ES' :
                      language === 'fr' ? 'fr-FR' :
                      language === 'de' ? 'de-DE' :
                      language === 'zh' ? 'zh-CN' : 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleUserMessage(textInput.trim());
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const clearConversation = () => {
    setMessages([{
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your MediSense voice assistant. I can help you with questions about your medications, dosages, side effects, and drug interactions. How can I assist you today?',
      timestamp: new Date()
    }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Voice Assistant</h1>
          <p className="text-xl text-gray-600">
            Ask questions about your medications using natural language
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Voice Commands */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <Mic className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Voice Commands</h2>
            </div>

            <div className="text-center mb-8">
              {!voiceSupported ? (
                <div className="space-y-4">
                  <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <MicOff className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="text-lg font-semibold text-gray-600">Voice Not Supported</div>
                  <p className="text-gray-500 text-sm">Your browser doesn't support voice recognition. Please use text input below.</p>
                </div>
              ) : !isListening ? (
                <div className="space-y-4">
                  <div className="w-32 h-32 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <MicOff className="w-16 h-16 text-blue-600" />
                  </div>
                  <button
                    onClick={startListening}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <Mic className="w-5 h-5" />
                    <span>Start Voice Assistant</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="w-32 h-32 mx-auto bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                    <Mic className="w-16 h-16 text-red-600" />
                  </div>
                  <div className="text-lg font-semibold text-gray-900">Listening...</div>
                  <button
                    onClick={stopListening}
                    className="bg-red-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center space-x-2 mx-auto"
                  >
                    <MicOff className="w-5 h-5" />
                    <span>Stop Listening</span>
                  </button>
                </div>
              )}
            </div>

            {voiceSupported && <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Try asking:</h3>
              <div className="space-y-2">
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleUserMessage(question)}
                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 text-sm"
                  >
                    "• {question}"
                  </button>
                ))}
              </div>
            </div>}
          </div>

          {/* Conversation */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Conversation</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearConversation}
                  className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              {isSpeaking && (
                <button
                  onClick={stopSpeaking}
                  className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200 transition-colors duration-200"
                >
                  <VolumeX className="w-5 h-5" />
                </button>
              )}
              </div>
            </div>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' ? 'bg-blue-600' : 'bg-green-600'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${
                        message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                        <div className="flex items-center space-x-1 ml-2">
                          <button
                            onClick={() => copyMessage(message.content)}
                            className="p-1 rounded hover:bg-black/10 transition-colors duration-200"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                      {message.type === 'assistant' && (
                        <button
                          onClick={() => speakResponse(message.content)}
                            className="p-1 rounded hover:bg-gray-200 transition-colors duration-200"
                        >
                          <Volume2 className="w-3 h-3 text-gray-600" />
                        </button>
                      )}
                        </div>
                    </div>
                  </div>
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-600">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-900 rounded-bl-md">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Text Input */}
            <form onSubmit={handleTextSubmit} className="flex space-x-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your question here..."
                disabled={isProcessing}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!textInput.trim() || isProcessing}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              {voiceSupported ? 'Use voice or text to ask questions about your medications' : 'Type your questions about medications below'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;