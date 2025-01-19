import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { startMillisAgent, stopMillisAgent } from '../utils/millis';

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);

  const toggleVoiceAssistant = async () => {
    try {
      if (isListening) {
        await stopMillisAgent();
      } else {
        await startMillisAgent();
      }
      setIsListening(!isListening);
    } catch (error) {
      console.error('Error toggling voice assistant:', error);
    }
  };

  return (
    <button
      onClick={toggleVoiceAssistant}
      className={`fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${
        isListening ? 'bg-red-500' : 'bg-indigo-600'
      }`}
    >
      {isListening ? (
        <MicOff className="h-6 w-6 text-white" />
      ) : (
        <Mic className="h-6 w-6 text-white" />
      )}
    </button>
  );
}