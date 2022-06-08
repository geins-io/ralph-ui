export default ({ req, store }) => {
  const headers = req?.headers ? Object.assign({}, req.headers) : {};
  store.commit(
    'setChannelId',
    headers['x-channelid'] || process.env.FALLBACK_CHANNEL_ID
  );
};
