import nc from 'next-connect';
import DeviceRelayStatus from '../../models/DeviceRelayStatus';
import db from '../../utils/db';

const handler = nc();


handler.post(async (req, res) => {
  // console.log(req.body.device_eui)
  // console.log(req.body.relayStatus)
  await db.connect();
  const relay = await DeviceRelayStatus.find({
    devEUI:req.body.device_eui
  });
  relay[0].relayStatus=req.body.relayStatus;
  await relay[0].save();
  await db.disconnect();
  // console.log(relay[0])
  res.send({ message: 'Updated Successfully' });

});

export default handler;
