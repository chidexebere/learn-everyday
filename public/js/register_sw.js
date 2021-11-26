/* Register service worker */
// Wrapping the SW registration call in load provides better performance
// See: https://developers.google.com/web/fundamentals/primers/service-workers/registration

window.addEventListener('load', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => console.log('SW Registered!', reg.scope))
      .catch((err) => console.log('SW registration failed!', err));
  }
});
