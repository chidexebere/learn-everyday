/* Register service worker */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => console.log('SW Registered!', reg.scope))
      .catch((err) => console.log('SW registration failed!', err));
  });
}
