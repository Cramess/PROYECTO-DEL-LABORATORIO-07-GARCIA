import express from 'express';

const router = express.Router();

router.get('/signIn', (req, res) => {
    res.render('signIn', { title: 'Iniciar Sesión' });
});

router.get('/signUp', (req, res) => {
    res.render('signUp', { title: 'Registrarse' });
});

router.get('/profile', (req, res) => {
    res.render('profile', { title: 'Mi Cuenta' });
});

router.get('/dashboard/user', (req, res) => {
    res.render('userDashboard', { title: 'Dashboard Usuario' });
});

router.get('/dashboard/admin', (req, res) => {
    res.render('adminDashboard', { title: 'Dashboard Administrador' });
});

router.get('/403', (req, res) => {
    res.status(403).render('403', { title: 'Acceso Denegado' });
});

router.get('/404', (req, res) => {
    res.status(404).render('404', { title: 'No Encontrado' });
});

// Redirigir la raíz a signIn o dashboard (se hará desde cliente, pero por ahora a signIn)
router.get('/', (req, res) => {
    res.redirect('/signIn');
});

// Cualquier otra ruta va a 404
router.use((req, res) => {
    res.redirect('/404');
});

export default router;
