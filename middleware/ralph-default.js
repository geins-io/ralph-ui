import {
  useNuxtApp,
  defineNuxtRouteMiddleware,
  useRuntimeConfig,
  useI18n,
} from '#app';

export default defineNuxtRouteMiddleware((to, from) => {
  const { $config } = useRuntimeConfig();
  const { $store, $ralphBus } = useNuxtApp();
  const i18n = useI18n();
  const isSamePath = $store.state.currentPath === to.path;

  $store.commit('setCurrentRouteName', to.name);
  $store.commit('setCurrentPath', to.path);

  if ($config.public.marketInPath) {
    let currentMarket = $store.state.channel.currentMarket;
    const marketInPath = to.params.market;
    const currentLanguage = i18n.localeProperties.code;
    const query = Object.keys(to.query).length
      ? '?' + to.fullPath.split('?')[1]
      : '';
    const hash = to.hash ? '#' + to.hash : '';

    const redirectToPath = (path) => {
      const redirectPath = path + query.replace(hash, '') + hash;
      // eslint-disable-next-line no-undef
      return navigateTo(redirectPath);
    };

    // Function to check if language is allowed for a market and redirect otherwise
    const checkIfLanguageAllowed = (market) => {
      const marketObj = $store.state.channel.markets.find(
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
        const fallbackPath = to.path.replace(currentLanguage, defaultLanguage);
        return redirectToPath(fallbackPath);
      }
    };

    // If market in path is different from current market, set current market to match
    // If market in path is not in markets, redirect to fallback market
    if (marketInPath && marketInPath !== currentMarket) {
      const marketAliases = $store.state.channel.markets.map(
        ({ alias }) => alias,
      );

      // If market exists
      if (marketAliases.includes(marketInPath)) {
        $store.dispatch('channel/setCurrentMarket', marketInPath);
        currentMarket = $store.state.channel.currentMarket;

        // Check if current language is allowed on this market and redirect otherwise
        checkIfLanguageAllowed(currentMarket);

        // Market exists and language allowed, return here
        return;
      }

      // Change to fallback market if market in path doesn't exist
      const fallbackPath = to.path.replace(
        marketInPath,
        $config.public.fallbackMarketAlias,
      );
      $store.dispatch(
        'channel/setCurrentMarket',
        $config.public.fallbackMarketAlias,
      );

      return redirectToPath(fallbackPath);
    }

    // If i18n redirects wrong, redirect to correct path
    if (to.path === '/' + currentLanguage + '/' + currentMarket) {
      return redirectToPath('/' + currentMarket + '/' + currentLanguage);
    }

    // If no route matching, strip path from market, rebuild it and redirect
    if (!to.name) {
      const splitPath = to.path.split('/');
      if (splitPath[1] === currentMarket && splitPath[2] === currentLanguage) {
        return;
      }

      const strippedPath = to.path
        .replace('/' + currentMarket, '')
        .replace('/' + currentLanguage, '');
      return redirectToPath(
        '/' + currentMarket + i18n.localePath('index') + strippedPath,
      );
    }

    // If market is not in path, redirect to url with market in path
    if (!marketInPath) {
      return redirectToPath('/' + currentMarket + to.path);
    }

    // Check if current language is allowed on this market and redirect otherwise
    checkIfLanguageAllowed(currentMarket);
  }

  const fullUrl = $config.public.baseUrl + to.fullPath;
  if (!isSamePath) {
    // Dispatch page impression event
    const { name, meta, path, hash, query, params, fullPath } = to;
    $store.dispatch('events/push', {
      type: 'page:impression',
      data: {
        route: { name, meta, path, hash, query, params, fullPath },
        isSSR: process.server,
        requestUrl: fullUrl,
      },
    });

    // Start global loading state
    $store.dispatch('loading/start');

    // Emit route change event on $ralphBus
    $ralphBus.$emit('route-change');
  }
});
