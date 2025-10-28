document.getElementById('checkBtn').addEventListener('click', async () => {
    const phoneNumber = document.getElementById('phone').value.trim();
    const resultEl = document.getElementById('result');
    const loadingEl = document.getElementById('loading');

    resultEl.classList.add('d-none');
    resultEl.textContent = '';

    if (!phoneNumber) {
        alert("Masukkan nomor HP!");
        return;
    }

    loadingEl.style.display = 'block';

    try {
        const response = await fetch('/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber })
        });

        const data = await response.json();
        loadingEl.style.display = 'none';

        if (data && data.status === 'success' && data.account_name) {
            resultEl.className = 'alert alert-success';
            resultEl.textContent = `Nama Akun: ${data.account_name}`;
        } else {
            resultEl.className = 'alert alert-danger';
            resultEl.textContent = `Nomor HP tidak valid atau akun tidak ditemukan`;
        }

        resultEl.classList.remove('d-none');

    } catch (err) {
        loadingEl.style.display = 'none';
        resultEl.className = 'alert alert-danger';
        resultEl.textContent = "Terjadi kesalahan: " + err.message;
        resultEl.classList.remove('d-none');
    }
});
