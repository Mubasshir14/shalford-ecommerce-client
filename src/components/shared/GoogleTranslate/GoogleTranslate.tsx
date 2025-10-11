/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Create translate element container
    if (!document.getElementById('google_translate_element')) {
      const div = document.createElement('div');
      div.id = 'google_translate_element';
      div.style.display = 'none';
      document.body.appendChild(div);
    }

    // Define init function
    window.googleTranslateElementInit = function() {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,bn',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
        
        console.log('✅ Google Translate initialized successfully');
      }
    };

    // Load Google Translate script
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      script.onerror = () => console.error('❌ Failed to load Google Translate');
      document.head.appendChild(script);
    } else {
      if (window.google && window.google.translate) {
        window.googleTranslateElementInit();
      }
    }

    // Add CSS to hide Google branding
    const style = document.createElement('style');
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate,
      .goog-te-gadget-icon,
      body > .skiptranslate,
      .goog-te-balloon-frame,
      div#goog-gt- {
        display: none !important;
      }
      
      body {
        top: 0px !important;
      }
      
      .goog-te-combo {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup
      const existingDiv = document.getElementById('google_translate_element');
      if (existingDiv) {
        existingDiv.remove();
      }
    };
  }, []);

  return null;
}