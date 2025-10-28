document.getElementById('checkBtn').addEventListener('click', async () => {
    const phoneNumber = document.getElementById('phone').value.trim();
    const resultEl = document.getElementById('result');

    if (!phoneNumber) {
        alert("Masukkan nomor HP!");
        return;
    }

    resultEl.textContent = "Memeriksa...";

    try {
        const response = await fetch('/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber })
        });

        const data = await response.json();
        resultEl.textContent = JSON.stringify(data, null, 2);
    } catch (err) {
        resultEl.textContent = "Terjadi kesalahan: " + err.message;
    }
});
