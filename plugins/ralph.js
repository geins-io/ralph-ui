export default ({ $config, store, app, i18n }, inject) => {
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
    if (process.env.NODE_ENV === 'development') {
      const logTag = '%cRALPH';
      const logStyle =
        'background-color: #e8452c; color: #FFFFFF; padding: 2px 5px; border-radius: 5px; font-weight: bold;';

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
};
