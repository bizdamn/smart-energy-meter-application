import mongoose from 'mongoose';

const onePhaseSchema = new mongoose.Schema(
  {
    deviceName: { type: String, required: true },
    devEUI: { type: String, required: true },
    No_of_overload_check: { type: Number, required: true },
    Overload_delay_between_2_attempts: { type: Number, required: true },
    timestamp: { type: Date, required: true },
  }
);

const OnePhase03 = mongoose.models.OnePhase03 || mongoose.model('OnePhase03', onePhaseSchema,'one-phase-command03');
export default OnePhase03;
