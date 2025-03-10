self.addEventListener('fetch', event => {
  // For HTML with offline control
  if (
    event.request.mode === 'navigate' ||
    (event.request.method === 'GET' &&
      event.request.headers.get('accept').includes('text/html'))
  ) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/offline'))
    );
  } else if (
    event.request.method === 'GET' &&
    !event.request.url.match('/api') &&
    !event.request.url.match('api.supersports.com')
  ) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
  }
});