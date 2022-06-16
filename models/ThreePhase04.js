import mongoose from 'mongoose';

const threePhaseSchema = new mongoose.Schema(
  {
    deviceName: { type: String, required: true },
    devEUI: { type: String, required: true },
    kW_Load_red: { type: Number, required: true },
    kW_Load_yellow: { type: Number, required: true },
    kW_Load_blue: { type: Number, required: true },
    kVA_Load_red: { type: Number, required: true },
    kVA_Load_yellow: { type: Number, required: true },
    kVA_Load_blue: { type: Number, required: true },
    kVAR_Load_red: { type: Number, required: true },
    kVAR_Load_yellow: { type: Number, required: true },
    kVAR_Load_blue: { type: Number, required: true },
    timestamp: { type: Date, required: true },
  }
);

const ThreePhase04 = mongoose.models.ThreePhase04 || mongoose.model('ThreePhase04', threePhaseSchema,'three-phase-command04');
export default ThreePhase04;
