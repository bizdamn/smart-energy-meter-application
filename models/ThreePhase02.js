import mongoose from 'mongoose';

const threePhaseSchema = new mongoose.Schema(
  {
    deviceName: { type: String, required: true },
    devEUI: { type: String, required: true },
    frequency: { type: Number, required: true },
    voltage_red: { type: Number, required: true },
    voltage_yellow: { type: Number, required: true },
    voltage_blue: { type: Number, required: true },
    current_red: { type: Number, required: true },
    current_yellow: { type: Number, required: true },
    current_blue: { type: Number, required: true },
    power_factor: { type: Number, required: true },
    timestamp: { type: Date, required: true },
  }
);

const ThreePhase02 = mongoose.models.ThreePhase02 || mongoose.model('ThreePhase02', threePhaseSchema,'three-phase-command02');
export default ThreePhase02;
