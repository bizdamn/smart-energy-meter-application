import mongoose from 'mongoose';

const relays = new mongoose.Schema(
  {
    devEUI: { type: String, unique: true},
    relayName: { type: String, unique: true},
    realName: { type: String},
    relayStatus: { type: Boolean },
    machineName: { type: String},
    deviceName: { type: String},
    controlParameter: { type: String},
    areaName: { type: String}
  }
);

const Relays = mongoose.models.Relays || mongoose.model('Relays', relays,'relays');
export default Relays;
