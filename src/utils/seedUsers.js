import mongoose from 'mongoose';
import User from '../models/User.js';
import Role from '../models/Role.js';
import bcrypt from 'bcrypt';

const seedUsers = async () => {
    try {
        const adminRole = await Role.findOne({ name: 'admin' });
        if (!adminRole) {
            console.error('El rol de admin no existe, ejecuta seedRoles primero.');
            return;
        }

        const count = await User.countDocuments({ roles: adminRole._id });

        if (count === 0) {
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10', 10);
            const hashedPassword = await bcrypt.hash('Admin@123', saltRounds);

            await User.create({
                email: 'admin@tecsup.edu.pe',
                password: hashedPassword,
                roles: [adminRole._id],
                name: 'Super',
                lastName: 'Admin',
                phoneNumber: '999999999',
                birthdate: new Date('1990-01-01'),
                url_profile: '',
                address: 'Calle Falsa 123'
            });
            console.log('Usuario admin creado exitosamente.');
        } else {
            console.log('El usuario admin ya existe.');
        }
    } catch (error) {
        console.error('Error al poblar los usuarios:', error);
    }
};

export default seedUsers;
