import nc from 'next-connect';
import Relays from '../../models/Relays';
import db from '../../utils/db';

const handler = nc();


handler.put(async (req, res) => {
  console.log(req.body.relayName)
  await db.connect();
  const findResult = await Relays.find({ devEUI: req.body.devEUI })
  findResult[0].relayName = req.body.relayName
  await  findResult[0].save();
  await db.disconnect();
  res.send({ message: 'Device Updated Successfully' });

});

export default handler;
