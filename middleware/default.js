export default ({ redirect, route, $gtm, $config, app, store, i18n }) => {
  if ($config.marketInPath) {
    let currentMarket = store.state.marketId;
    const marketInPath = route.params.market;
    const startPageName = 'start';

    // If market in path is different from current market, set current market to match
    if (marketInPath && marketInPath !== currentMarket) {
      store.dispatch('setMarketId', marketInPath);
      currentMarket = store.state.marketId;
    }

    // If i18n redirects wrong, redirect to correct path
    if (route.path === '/' + i18n.localeProperties.code + '/' + currentMarket) {
      return redirect('/' + currentMarket + '/' + i18n.localeProperties.code);
    }

    // If no route matching, strip path from market, rebuild it and redirect
    if (!route.name) {
      const splitPath = route.path.split('/');
      if (
        splitPath[1] === currentMarket &&
        splitPath[2] === i18n.localeProperties.code
      ) {
        return;
      }

      const strippedPath = route.fullPath
        .replace('/' + currentMarket, '')
        .replace('/' + i18n.localeProperties.code, '');
      return redirect(
        '/' + currentMarket + app.localePath('index') + strippedPath
      );
    }

    // If not using start page, redirect to front page
    if (route.name === startPageName && !$config.useStartPage) {
      return redirect(app.$getPath('index'));
    }

    // If other page than start and market is not in path, redirect to url with market in path
    if (route.name !== startPageName && !marketInPath) {
      return redirect('/' + currentMarket + route.fullPath);
    }
  }

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
