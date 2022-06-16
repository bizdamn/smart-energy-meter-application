import mongoose from 'mongoose';

const deviceRealySchema = new mongoose.Schema(
  {
    devEUI: { type: String, unique: true},
    relayStatus: { type: Boolean },
  }
);

const DeviceRealyStatus = mongoose.models.DeviceRealyStatus || mongoose.model('DeviceRealyStatus', deviceRealySchema,'device-relay-status');
export default DeviceRealyStatus;
