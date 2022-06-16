import nc from 'next-connect';
import DeviceRelayStatus from '../../models/DeviceRelayStatus';

import db from '../../utils/db';

const handler = nc();


handler.get(async (req, res) => {
  await db.connect();
  const relay79B6 = await DeviceRelayStatus.find({devEUI:'506f9800000079b6'});
  const relayA448 = await DeviceRelayStatus.find({devEUI:'506f98000000a448'});
  await db.disconnect();
  res.send({ Relay79B6_status:relay79B6[0].relayStatus,RelayA448_status:relayA448[0].relayStatus});

});

export default handler;
