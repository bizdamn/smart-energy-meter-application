import nc from 'next-connect';
import Relays from '../../../models/Relays';
import db from '../../../utils/db';

const handler = nc();


handler.put(async (req, res) => {
  await db.connect();
  const findResult = await Relays.find({ devEUI: req.body.devEUI })
  findResult[0].machineName = req.body.machineName
  await  findResult[0].save();
  await db.disconnect();
  res.send({ message: 'Relay Updated Successfully' });

});

export default handler;
