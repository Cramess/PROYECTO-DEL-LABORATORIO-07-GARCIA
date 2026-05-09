import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import webRoutes from './routes/web.routes.js';
import seedRoles from './utils/seedRoles.js';
import seedUsers from './utils/seedUsers.js';
import path from 'path';

dotenv.config();

console.log('=== INICIANDO APP ===');

process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION:', err);
});

console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI EXISTS:', !!process.env.MONGODB_URI);
console.log('JWT_SECRET EXISTS:', !!process.env.JWT_SECRET);

const app = express();

// Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'src/views'));

// Habilitar CORS para todos
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Validar estado del servidor
app.get('/health', (req, res) => {
    res.status(200).json({ ok: true });
});

// Rutas Web
app.use('/', webRoutes);

// Manejador global de errores
app.use((err, req, res, next) => {

    console.error('GLOBAL ERROR:', err);

    res.status(err.status || 500).json({
        message: err.message || 'Error interno del servidor'
    });

});

const PORT = process.env.PORT || 3000;

console.log('Conectando a MongoDB...');

mongoose.connect(process.env.MONGODB_URI, {
    autoIndex: true
})
.then(async () => {

    console.log('Mongo connected');

    try {

        console.log('Ejecutando seedRoles...');
        await seedRoles();

        console.log('Ejecutando seedUsers...');
        await seedUsers();

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

    } catch (seedError) {

        console.error('ERROR EN SEEDS:', seedError);

    }

})
.catch(err => {

    console.error('Error al conectar con Mongo:', err);

    process.exit(1);

});