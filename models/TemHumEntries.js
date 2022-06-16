import mongoose from 'mongoose';

const entriesSchema = new mongoose.Schema(
  {
    deviceName: { type: String, required: true },
    devEUI: { type: String, required: true },
    temprature: { type: String, required: true },
    humidity: { type: String, required: true },
    timestamp: { type: Date, required: true },
  }
);

const TemHumEntries = mongoose.models.TemHumEntries || mongoose.model('TemHumEntries', entriesSchema,'temp-humidity-entries');
export default TemHumEntries;
