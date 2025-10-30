import { useState, useEffect, useCallback } from 'react';

interface UseTextToSpeechOptions {
  voice?: SpeechSynthesisVoice | null;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export const useTextToSpeech = (options: UseTextToSpeechOptions = {}) => {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
      
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
        }
      };

      // Load voices immediately and on change
      loadVoices();
      
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
      
      // Fallback: load voices after a short delay
      setTimeout(loadVoices, 100);
    }
  }, []);

  const speak = useCallback((text: string, customOptions?: UseTextToSpeechOptions) => {
    if (!supported) {
      console.warn('Text-to-speech is not supported in this browser');
      return;
    }

    if (!text || text.trim().length === 0) {
      return;
    }

    // Cancel any ongoing speech first
    window.speechSynthesis.cancel();
    
    // Small delay to ensure cancel completes
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Apply options with defaults
      const finalOptions = { 
        rate: 0.9, 
        pitch: 1, 
        volume: 0.8, 
        ...options, 
        ...customOptions 
      };
      
      if (finalOptions.voice) {
        utterance.voice = finalOptions.voice;
      } else if (voices.length > 0) {
        // Try to find an English voice
        const englishVoice = voices.find(v => v.lang.startsWith('en-'));
        if (englishVoice) utterance.voice = englishVoice;
      }
      
      utterance.rate = finalOptions.rate || 0.9;
      utterance.pitch = finalOptions.pitch || 1;
      utterance.volume = finalOptions.volume ?? 0.8;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = (error) => {
        console.warn('Speech synthesis error:', error);
        setSpeaking(false);
      };

      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Failed to speak:', error);
        setSpeaking(false);
      }
    }, 100);
  }, [supported, options, voices]);

  const cancel = useCallback(() => {
    if (supported) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [supported]);

  const pause = useCallback(() => {
    if (supported) {
      window.speechSynthesis.pause();
    }
  }, [supported]);

  const resume = useCallback(() => {
    if (supported) {
      window.speechSynthesis.resume();
    }
  }, [supported]);

  return {
    speak,
    cancel,
    pause,
    resume,
    speaking,
    supported,
    voices,
  };
};
