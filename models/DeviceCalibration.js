import mongoose from 'mongoose';

const deviceCalibrationSchema = new mongoose.Schema(
  {
    devEUI: { type: String, required: true,unique: true},
    temprature_calibration: { type: Number, required: true },
    humidity_calibration: { type: Number, required: true },
  }
);

const DeviceCalibration = mongoose.models.DeviceCalibration || mongoose.model('DeviceCalibration', deviceCalibrationSchema,'device-calibration');
export default DeviceCalibration;
