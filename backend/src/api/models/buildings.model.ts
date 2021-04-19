import mongoose, { Schema, Document } from 'mongoose';

const BuildingSchema: Schema = new Schema({
  name: {
    type: String,
  },
  year: {
    type: Number,
  },
  area: {
    type: Number,
  },
  categoryIdEsave: {
    type: Number,
  },
  categoryDescription: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
}, {
  collection: 'buildings',
});

export interface IBuilding extends Document{
  name: string;
  year: number;
  area: number;
  categoryIdESave: number;
  categoryDescription: string;
  category: string;
  tek?: string
  energyLabel?: string
}

export default mongoose.model<IBuilding>('Building', BuildingSchema);
