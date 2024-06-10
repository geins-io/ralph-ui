import {
  defineNuxtPlugin,
  useNuxtApp,
  useRuntimeConfig,
  useError,
  useRouter,
} from '#app';

const logTag = '%cRALPH';
const logStyle =
  'background-color: #e8452c; color: #FFFFFF; padding: 2px 5px; border-radius: 5px; font-weight: bold;';

export default defineNuxtPlugin((nuxtApp) => {
  const { provide, vueApp } = nuxtApp;
  console.log('🚀 ~ defineNuxtPlugin ~ vueApp:', vueApp);
  const { nuxt2Context } = useNuxtApp();
  const { store, i18n, localePath } = nuxt2Context.app;
  const $config = useRuntimeConfig();

  const error = useError();
  const router = useRouter();

  const getPath = (
    path,
    market = store?.channel?.currentMarket || 'se',
    locale = i18n?.localeProperties?.code || 'sv',
  ) => {
    const marketPath = $config.public.marketInPath ? `/${market}` : '';
    const locPath =
      $config.public.marketInPath && localePath(path, locale) === '/'
        ? ''
        : localePath(path, locale);
    return marketPath + locPath;
  };

  provide('getPath', getPath);

  const ralphLog = (message, ...args) => {
    if ($config.public.ralphLog.onlyInClient && process.server) {
      return;
    }
    console.log(logTag, logStyle, message, ...args);
  };

  provide('ralphLog', ralphLog);

  const ralphLogError = (message, ...args) => {
    console.error(logTag, logStyle, message, ...args);
  };

  provide('ralphLogError', ralphLogError);

  const fetchData = async (
    query,
    callback,
    variables = {},
    fetchPolicy = 'cache-first',
  ) => {
    const apolloClient =
      vueApp.config.globalProperties.$apolloProvider.defaultClient;
    try {
      const result = await apolloClient.query({
        query,
        variables,
        fetchPolicy,
      });
      if ($config.public.ralphLog.all || $config.public.ralphLog.api) {
        ralphLog('api query', result?.data);
      }
      return callback(result);
    } catch (err) {
      error({ statusCode: err.statusCode, message: err });
    }
  };

  provide('fetchData', fetchData);

  const error404 = (path) => {
    error({ statusCode: 404, message: 'Page not found', url: path });
  };

  provide('error404', error404);

  const redirectToCanonical = (canonicalUrl, query) => {
    router.replace({ path: canonicalUrl, query });
  };

  provide('redirectToCanonical', redirectToCanonical);
});
