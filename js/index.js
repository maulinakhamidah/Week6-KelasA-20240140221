document.addEventListener('DOMContentLoaded', () => {
  const statusEl = document.getElementById('status');
  const gridEl = document.getElementById('productGrid');
  const searchInput = document.getElementById('searchInput');
  const categorySelect = document.getElementById('categorySelect');

  let semuaDataKuliner = [];

  const menuKulinerDummy = [
    { nama: "Nasi Goreng Spesial", kategori: "Makanan Utama", harga: "25000", deskripsi: "Nasi goreng dengan bumbu rempah melimpah, telur mata sapi, dan kerupuk." },
    { nama: "Mie Ayam Jamur", kategori: "Makanan Utama", harga: "18000", deskripsi: "Mie kenyal disajikan dengan topping ayam cincang kecap dan jamur manis." },
    { nama: "Sate Padang", kategori: "Makanan Utama", harga: "30000", deskripsi: "Sate lidah sapi empuk dengan kuah kuning kental kaya rempah." },
    { nama: "Bebek Goreng Madura", kategori: "Makanan Utama", harga: "35000", deskripsi: "Bebek goreng garing disajikan dengan bumbu hitam pedas gurih." },
    { nama: "Gado-Gado Betawi", kategori: "Camilan", harga: "20000", deskripsi: "Sayuran segar disiram kuah kacang kental khas Betawi dengan emping." },
    { nama: "Es Dawet Ayu", kategori: "Minuman", harga: "12000", deskripsi: "Minuman santan gurih, gula jawa cair, dan cendol kenyal khas Banjarnegara." },
    { nama: "Es Kelapa Muda", kategori: "Minuman", harga: "10000", deskripsi: "Minuman kelapa murni segar penyehat tubuh di siang hari." },
    { nama: "Kue Cubit", kategori: "Camilan", harga: "15000", deskripsi: "Kue manis setengah matang topping cokelat meses dan keju." },
    { nama: "Tahu Sumedang", kategori: "Camilan", harga: "12000", deskripsi: "Tahu renyah di luar lembut di dalam lengkap dengan cabai rawit." },
    { nama: "Serabi Solo", kategori: "Camilan", harga: "14000", deskripsi: "Kue tradisional santan gurih manis bersarang dengan topping pisang/cokelat." }
  ];

  async function ambilDataKuliner() {
    try {
      statusEl.textContent = 'Memuat data kuliner...';
      
      const response = await fetch('https://dummyjson.com/products');
      
      if (!response.ok) {
        throw new Error('Gagal memuat data dari server.');
      }

      const data = await response.json();
      
      const dataDariApi = data.products.slice(0, 10).map((item, index) => {
        const kuliner = menuKulinerDummy[index % menuKulinerDummy.length];
        return {
          id: item.id + 100,
          nama: kuliner.nama,
          kategori: kuliner.kategori,
          harga: kuliner.harga,
          deskripsi: kuliner.deskripsi
        };
      });

      const dataLokal = [
        { id: 1, nama: "Rendang Padang", kategori: "Makanan Utama", harga: "35000", deskripsi: "Daging sapi empuk dengan bumbu rempah kaya khas Minang." },
        { id: 2, nama: "Soto Betawi", kategori: "Kuah / Sup", harga: "25000", deskripsi: "Soto santan gurih dengan isian daging dan jeroan sapi pilihan." },
        { id: 3, nama: "Gudeg Jogja", kategori: "Makanan Utama", harga: "20000", deskripsi: "Nangka muda manis gurih disajikan dengan krecek dan ayam." },
        { id: 4, nama: "Pempek Palembang", kategori: "Camilan", harga: "25000", deskripsi: "Olahan ikan tenggiri kenyal dengan kuah cuko asam pedas." },
        { id: 5, nama: "Sate Ayam Madura", kategori: "Makanan Utama", harga: "28000", deskripsi: "Daging ayam bakar empuk dibalur bumbu kacang gurih dan kecap." },
        { id: 6, nama: "Bakso Malang", kategori: "Kuah / Sup", harga: "18000", deskripsi: "Bakso sapi renyah disajikan dengan pangsit goreng dan tahu bakso." },
        { id: 7, nama: "Nasi Liwet Solo", kategori: "Makanan Utama", harga: "22000", deskripsi: "Nasi gurih berbumbu santan disajikan dengan suwiran ayam dan areh." },
        { id: 8, nama: "Ayam Taliwang", kategori: "Makanan Utama", harga: "32000", deskripsi: "Ayam bakar khas Lombok dengan bumbu pedas manis gurih membakar." },
        { id: 9, nama: "Rawon Surabaya", kategori: "Kuah / Sup", harga: "30000", deskripsi: "Sup daging sapi kaya rempah dengan kuah hitam khas kluwek." },
        { id: 10, nama: "Coto Makassar", kategori: "Kuah / Sup", harga: "27000", deskripsi: "Hidangan sup daging sapi tradisional dengan kuah rempah kental." },
        { id: 11, nama: "Babi Guling Bali", kategori: "Makanan Utama", harga: "40000", deskripsi: "Hidangan khas Bali dengan kulit renyah dan bumbu basa genep." },
        { id: 12, nama: "Es Cendol Dawet", kategori: "Minuman", harga: "10000", deskripsi: "Minuman segar santan, gula merah cair, dan cendol tepung beras." },
        { id: 13, nama: "Es Teler", kategori: "Minuman", harga: "15000", deskripsi: "Es serut dengan isian alpukat, nangka, kelapa muda, dan susu kental manis." },
        { id: 14, nama: "Martabak Manis", kategori: "Camilan", harga: "25000", deskripsi: "Kue tebal bersarang dengan toping cokelat, keju, dan kacang." },
        { id: 15, nama: "Lumpia Semarang", kategori: "Camilan", harga: "15000", deskripsi: "Gorengan renyah berisi rebung, telur, dan daging ayam atau udang." }
      ];

      semuaDataKuliner = [...dataLokal, ...dataDariApi];

      muatPilihanKategori(semuaDataKuliner);
      tampilkanData(semuaDataKuliner);
    } catch (error) {
      statusEl.textContent = 'Terjadi kesalahan saat memuat data: ' + error.message;
    }
  }

  function muatPilihanKategori(list) {
    categorySelect.innerHTML = '<option value="">Semua Kategori</option>';
    const kategoriUnik = [...new Set(list.map(item => item.kategori))];
    kategoriUnik.forEach(kat => {
      const option = document.createElement('option');
      option.value = kat;
      option.textContent = kat;
      categorySelect.appendChild(option);
    });
  }

  function tampilkanData(list) {
    gridEl.innerHTML = '';
    if (list.length === 0) {
      statusEl.textContent = 'Tidak ada makanan yang ditemukan.';
      return;
    }
    statusEl.textContent = '';
    
    list.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      
      card.innerHTML = `
        <h3 style="margin-top:0; color:#8B4513;">${item.nama}</h3>
        <p style="font-size:0.85rem; color:#666;">Kategori: <b>${item.kategori}</b></p>
        <p style="font-weight:bold; color:#2e7d32;">Rp ${item.harga}</p>
        <p style="font-size:0.9rem;">${item.deskripsi}</p>
      `;

      card.addEventListener('click', () => {
        alert(`Anda memilih ${item.nama}!`);
      });

      gridEl.appendChild(card);
    });
  }

  function filterKuliner() {
    const keyword = searchInput.value.toLowerCase();
    const kategoriPilihan = categorySelect.value;

    const hasilFilter = semuaDataKuliner.filter(item => {
      const cocokNama = item.nama.toLowerCase().includes(keyword);
      const cocokKategori = kategoriPilihan === '' || item.kategori === kategoriPilihan;
      return cocokNama && cocokKategori;
    });

    tampilkanData(hasilFilter);
  }

  ambilDataKuliner();

  searchInput.addEventListener('input', filterKuliner);
  categorySelect.addEventListener('change', filterKuliner);
});