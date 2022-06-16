import mongoose from 'mongoose';

const threePhaseSchema = new mongoose.Schema(
  {
    deviceName: { type: String, required: true },
    devEUI: { type: String, required: true },
    Overload_delay_between_2_attempts: { type: Number, required: true },
    No_of_overload_check: { type: Number, required: true },
    timestamp: { type: Date, required: true },
  }
);

const ThreePhase03 = mongoose.models.ThreePhase03 || mongoose.model('ThreePhase03', threePhaseSchema,'three-phase-command03');
export default ThreePhase03;
