import nc from 'next-connect';
import TemHumEntries from '../../models/TemHumEntries';
import db from '../../utils/db';

const handler = nc();


handler.get(async (req, res) => {
    await db.connect();
    const lastEntry117a = await TemHumEntries.find({ devEUI: 'a84041c98183117a' }).sort({ _id: -1 }).limit(1)
    await db.disconnect();  
    await db.connect();
    const lastEntry7a4e = await TemHumEntries.find({ devEUI: 'a840416521837a4e' }).sort({ _id: -1 }).limit(1)
    await db.disconnect();  
    await db.connect();
    const lastEntry7a0e = await TemHumEntries.find({ devEUI: 'a8404152a1837a0e' }).sort({ _id: -1 }).limit(1)
    await db.disconnect();  
    await db.connect();
    const lastEntry7a01 = await TemHumEntries.find({ devEUI: 'a840417eb1837a01' }).sort({ _id: -1 }).limit(1)
    await db.disconnect();  
    await db.connect();
    const lastEntry79fe = await TemHumEntries.find({ devEUI: 'a84041c2718379fe' }).sort({ _id: -1 }).limit(1)
    await db.disconnect();  
    await db.connect();
    const lastEntry7a0a = await TemHumEntries.find({ devEUI: 'a84041b931837a0a' }).sort({ _id: -1 }).limit(1)
    await db.disconnect();  
    
    console.log('Latest Entries Fetched')
    res.send({
        lastEntry117a: lastEntry117a,
        lastEntry7a4e: lastEntry7a4e,
        lastEntry7a0e: lastEntry7a0e,
        lastEntry7a01: lastEntry7a01,
        lastEntry79fe: lastEntry79fe,
        lastEntry7a0a: lastEntry7a0a,
    });

});

export default handler;
