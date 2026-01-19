const cards = document.getElementById('cards');
const reloadBtn = document.getElementById('reload');

reloadBtn.addEventListener('click', loadUsers);

async function loadUsers() {
  cards.innerHTML = '<p>Cargando personas…</p>';
  try {
    const res = await fetch('/api/users');
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const { data } = await res.json();
    renderCards(data);
  } catch (err) {
    cards.innerHTML = `<p style="color:#fca5a5">Error al cargar: ${err.message}</p>`;
  }
}

function renderCards(users) {
  const html = users.map(u => `
    <article class="card">
      <img src="${u.photo}" alt="Foto de ${u.name}" />
      <div>
        <h2>${u.name}</h2>
        <p><strong>Género:</strong> ${u.gender}</p>
        <p><strong>Ubicación:</strong> ${u.location}</p>
        <p><strong>Email:</strong> <a href="mailto:${u.email}">${u.email}</a></p>
        <p class="dob"><strong>Fecha de nacimiento:</strong> ${formatDate(u.dob)}</p>
      </div>
    </article>
  `).join('');
  cards.innerHTML = html;
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });
}

loadUsers();