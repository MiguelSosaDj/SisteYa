// pages/api/register.js
export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();

            res.status(response.status).json(data);
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

