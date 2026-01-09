import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Client from './models/Client.js';
import Admin from './models/Admin.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/lead-generation';

const projectsData = [
  {
    name: 'Real Estate Platform',
    description: 'A comprehensive web platform for buying, selling, and renting properties with advanced search filters and virtual tours.',
    image: '/public/images/young-couple-examining-blueprints-with-real-estate-agent-while-buying-new-home 1.svg',
    category: 'Web Development'
  },
  {
    name: 'Team Collaboration Suite',
    description: 'Enterprise-level collaboration tool designed for remote teams with integrated video conferencing, document sharing, and project management.',
    image: '/public/images/pexels-fauxels-3182834.svg',
    category: 'SaaS'
  },
  {
    name: 'Business Growth Analytics',
    description: 'Advanced analytics dashboard that provides real-time insights into business metrics, customer behavior, and sales trends.',
    image: '/public/images/pexels-brett-sayles-2881232.svg',
    category: 'Analytics'
  },
  {
    name: 'Modern Office Design',
    description: 'Contemporary office space redesign featuring flexible workstations, collaborative zones, and state-of-the-art technology integration.',
    image: '/public/images/pexels-brett-sayles-2881232-1.svg',
    category: 'Interior Design'
  },
  {
    name: 'Digital Marketing Campaign',
    description: 'Full-scale digital marketing initiative including social media strategy, content creation, SEO optimization, and PPC advertising.',
    image: '/public/images/pexels-andres-ayrton-6578391.svg',
    category: 'Marketing'
  }
];

const clientsData = [
  {
    name: 'Sarah Johnson',
    designation: 'CEO, TechStart Inc.',
    description: 'Sarah is a visionary leader with 15 years of experience in building scalable tech companies. She transformed our platform\'s architecture and vision.',
    image: '/public/images/Ellipse 11.svg'
  },
  {
    name: 'Michael Chen',
    designation: 'Product Manager, InnovateLabs',
    description: 'Michael brought exceptional product strategy and user-centric design principles to our projects, resulting in 300% user growth.',
    image: '/public/images/Ellipse 12.svg'
  },
  {
    name: 'Emily Rodriguez',
    designation: 'Operations Director, Global Solutions',
    description: 'Emily\'s operational expertise streamlined our processes and improved efficiency by 45%. A true game-changer for our organization.',
    image: '/public/images/Ellipse 13.svg'
  },
  {
    name: 'David Thompson',
    designation: 'Founder, Creative Studios',
    description: 'David\'s creative vision and innovative approach to problem-solving have been instrumental in our design excellence.',
    image: '/public/images/Ellipse 28.svg'
  },
  {
    name: 'Lisa Wang',
    designation: 'Financial Director, Enterprise Corp',
    description: 'Lisa\'s financial acumen and strategic planning helped us optimize costs while maintaining quality. A trusted advisor.',
    image: '/public/images/Ellipse 29.svg'
  },
  {
    name: 'James Morrison',
    designation: 'VP Engineering, TechVenture',
    description: 'James led our technical infrastructure upgrade, reducing system downtime by 60% and improving performance significantly.',
    image: '/public/images/Ellipse 31.svg'
  },
  {
    name: 'Amanda Foster',
    designation: 'Marketing Head, BrandWorks',
    description: 'Amanda\'s marketing strategies increased our brand visibility and customer engagement across all channels.',
    image: '/public/images/Ellipse 33.svg'
  },
  {
    name: 'Christopher Lee',
    designation: 'Consultant, Business Growth Partners',
    description: 'Christopher provided invaluable strategic guidance that helped us scale to new markets and double our revenue.',
    image: '/public/images/Ellipse 35.svg'
  },
  {
    name: 'Victoria Harris',
    designation: 'HR Manager, People First Inc.',
    description: 'Victoria built a strong company culture and recruited top talent that transformed our team dynamics and productivity.',
    image: '/public/images/Rectangle.svg'
  },
  {
    name: 'Robert Williams',
    designation: 'Sales Director, Revenue Solutions',
    description: 'Robert\'s sales expertise and relationship-building skills resulted in a 250% increase in enterprise clients within one year.',
    image: '/public/images/pexels-brett-sayles-2881232-2.svg'
  }
];

const adminData = [
  {
    name: 'Super Admin',
    email: 'admin@leadgen.com',
    password: 'admin@123',
    role: 'super-admin'
  },
  {
    name: 'Admin User',
    email: 'user@leadgen.com',
    password: 'user@123',
    role: 'admin'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Client.deleteMany({});
    await Admin.deleteMany({});
    console.log('🧹 Cleared existing data');

    // Seed projects
    const createdProjects = await Project.insertMany(projectsData);
    console.log(`✅ Seeded ${createdProjects.length} projects`);

    // Seed clients
    const createdClients = await Client.insertMany(clientsData);
    console.log(`✅ Seeded ${createdClients.length} clients`);

    // Seed admins - Create and save individually to ensure pre-save hooks run
    const adminUsers = [];
    for (const admin of adminData) {
      const adminDoc = new Admin(admin);
      await adminDoc.save();
      adminUsers.push(adminDoc);
    }
    console.log(`✅ Seeded ${adminUsers.length} admin users`);

    console.log('\n✨ Database seeding completed successfully!');
    console.log(`📊 Total: ${createdProjects.length} projects, ${createdClients.length} clients, and ${adminUsers.length} admin users added`);
    console.log('\n📋 Admin Credentials:');
    console.log('----------------------------');
    console.log('Super Admin:');
    console.log('  Email: admin@leadgen.com');
    console.log('  Password: admin@123');
    console.log('----------------------------');
    console.log('Admin User:');
    console.log('  Email: user@leadgen.com');
    console.log('  Password: user@123');
    console.log('----------------------------');

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

seedDatabase();
