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
    ref: 'category',
  },
}, {
  collection: 'buildings',
});

export interface IBuilding extends Document{
  name: string
}

export default mongoose.model<IBuilding>('Building', BuildingSchema);
