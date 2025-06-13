import {User} from './models/User.js';
import bcrypt from 'bcrypt';

export async function createDefaultAdmin() {
  const existingAdmin = await User.findOne({ role: 'admin' });
  if (existingAdmin) {
    console.log('Admin dejà existant.');
    return;
  }

  const adminName = process.env.ADMIN_NAME || 'admin';
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234';

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await User.create({
    name: adminName,
    email: adminEmail,
    password: hashedPassword,
    role: 'admin',
  });

  console.log(`Admin créer :
  email: ${adminEmail}
  password: ${adminPassword}`);
}
