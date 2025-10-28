import { Schema, model, models } from 'mongoose';

const ActionStatus = ['success', 'failure'];

const AuditLogSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'AutomationJob', required: true },
  timestamp: { type: Date, default: Date.now },
  actionType: { type: String, required: true },
  details: { type: Object },
  status: { type: String, enum: ActionStatus, required: true },
});

export default models.AuditLog || model('AuditLog', AuditLogSchema);
