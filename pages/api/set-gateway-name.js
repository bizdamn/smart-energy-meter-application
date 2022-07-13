import nc from 'next-connect';
import Gateways from '../../models/Gateways';
import db from '../../utils/db';

const handler = nc();


handler.put(async (req, res) => {
  await db.connect();
  const findResult = await Gateways.find({ gatewayID: req.body.gatewayID })
  findResult[0].gatewayName = req.body.gatewayName
  await  findResult[0].save();
  await db.disconnect();
  res.send({ message: 'Gateway Updated Successfully' });

});
export default handler;
