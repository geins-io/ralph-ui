import { reactive, readonly } from 'vue';
import {
  defineNuxtPlugin,
  useNuxtApp,
  useRuntimeConfig,
  useI18n,
  useError,
  useRouter,
} from '#app';

const logTag = '%cRALPH';
const logStyle =
  'background-color: #e8452c; color: #FFFFFF; padding: 2px 5px; border-radius: 5px; font-weight: bold;';

export default defineNuxtPlugin((nuxtApp) => {
  const { provide, vueApp } = nuxtApp;
  const { $config } = useRuntimeConfig();
  const { $store } = useNuxtApp();
  const i18n = useI18n();
  const error = useError();
  const router = useRouter();

  // Create reactive event bus using Vue's reactivity system
  const ralphBus = reactive({});
  provide('ralphBus', readonly(ralphBus));

  const getPath = (
    path,
    market = $store.value.channel.currentMarket,
    locale = i18n.localeProperties.code,
  ) => {
    const marketPath = $config.public.marketInPath ? `/${market}` : '';
    const localePath =
      $config.public.marketInPath && i18n.localePath(path, locale) === '/'
        ? ''
        : i18n.localePath(path, locale);
    return marketPath + localePath;
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
