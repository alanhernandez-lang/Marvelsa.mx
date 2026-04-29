// src/core/tracking.js

export const initTracking = (gtmId, ga4Id, pixelId) => {
  // --- Google Tag Manager (GTM) ---
  if (gtmId) {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', gtmId);
    console.log('GTM Initialized:', gtmId);
  }

  // --- Google Analytics 4 (GA4) ---
  if (ga4Id) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', ga4Id);
    console.log('GA4 Initialized:', ga4Id);
  }

  // --- Meta Pixel ---
  if (pixelId) {
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', pixelId);
    fbq('track', 'PageView');
    console.log('Meta Pixel Initialized:', pixelId);
  }
};

// Evento de conversión para el formulario
export const trackLeadConversion = () => {
  if (typeof fbq === 'function') fbq('track', 'Lead');
  if (typeof gtag === 'function') {
    window.dataLayer.push({
      event: 'form_submission',
      category: 'Conversion',
      action: 'Distributor_Lead'
    });
  }
  console.log('Lead Event Tracked');
};
