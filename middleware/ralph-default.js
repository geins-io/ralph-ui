export default ({ redirect, route, $config, app, store, i18n }) => {
  const isSamePath = store.state.currentPath === route.path;

  store.commit('setCurrentRouteName', route.name);
  store.commit('setCurrentPath', route.path);

  if ($config.marketInPath) {
    let currentMarket = store.state.channel.currentMarket;
    const marketInPath = route.params.market;
    const currentLanguage = i18n.localeProperties.code;
    const query = Object.keys(route.query).length
      ? '?' + route.fullPath.split('?')[1]
      : '';
    const hash = route.hash ? '#' + route.hash : '';

    const redirectToPath = (path) => {
      const redirectPath = path + query.replace(hash, '') + hash;
      return redirect(redirectPath);
    };

    // Function to check if language is allowed for a market and redirect otherwise
    const checkIfLanguageAllowed = (market) => {
      const marketObj = store.state.channel.markets.find(
        (m) => m.alias === market,
      );

      if (!marketObj) {
        this.$ralphLogError(
          'Market with alias "' + market + '" not available in markets array',
        );
        return;
      }

      const defaultLanguage = marketObj.defaultLanguageId.split('-')[0];
      const allowedLanguages = marketObj.allowedLanguages.map(
        ({ code }) => code,
      );

      // If specific allowed languages exists for this market and if the current language is not on the list, change to default language
      if (
        allowedLanguages.length &&
        !allowedLanguages.includes(currentLanguage)
      ) {
        const fallbackPath = route.path.replace(
          currentLanguage,
          defaultLanguage,
        );
        return redirectToPath(fallbackPath);
      }
    };

    // If market in path is different from current market, set current market to match
    // If market in path is not in markets, redirect to fallback market
    if (marketInPath && marketInPath !== currentMarket) {
      const marketAliases = store.state.channel.markets.map(
        ({ alias }) => alias,
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
        $config.fallbackMarketAlias,
      );
      store.dispatch('channel/setCurrentMarket', $config.fallbackMarketAlias);

      return redirectToPath(fallbackPath);
    }

    // If i18n redirects wrong, redirect to correct path
    if (route.path === '/' + currentLanguage + '/' + currentMarket) {
      return redirectToPath('/' + currentMarket + '/' + currentLanguage);
    }

    // If no route matching, strip path from market, rebuild it and redirect
    if (!route.name) {
      const splitPath = route.path.split('/');
      if (splitPath[1] === currentMarket && splitPath[2] === currentLanguage) {
        return;
      }

      const strippedPath = route.path
        .replace('/' + currentMarket, '')
        .replace('/' + currentLanguage, '');
      return redirectToPath(
        '/' + currentMarket + app.localePath('index') + strippedPath,
      );
    }

    // If market is not in path, redirect to url with market in path
    if (!marketInPath) {
      return redirectToPath('/' + currentMarket + route.path);
    }

    // Check if current language is allowed on this market and redirect otherwise
    checkIfLanguageAllowed(currentMarket);
  }

  const fullUrl = $config.baseUrl + route.fullPath;
  if (!isSamePath) {
    // Dispatch page impression event
    const { name, meta, path, hash, query, params, fullPath } = route;
    store.dispatch('events/push', {
      type: 'page:impression',
      data: {
        route: { name, meta, path, hash, query, params, fullPath },
        isSSR: process.server,
        requestUrl: fullUrl,
      },
    });

    // Start global loading state
    store.dispatch('loading/start');

    // Emit route change event on $ralphBus
    app.$ralphBus.$emit('route-change');
  }
};
