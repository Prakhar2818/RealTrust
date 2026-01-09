import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lead-generation';

async function checkAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const admins = await Admin.find({});
    console.log('\n📋 Admins in database:');
    console.log('----------------------------');
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. Name: ${admin.name}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Role: ${admin.role}`);
      console.log('----------------------------');
    });

    if (admins.length === 0) {
      console.log('❌ No admins found! Run seed.js first.');
    } else {
      console.log(`✅ Found ${admins.length} admin(s)`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
}

checkAdmin();
