import mongoose, { Schema, Document } from 'mongoose';

const BuildingSchema:Schema = new Schema({
  name: {
    type: String,
  },
}, {
  collection: 'buildings',
});

export interface IBuilding extends Document{
  name: string
}
export default mongoose.model<IBuilding>('Building', BuildingSchema);