import mongoose, { Schema, Document } from 'mongoose';

export interface IApiToken extends Document {
  userId: string;
  name: string;
  hashedToken: string;
  createdAt: Date;
  lastUsedAt: Date | null;
}

const ApiTokenSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  hashedToken: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastUsedAt: { type: Date, default: null },
});

export default mongoose.models.ApiToken || mongoose.model<IApiToken>('ApiToken', ApiTokenSchema);
