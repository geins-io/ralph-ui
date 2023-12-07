export default ({ store, $config }) => {
  const channelId = store.state.channel.id;
  const currentChannelSettings = $config.channelSettings.find(
    (i) => i.channelId === channelId,
  ).theme;
  Object.keys(currentChannelSettings).forEach((setting) => {
    document.documentElement.style.setProperty(
      `--${setting}`,
      currentChannelSettings[setting],
    );
  });
};
