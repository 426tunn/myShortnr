import Joi from 'joi';
import mongoose, { Schema, Document } from 'mongoose';
import shortId from 'shortid';

export interface IShortUrl extends Document {
  fullUrl: string;
  short: string;
  clicks: number;
  createAt: Date;
  lastUpdateAt: Date;
  user: mongoose.Types.ObjectId;
}

const shortUrlSchema: Schema<IShortUrl> = new Schema<IShortUrl>(
  {
  fullUrl: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    default: shortId.generate,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, { timestamps: true });

// Define Joi schema for validation
 export const shortUrlJoiSchema = Joi.object<IShortUrl>({
  fullUrl: Joi.string().required()
});

// Pre-save middleware to validate the data using Joi
shortUrlSchema.pre<IShortUrl>('save', async function (next) {
  try {
    await shortUrlJoiSchema.validateAsync(this.toObject());
    next();
  } catch (error) {
    next();
  }
});

export default mongoose.model<IShortUrl>('shortUrl', shortUrlSchema);
