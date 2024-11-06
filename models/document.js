import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema({
  sitePhotoPaths: [String],
  surveyReportPaths: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Documents = mongoose.model('Documents', DocumentSchema);