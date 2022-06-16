import mongoose from 'mongoose';

const organisationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    logo: { type: String, required: true },
    FF01_I05_status: { type: Boolean, required: true },
    FF01_I04_status: { type: Boolean, required: true }
  }
);

const Organisation = mongoose.models.Organisation || mongoose.model('Organisation', organisationSchema,'organisation');
export default Organisation;
