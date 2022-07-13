import nc from 'next-connect';
import Devices from '../../../../models/Devices';
import db from '../../../../utils/db';

const handler = nc();


handler.put(async (req, res) => {
console.log(req.body.minHumLimit)
  await db.connect();
  const findResult = await Devices.find({devEUI:req.body.devEUI})
  findResult[0].realName = req.body.realName
  findResult[0].devName = req.body.devName
  findResult[0].maxTempLimit = req.body.maxTempLimit
  findResult[0].minTempLimit = req.body.minTempLimit
  findResult[0].maxHumLimit = req.body.maxHumLimit
  findResult[0].minHumLimit = req.body.minHumLimit
  await  findResult[0].save();
  await db.disconnect();
  res.send({ message: 'Devices Updated Successfully' });

});

export default handler;
