document.addEventListener('DOMContentLoaded', function() {
    const prestasiGrid = document.getElementById('prestasiGrid');
    const addPrestasiBtn = document.getElementById('addPrestasiBtn');
    const prestasiModal = document.getElementById('prestasiModal');
    const prestasiForm = document.getElementById('prestasiForm');
    const closeBtn = document.querySelector('.close');

    let prestasi = JSON.parse(localStorage.getItem('prestasi')) || [];

    function renderPrestasi() {
        prestasiGrid.innerHTML = '';
        prestasi.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'prestasi-card';
            card.innerHTML = `
                <img src="${item.foto || 'https://via.placeholder.com/250'}" alt="${item.nama}">
                <div class="prestasi-info">
                    <h3>${item.nama}</h3>
                    <p>Angkatan: ${item.angkatan}</p>
                    <p>Prestasi: ${item.prestasi}</p>
                </div>
                <div class="prestasi-actions">
                    <button class="edit-btn" data-id="${index}">Edit</button>
                    <button class="delete-btn" data-id="${index}">Hapus</button>
                </div>
            `;
            prestasiGrid.appendChild(card);
        });
    }

    function savePrestasi() {
        localStorage.setItem('prestasi', JSON.stringify(prestasi));
    }

    addPrestasiBtn.addEventListener('click', () => {
        prestasiForm.reset();
        document.getElementById('prestasiId').value = '';
        prestasiModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        prestasiModal.style.display = 'none';
    });

    prestasiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('prestasiId').value;
        const nama = document.getElementById('nama').value;
        const angkatan = document.getElementById('angkatan').value;
        const prestasiValue = document.getElementById('prestasi').value;
        const foto = document.getElementById('foto').files[0];

        const reader = new FileReader();
        reader.onload = function(event) {
            const prestasiItem = {
                nama,
                angkatan,
                prestasi: prestasiValue,
                foto: event.target.result
            };

            if (id !== '') {
                prestasi[parseInt(id)] = prestasiItem;
            } else {
                prestasi.push(prestasiItem);
            }

            savePrestasi();
            renderPrestasi();
            prestasiModal.style.display = 'none';
        };

        if (foto) {
            reader.readAsDataURL(foto);
        } else {
            reader.onload();
        }
    });

    prestasiGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const id = e.target.getAttribute('data-id');
            const item = prestasi[id];
            document.getElementById('prestasiId').value = id;
            document.getElementById('nama').value = item.nama;
            document.getElementById('angkatan').value = item.angkatan;
            document.getElementById('prestasi').value = item.prestasi;
            prestasiModal.style.display = 'block';
        } else if (e.target.classList.contains('delete-btn')) {
            const id = e.target.getAttribute('data-id');
            prestasi.splice(id, 1);
            savePrestasi();
            renderPrestasi();
        }
    });

    renderPrestasi();
});