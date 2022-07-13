import nc from 'next-connect';
import Organisation from '../../../models/Organisation';
import db from '../../../utils/db';

const handler = nc();


handler.put(async (req, res) => {
  console.log(req.body.tagline)
  await db.connect();
  const findResult = await Organisation.find()
  findResult[0].name = req.body.name
  // findResult[0].logo = req.body.logo
  findResult[0].tagline = req.body.tagline
  findResult[0].perUnitCost = req.body.perUnitCost
  await  findResult[0].save();
  await db.disconnect();
  console.log(findResult[0])
  res.send({ message: 'Organisation Updated Successfully' });

});

export default handler;
