import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import bcrypt from 'bcryptjs';

dotenv.config();

async function testPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find the admin
    const admin = await Admin.findOne({ email: 'admin@leadgen.com' }).select('+password');
    console.log('Admin found:', admin?.name, admin?.email);
    console.log('Password hash:', admin?.password);

    // Test password comparison
    const testPassword = 'admin@123';
    console.log('\nTesting password:', testPassword);

    const isMatch = await bcrypt.compare(testPassword, admin.password);
    console.log('Password matches:', isMatch);

    // Also test using the schema method
    const isMatchMethod = await admin.comparePassword(testPassword);
    console.log('Password matches (via schema method):', isMatchMethod);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

testPassword();
