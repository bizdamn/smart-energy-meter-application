import mongoose from 'mongoose';

const gatewaysSchema = new mongoose.Schema(
  {
    gatewayID: { type: String, required: true,unique: true},
    realName: { type: String, required: true,unique: true },
    gatewayName: { type: String, required: true},
  }
);

const Gateways = mongoose.models.Gateways || mongoose.model('Gateways', gatewaysSchema,'gateways');
export default Gateways;
