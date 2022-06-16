import nc from 'next-connect';
import Organisation from '../../models/Organisation';
import db from '../../utils/db';

const handler = nc();


handler.post(async (req, res) => {
  console.log(req.body.perUnitCost)
  await db.connect();
  const org = await Organisation.updateOne({ name:'IGSCS',$set: { per_Unit_Cost: req.body.perUnitCost}});
  await db.disconnect();
  res.send({ message: 'Cost Updated Successfully' });

});

handler.get(async (req, res) => {
  await db.connect();
  const org = await Organisation.find({ name:'IGSCS'});
  await db.disconnect();
  res.send(org.per_Unit_Cost);

});

export default handler;
