document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nama = document.getElementById('nama').value.trim();
  const harga = document.getElementById('harga').value.trim();
  const template = document.getElementById('template').value;
  const errorNama = document.getElementById('nama-error');
  const errorHarga = document.getElementById('harga-error');
  
  errorNama.textContent = '';
  errorHarga.textContent = '';
  
  let isValid = true;
  if (!nama) {
    errorNama.textContent = 'Nama makanan wajib diisi!';
    isValid = false;
  }
  if (!harga) {
    errorHarga.textContent = 'Kisaran harga wajib diisi!';
    isValid = false;
  }
  
  if (!isValid) return;

  let hasilTemplate = '';
  if (template === 'sangat-enak') {
    hasilTemplate = `Wah, baru saja mencicipi ${nama} dengan kisaran harga Rp ${harga}. Rasanya bener-bener Sangat Enak & Autentik! Recommended banget buat dicoba. 🤤👍`;
  } else if (template === 'bumbu-khas') {
    hasilTemplate = `Mencoba ${nama} seharga Rp ${harga}. Asli, Bumbu Rempahnya Berasa Banget di lidah, khas masakan nusantara sejati! 🌿✨`;
  } else if (template === 'pedas-mantap') {
    hasilTemplate = `Penggemar pedas wajib merapat! ${nama} seharga Rp ${harga} ini Pedas & Bikin Ketagihan! Mantap pol! 🔥🌶️`;
  }

  document.getElementById('caption').value = hasilTemplate;
});