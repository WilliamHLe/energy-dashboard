import mongoose, { Document, Schema } from 'mongoose';
import { IBuilding } from '../buildings/buildings.model.ts';

const SensorSchema:Schema = new Schema({
  description: {
    type: String,
  },
  measurement: {
    type: String,
  },
  name: {
    type: String,
  },
  unitOfMeasurement: {
    type: String,
  },
  type: {
    type: String,
  },
  building: {
    type: Schema.Types.ObjectId,
    ref: 'Building',
  },
  measurements: [String],
}, {
  collection: 'sensors',
});

export interface ISensor extends Document{
   description: string;
   measurement: string;
   name: string;
   unitOfMeasurement: string;
   building: IBuilding['_id'];
   measurements: Array<String>;
 }

export default mongoose.model<ISensor>('Sensor', SensorSchema);
