require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint cek e-wallet
app.post('/check', async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ error: "Nomor HP diperlukan" });
    }

    try {
        const response = await axios.post(
            'https://api.durianpay.id/snap/disbursement/check',
            {
                phone_number: phoneNumber
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.DURIANPAY_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: "Terjadi kesalahan saat memeriksa akun" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
