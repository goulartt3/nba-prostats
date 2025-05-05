import mongoose from 'mongoose';

const cacheSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  data: mongoose.Schema.Types.Mixed,
  lastUpdated: { type: Date, default: Date.now }
});

const Cache = mongoose.model('Cache', cacheSchema);

export async function updateCache(key, data) {
  await Cache.findOneAndUpdate(
    { key },
    { data, lastUpdated: new Date() },
    { upsert: true }
  );
}

export async function getCachedData(key, maxAgeMinutes = 10) {
  const doc = await Cache.findOne({ key });
  if (!doc) return null;
  
  const age = (Date.now() - doc.lastUpdated) / 60000;
  return age <= maxAgeMinutes ? doc.data : null;
}