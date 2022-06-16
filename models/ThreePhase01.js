import mongoose from 'mongoose';

const threePhaseSchema = new mongoose.Schema(
  {
    deviceName: { type: String, required: true },
    devEUI: { type: String, required: true },
    eb: { type: Number, required: true },
    dg: { type: Number, required: true },
    RelayState: { type: String, required: true },
    eb_dg_Status: { type: Number, required: true },
    timestamp: { type: Date, required: true },
  }
);

const ThreePhase01 = mongoose.models.ThreePhase01 || mongoose.model('ThreePhase01', threePhaseSchema,'three-phase-command01');
export default ThreePhase01;
