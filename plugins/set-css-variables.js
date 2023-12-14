export default ({ store, $config }) => {
  const channelId = store.state.channel.id;
  const currentChannelSettings = $config.channelSettings.find(
    (i) => i.channelId === channelId,
  );
  const currentTheme = currentChannelSettings?.theme || null;

  if (!currentTheme) {
    return;
  }

  Object.keys(currentTheme).forEach((setting) => {
    document.documentElement.style.setProperty(
      `--${setting}`,
      currentTheme[setting],
    );
  });
};
