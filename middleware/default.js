export default ({ redirect, route, $gtm, $config, app, store, i18n, req }) => {
  const isSamePath = store.state.currentPath === route.path;

  store.commit('setCurrentRouteName', route.name);
  store.commit('setCurrentPath', route.path);

  if ($config.marketInPath) {
    let currentMarket = store.state.channel.currentMarket;
    const marketInPath = route.params.market;
    const currentLanguage = i18n.localeProperties.code;
    const startPageName = 'start';

    // Function to check if language is allowed for a market and redirect otherwise
    const checkIfLanguageAllowed = market => {
      const marketObj = store.state.channel.markets.find(
        m => m.alias === market
      );

      if (!marketObj) {
        // eslint-disable-next-line no-console
        console.error(
          'Market with alias "' + market + '" not available in markets array'
        );
        return;
      }

      const defaultLanguage = marketObj.defaultLanguageId.split('-')[0];
      const allowedLanguages = marketObj.allowedLanguages.map(
        ({ code }) => code
      );

      // If specific allowed languages exists for this market and if the current language is not on the list, change to default language
      if (
        allowedLanguages.length &&
        !allowedLanguages.includes(currentLanguage)
      ) {
        const fallbackPath = route.path.replace(
          currentLanguage,
          defaultLanguage
        );
        return redirect(fallbackPath);
      }
    };

    // If market in path is different from current market, set current market to match
    // If market in path is not in markets, redirect to fallback market
    if (marketInPath && marketInPath !== currentMarket) {
      const marketAliases = store.state.channel.markets.map(
        ({ alias }) => alias
      );

      // If market exists
      if (marketAliases.includes(marketInPath)) {
        store.dispatch('channel/setCurrentMarket', marketInPath);
        currentMarket = store.state.channel.currentMarket;

        // Check if current language is allowed on this market and redirect otherwise
        checkIfLanguageAllowed(currentMarket);

        // Market exists and language allowed, return here
        return;
      }

      // Change to fallback market if market in path doesn't exist
      const fallbackPath = route.path.replace(
        marketInPath,
        $config.fallbackMarketAlias
      );
      store.dispatch('channel/setCurrentMarket', $config.fallbackMarketAlias);

      return redirect(fallbackPath);
    }

    // If i18n redirects wrong, redirect to correct path
    if (route.path === '/' + currentLanguage + '/' + currentMarket) {
      return redirect('/' + currentMarket + '/' + currentLanguage);
    }

    // If no route matching, strip path from market, rebuild it and redirect
    if (!route.name) {
      const splitPath = route.path.split('/');
      if (splitPath[1] === currentMarket && splitPath[2] === currentLanguage) {
        return;
      }

      const strippedPath = route.fullPath
        .replace('/' + currentMarket, '')
        .replace('/' + currentLanguage, '');
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

    // Check if current language is allowed on this market and redirect otherwise
    checkIfLanguageAllowed(currentMarket);
  }

  const protocol = req?.headers['x-forwarded-proto'] || 'http'; // Check if the request went through a proxy/load balancer
  const host = req?.headers?.host || $config.baseUrl;
  const fullUrl = req ? `${protocol}://${host}${req.url}` : route.fullPath;

  if (!isSamePath) {
    // Dispatch page impression event
    const { name, meta, path, hash, query, params, fullPath } = route;
    store.dispatch('events/push', {
      type: 'page:impression',
      data: {
        route: { name, meta, path, hash, query, params, fullPath },
        isSSR: process.server,
        requestUrl: fullUrl
      }
    });
  }

  if ($gtm && !$config.useExternalGtm) {
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
