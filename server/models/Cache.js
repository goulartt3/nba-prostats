import mongoose from 'mongoose';

const cacheSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

export const Cache = mongoose.model('Cache', cacheSchema);

export const updateCache = async (key, data) => {
  await Cache.findOneAndUpdate(
    { key },
    { data, lastUpdated: new Date() },
    { upsert: true }
  );
};

export const getCachedData = async (key, maxAgeMinutes = 10) => {
  const result = await Cache.findOne({ key });
  if (!result) return null;

  const ageInMinutes = (Date.now() - result.lastUpdated) / (1000 * 60);
  return ageInMinutes <= maxAgeMinutes ? result.data : null;
};