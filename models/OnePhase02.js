import mongoose from 'mongoose';

const onePhaseSchema = new mongoose.Schema(
  {
    deviceName: { type: String, required: true },
    devEUI: { type: String, required: true },
    frequency: { type: Number, required: true },
    voltage: { type: Number, required: true },
    current: { type: Number, required: true },
    power_factor: { type: Number, required: true },
    kVA_Load: { type: Number, required: true },
    kW_Load: { type: Number, required: true },
    timestamp: { type: Date, required: true },
  }
);

const OnePhase02 = mongoose.models.OnePhase02 || mongoose.model('OnePhase02', onePhaseSchema,'one-phase-command02');
export default OnePhase02;
