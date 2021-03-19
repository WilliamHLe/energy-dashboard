import mongoose, { Document, Schema } from 'mongoose';
import { IBuilding } from '../buildings/buildings.model'

const etcurvesSchema = new Schema({
  building: {
    type: Schema.Types.ObjectId,
    ref: 'Building',
  },
  etcurves: [{
    fromDate: String,
    dx1: Number,
    dx2: Number,
    dx3: Number,
    dx4: Number,
    dx5: Number,
    dx6: Number,
    dy1: Number,
    dy2: Number,
    dy3: Number,
    dy4: Number,
    dy5: Number,
    dy6: Number,
    etxmin: Number,
    etxmax: Number,
    eymin: Number,
    etymax: Number,
    baseLoad: Number,
    etcolor: String,
    description: String,
  }],
}, {
  collection: 'etcurves',
});

interface IEtcurveObjectTypes {
  fromDate: string;
  dx1: number;
  dx2: number;
  dx3: number;
  dx4: number;
  dx5: number;
  dx6: number;
  dy1: number;
  dy2: number;
  dy3: number;
  dy4: number;
  dy5: number;
  dy6: number;
  etxmin: number;
  etxmax: number;
  eymin: number;
  etymax: number;
  baseLoad: number;
  etcolor: string;
  description: string;
}

export interface IEtcurve extends Document {
  building: IBuilding['_id'];
  etcurves: Array<IEtcurveObjectTypes>;
}

export default mongoose.model<IEtcurve>('etvurces', etcurvesSchema);
