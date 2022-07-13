import nc from 'next-connect';
import Relays from '../../../../models/Relays';
import db from '../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {

  await db.connect();
  const relay = new Relays({
    devEUI: req.body.devEUI,
    realName: req.body.realName,
    relayStatus: req.body.relayStatus,
    relayName: req.body.relayName,
    machineName: req.body.machineName,
    areaName: req.body.areaName,
    deviceName: req.body.deviceName,
    controlParameter: req.body.controlParameter
  });
  const relayResponse = await relay.save();
  await db.disconnect();
  res.send(relayResponse);
});

export default handler;
