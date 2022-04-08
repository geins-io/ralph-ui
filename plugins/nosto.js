export default function({ $config }) {
  if ($config.isNostoActive) {
    (() => {
      window.nostojs =
        window.nostojs ||
        (cb => {
          (window.nostojs.q = window.nostojs.q || []).push(cb);
        });
    })();
    window.nostojs(api => api.setAutoLoad(false));
  }
}
