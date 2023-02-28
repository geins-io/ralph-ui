export default ({ $config, store, app, i18n }, inject) => {
  const getPath = (
    path,
    market = store.state.channel.currentMarket,
    locale = i18n.localeProperties.code
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
};
