// import Joi from 'joi';
// import mongoose, { Schema, Document } from 'mongoose';
// import shortId from 'shortid';

// export interface IShortUrl extends Document {
//   fullUrl: string;
//   short: string;
//   clicks: number;
//   createAt: Date;
//   lastUpdateAt: Date;
// }

// const shortUrlSchema: Schema<IShortUrl> = new Schema<IShortUrl>({
//   fullUrl: {
//     type: String,
//     required: true,
//   },
//   short: {
//     type: String,
//     required: true,
//     default: shortId.generate,
//   },
//   clicks: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   createAt: {
//     type: Date,
//     default: Date.now,
//   },
//   lastUpdateAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Define Joi schema for validation
// const shortUrlJoiSchema = Joi.object<IShortUrl>({
//   fullUrl: Joi.string().required(),
//   short: Joi.string().required(),
//   clicks: Joi.number().required(),
//   createAt: Joi.date(),
//   lastUpdateAt: Joi.date(),
// });

// // Pre-save middleware to validate the data using Joi
// shortUrlSchema.pre<IShortUrl>('save', async function (next) {
//   try {
//     await shortUrlJoiSchema.validateAsync(this.toObject());
//     next();
//   } catch (error) {
//     next();
//   }
// });

// // export default mongoose.model<IShortUrl>('shortUrl', shortUrlSchema);
