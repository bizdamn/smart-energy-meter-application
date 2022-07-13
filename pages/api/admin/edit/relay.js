import nc from 'next-connect';
import Relays from '../../../../models/Relays';
import db from '../../../../utils/db';

const handler = nc();


handler.put(async (req, res) => {

  await db.connect();
  const findResult = await Relays.find({devEUI:req.body.devEUI})
  findResult[0].realName = req.body.realName
  findResult[0].relayName = req.body.relayName
  findResult[0].relayStatus = req.body.relayStatus
  findResult[0].machineName = req.body.machineName
  findResult[0].areaName = req.body.areaName
  findResult[0].deviceName = req.body.deviceName
  findResult[0].controlParameter = req.body.controlParameter

  
  await  findResult[0].save();
  await db.disconnect();
  res.send({ message: 'Relays Updated Successfully' });

});

export default handler;
