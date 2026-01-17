import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Button } from '@heroui/react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('ga_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('ga_consent', 'accepted', { expires: 365 });
    setShowBanner(false);
    // Update GTM's consent mode
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    });
  };

  const handleDecline = () => {
    Cookies.set('ga_consent', 'declined', { expires: 365 });
    setShowBanner(false);
    // Update GTM's consent mode
    window.gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_personalization: 'denied',
      ad_user_data: 'denied',
    });
  };

  if (!showBanner) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        background: '#06371B',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        zIndex: 1000,
      }}
    >
      <p>
        Používáme cookies, abychom vylepšili vaše zážitky. Pokračováním v
        návštěvě tohoto webu souhlasíte s používáním cookies.
      </p>
      <div className="flex items-center justify-center gap-2">
        <Button onClick={handleAccept} size="sm" radius="full">
          Přijmout
        </Button>
        <Button
          onClick={handleDecline}
          className="bg-blue-100 text-gray-900"
          size="sm"
          radius="full"
        >
          Odmítnout
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
