import Vue from 'vue';
const ralphBus = new Vue();
const logTag = '%cRALPH';
const logStyle =
  'background-color: #e8452c; color: #FFFFFF; padding: 2px 5px; border-radius: 5px; font-weight: bold;';

export default ({ $config, store, app, i18n }, inject) => {
  inject('ralphBus', ralphBus);

  const getPath = (
    path,
    market = store.state.channel.currentMarket,
    locale = i18n.localeProperties.code,
  ) => {
    const marketPath = $config.marketInPath ? `/${market}` : '';
    const localePath =
      $config.marketInPath && app.localePath(path, locale) === '/'
        ? ''
        : app.localePath(path, locale);
    const newPath = marketPath + localePath;
    return newPath;
  };

  inject('getPath', getPath);

  const ralphLog = (message, ...args) => {
    if (process.env.NODE_ENV === 'development' && process.client) {
      if (args) {
        // eslint-disable-next-line no-console
        console.log(logTag, logStyle, message, ...args);
      } else {
        // eslint-disable-next-line no-console
        console.log(logTag, logStyle, message);
      }
    }
  };

  inject('ralphLog', ralphLog);

  const ralphLogError = (message, ...args) => {
    if (args) {
      // eslint-disable-next-line no-console
      console.error(logTag, logStyle, message, ...args);
    } else {
      // eslint-disable-next-line no-console
      console.error(logTag, logStyle, message);
    }
  };

  inject('ralphLogError', ralphLogError);

  const fetchData = async (
    ctx,
    query,
    callback,
    variables = {},
    fetchPolicy = 'cache-first',
  ) => {
    const client = ctx.app.apolloProvider.defaultClient;
    return await client
      .query({
        query,
        variables,
        fetchPolicy,
      })
      .then((result) => {
        if ($config.ralphLog.all || $config.ralphLog.api) {
          ralphLog('api query', result?.data);
        }
        return callback(result);
      })
      .catch((error) => {
        ctx.error({ statusCode: error.statusCode, message: error });
      });
  };

  inject('fetchData', fetchData);

  const error404 = (ctx, path) => {
    ctx.error({
      statusCode: 404,
      message: 'Page not found',
      url: path,
    });
  };

  inject('error404', error404);

  const redirectToCanonical = (ctx, canonicalUrl) => {
    ctx.redirect({
      path: canonicalUrl,
      query: ctx.req?.query,
    });
  };

  inject('redirectToCanonical', redirectToCanonical);
};
