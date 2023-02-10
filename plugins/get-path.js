export default ({ $config, store, app }, inject) => {
  const getPath = path => {
    const market = $config.marketInPath ? `/${store.state.marketId}` : '';
    const newPath = market + app.localePath(path);
    return newPath;
  };

  inject('getPath', getPath);
};
