import mongoose from 'mongoose';

const devicesSchema = new mongoose.Schema(
  {
    devEUI: { type: String, required: true,unique: true},
    realName: { type: String, required: true,unique: true },
    devName: { type: String, required: true},
    maxTempLimit: { type: Number},
    minTempLimit: { type: Number},
    maxHumLimit: { type: Number},
    minHumLimit: { type: Number}
  }
);

const Devices = mongoose.models.Devices || mongoose.model('Devices', devicesSchema,'devices');
export default Devices;
