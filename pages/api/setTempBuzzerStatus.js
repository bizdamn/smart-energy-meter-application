import nc from 'next-connect';
import Organisation from '../../models/Organisation';
import db from '../../utils/db';

const handler = nc();


handler.post(async (req, res) => {
  await db.connect();
  const org = await Organisation.updateOne({
    name:'IGSCS', $set: { FF01_I04_status: req.body.buzzerStatus}
  });
  await db.disconnect();
  res.send({ message: 'User Updated Successfully' });

});

export default handler;
