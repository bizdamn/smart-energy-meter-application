import mongoose from 'mongoose';

const onePhaseSchema = new mongoose.Schema(
  {
    deviceName: { type: String, required: true },
    devEUI: { type: String, required: true },
    eb: { type: Number, required: true },
    dg: { type: Number, required: true },
    RelayState: { type: String, required: true },
    eb_dg_Status: { type: Number, required: true },
    // timestamp: { type: Date, required: true }
  }
);

const OnePhase01 = mongoose.models.OnePhase01 || mongoose.model('OnePhase01', onePhaseSchema,'one-phase-command01');
export default OnePhase01;
