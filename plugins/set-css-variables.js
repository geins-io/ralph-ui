import { useNuxtApp, defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(({ useRuntimeConfig }) => {
  const { $store } = useNuxtApp();
  const { channelSettings } = useRuntimeConfig();

  const channelId = $store.channel.id;
  const currentChannelSettings = channelSettings.find(
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
});
