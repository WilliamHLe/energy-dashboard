import mongoose, { Document, Schema } from 'mongoose';
import { IBuilding } from './buildings.model';

const SensorSchema:Schema = new Schema({
  description: {
    type: String,
  },
  measurement: {
    type: Object,
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
  measurements: [{
    date: Date,
    measurement: Number,
  }],
}, {
  collection: 'sensors',
});

interface IMeasurementsObjectTypes {
    date: Date;
    measurement:number;
}

export interface ISensor extends Document{
   description: string;
   measurement: string;
   name: string;
   unitOfMeasurement: string;
   building: IBuilding['_id'];
   measurements: Array<IMeasurementsObjectTypes>;
 }

export default mongoose.model<ISensor>('Sensor', SensorSchema);
