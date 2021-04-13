import mongoose, { Schema, Document } from 'mongoose';

const CategorySchema: Schema = new Schema({
  name: {
    type: String,
  },
}, {
  collection: 'categories',
});

export interface ICategory extends Document{
  name: string
}

export default mongoose.model<ICategory>('Category', CategorySchema);
