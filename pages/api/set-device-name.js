import nc from 'next-connect';
import Devices from '../../models/Devices';
import db from '../../utils/db';

const handler = nc();


handler.put(async (req, res) => {
  await db.connect();
  const findResult = await Devices.find({ devEUI: req.body.devEUI })
  findResult[0].devName = req.body.devName
  await  findResult[0].save();
  await db.disconnect();
  console.log(findResult[0])
  res.send({ message: 'Device Updated Successfully' });

});

export default handler;
