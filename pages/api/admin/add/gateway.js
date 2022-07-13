import nc from 'next-connect';
import Gateways from '../../../../models/Gateways';
import db from '../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {

  await db.connect();
  const gateway = new Gateways({
    gatewayID: req.body.gatewayID,
    realName: req.body.realName,
    gatewayName: req.body.gatewayName,
  });
  const gatewayResponse = await gateway.save();
  await db.disconnect();
  res.send(gatewayResponse);
});

export default handler;
