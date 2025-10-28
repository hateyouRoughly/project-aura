import { Schema, model, models } from 'mongoose';

const JobStatus = ['pending', 'running', 'completed', 'failed'];

const AutomationJobSchema = new Schema({
  userId: { type: String, required: true },
  credentialId: { type: Schema.Types.ObjectId, ref: 'Credential' },
  userGoal: { type: String, required: true },
  startUrl: { type: String, required: true },
  status: { type: String, enum: JobStatus, default: 'pending' },
  startedAt: { type: Date },
  completedAt: { type: Date },
});

export default models.AutomationJob || model('AutomationJob', AutomationJobSchema);
