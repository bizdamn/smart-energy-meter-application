import nc from 'next-connect';
import Devices from '../../../../models/Devices';
import db from '../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {

  await db.connect();
  const device = new Devices({
    devEUI: req.body.devEUI,
    realName: req.body.realName,
    devName: req.body.devName,
    maxHumLimit: req.body.maxHumLimit,
    minHumLimit: req.body.minHumLimit,
    maxTempLimit: req.body.maxTempLimit,
    minTempLimit: req.body.minTempLimit
  });
  const deviceResponse = await device.save();
  await db.disconnect();

  res.send(deviceResponse);
});

export default handler;
