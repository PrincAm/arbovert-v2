"use client";

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import CookieBanner from '../components/CookieBanner';

export function Providers({ children }) {
  useEffect(() => {
    const loadGtagScript = () => {
      try {
        // Initialize dataLayer before loading script
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
          };
        }

        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=GTM-5V7DRKB`;
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        script.onerror = () => {
          console.warn('Failed to load GTM script');
        };

        script.onload = () => {
          try {
            if (typeof window !== 'undefined' && window.gtag) {
              window.gtag('js', new Date());
              updateGtagConsent();
            }
          } catch (error) {
            console.warn('Error initializing GTM:', error);
          }
        };

        document.head.appendChild(script);
      } catch (error) {
        console.warn('Error loading GTM script:', error);
      }
    };

    const updateGtagConsent = () => {
      try {
        const consent = Cookies.get('ga_consent');
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('consent', 'update', {
            analytics_storage: consent === 'accepted' ? 'granted' : 'denied',
            ad_storage: consent === 'accepted' ? 'granted' : 'denied',
            ad_user_data: consent === 'accepted' ? 'granted' : 'denied',
            ad_personalization: consent === 'accepted' ? 'granted' : 'denied',
          });
        }
      } catch (error) {
        console.warn('Error updating GTM consent:', error);
      }
    };

    // Only load GTM if we're in the browser
    if (typeof window !== 'undefined') {
      loadGtagScript();
    }
  }, []);

  return (
    <>
      {children}
      <CookieBanner />
    </>
  );
}
