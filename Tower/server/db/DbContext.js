import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { TowerEventSchema } from '../models/TowerEvents';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  TowerEvents = mongoose.model('Project', TowerEventSchema);
  
}

export const dbContext = new DbContext()
