export default ({ route, $gtm }) => {
  if ($gtm) {
    $gtm.push({
      event: 'Page Impression',
      environmentInfo: {
        isProduction: process.env.NODE_ENV === 'production'
      },
      pageInfo: {
        pageType: route?.meta[0]?.pageType,
        url: route.fullPath,
        httpStatusCode: 200,
        title: (typeof document !== 'undefined' && document.title) || ''
      },
      'gtm.uniqueEventId': 3
    });
  }
};
