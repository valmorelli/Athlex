// Application JavaScript Logic for UNLP Atletismo Prototype

let dbData = null;
let currentUser = null;
let rpeChartInstance = null;
let fileHandle = null; // Guardará la referencia al archivo local datos.json

// Estructura de contenido mock de la planilla por día
const planSemanalMock = {
    lunes: {
        titulo: "LUNES (PESAS)",
        claseHeader: "bg-intensity-lunes",
        contenido: `
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">ENTRADA EN CALOR (EC)</div>
                <p class="mb-1 small">Trote / movilidad / coordinación - 4' de planchas variadas - 50abs y 50esp.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">VELOCIDAD / ARRASTRE</div>
                <p class="mb-1 small">Arrastre 3x30m / Aceleraciones 3x30mts.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">ACTIVACIÓN</div>
                <p class="mb-1 small">Cargada pot + fza/impulso barra sola 2x4.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">PESAS</div>
                <p class="mb-1 small">Cargada de pot 70/3 75/3 80/3 85/2x2 (%).</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">FONDO / RESISTENCIA</div>
                <p class="mb-0 small"><strong>Fondistas:</strong> 30min fondo.</p>
            </div>
        `,
        notas: "Atención a la técnica en cargada de potencia. Hidratarse bien."
    },
    martes: {
        titulo: "MARTES",
        claseHeader: "bg-intensity-martes",
        contenido: `
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">ENTRADA EN CALOR (EC)</div>
                <p class="mb-1 small">Trote / Movilidad / coordinación / tertulias.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">ESPECÍFICO DE PISTA</div>
                <p class="mb-1 small"><strong>Vallistas:</strong> 200mts totales.<br><strong>Velocistas:</strong> 200mts totales (máximo 80mts).<br><strong>Corredores 400m:</strong> partidas x 100mts + 1x300 llanos.<br><strong>400cv:</strong> 3x1ra valla + 1x300cv.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">SALTOS Y REGENERATIVO</div>
                <p class="mb-1 small">Saltos y carretas completos x 8.<br><strong>Regenerativo:</strong> trote continuo 10min.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">SERIES DE RESISTENCIA</div>
                <p class="mb-0 small">2x5x300 ritmo de 1500. Micro 1' / Macro 5'. Completar 10k.</p>
            </div>
        `,
        notas: "Mantener pausas estrictas en las partidas."
    },
    miercoles: {
        titulo: "MIÉRCOLES",
        claseHeader: "bg-intensity-miercoles",
        contenido: `
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">ENTRADA EN CALOR (EC)</div>
                <p class="mb-1 small">Trote / movilidad / coordinación - 4' de planchas variadas - 50abs y 50esp.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">RITMO Y ACTIVACIÓN</div>
                <p class="mb-1 small">Frecuencia 100/120mts.<br>Arr pot + metida barra sola 2x5.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">PESAS</div>
                <p class="mb-1 small">Arranque pot 70%3 - 75%3 - 80%3 + sentadilla 1/3 (100% de la profunda) 3x3 + salto SJ 3x3 + Dominadas 20 a voluntad.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">TRANSFERENCIA Y CAMBIO DE RITMO</div>
                <p class="mb-0 small">2 rectas.<br>Cambio de ritmo 4 (suave) x 1 (rápido) - 30min.</p>
            </div>
        `,
        notas: "Enfocarse en la aceleración en los cambios de ritmo."
    },
    jueves: {
        titulo: "JUEVES",
        claseHeader: "bg-intensity-jueves",
        contenido: `
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">ENTRADA EN CALOR (EC)</div>
                <p class="mb-1 small">Trote 10min / Movilidad / rebotes de tobillos x 100mts (sintético) / coordinación / tertulias / pasajes.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">ESPECÍFICO DE VELOCIDAD</div>
                <p class="mb-1 small"><strong>Vallistas/Velocistas:</strong> Partidas x 120/150mts totales.<br><strong>Corredores de 400:</strong> 2x150 - 3x100 ritmo de 400 con 5min pausa. 400 con vallas: 3x1ra/2da/3ra + 1x200 ritmo de 400cv sin vallas.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">SALTOS Y CONTROL</div>
                <p class="mb-0 small"><strong>Saltadores:</strong> Saltos completos x 3 - carreras completas x 3 - 3x30 velocidad.<br><strong>Test control:</strong> 2000mts.</p>
            </div>
        `,
        notas: "Control de lactato para corredores de 400m."
    },
    viernes: {
        titulo: "VIERNES",
        claseHeader: "bg-intensity-viernes",
        contenido: `
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">ENTRADA EN CALOR (EC)</div>
                <p class="mb-1 small">Trote / movilidad / coordinación.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">ACTIVACIÓN Y PESAS</div>
                <p class="mb-1 small">Vitalizaciones 2x10 - cargadas pot barra sola 2x5.<br>Carg pot: 60% 3x3 - arranque pot 60% 3x3.</p>
            </div>
            <div class="spreadsheet-section">
                <div class="spreadsheet-section-title">VELOCIDAD / FONDO</div>
                <p class="mb-0 small">3x60mts progresiones.<br><strong>Fondistas:</strong> Pesas / regenerativo 20min.</p>
            </div>
        `,
        notas: "Los que van al nacional, sólo activación."
    }
};

// Initialize App when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await loadInitialData();
    checkActiveSession();
    renderAthletesGrid();
});

// Cargar datos iniciales (intenta fetch por defecto)
async function loadInitialData() {
    try {
        const response = await fetch('datos.json');
        if (!response.ok) throw new Error('No se pudo cargar datos.json vía HTTP');
        dbData = await response.json();
    } catch (error) {
        console.warn('Cargando estructura por defecto...', error);
        dbData = {
            usuarios: [],
            planificacionSemanal: {},
            registrosDiarios: []
        };
    }
}

// Vincula y asegura permisos de escritura sobre datos.json en la PC
async function getFileHandle() {
    if (fileHandle) {
        const options = { mode: 'readwrite' };
        try {
            if ((await fileHandle.queryPermission(options)) === 'granted') return fileHandle;
            if ((await fileHandle.requestPermission(options)) === 'granted') return fileHandle;
        } catch (e) {
            console.warn('Error al verificar permisos:', e);
        }
    }

    try {
        [fileHandle] = await window.showOpenFilePicker({
            types: [{
                description: 'JSON Files',
                accept: { 'application/json': ['.json'] }
            }]
        });
        return fileHandle;
    } catch (err) {
        console.warn('El usuario canceló la selección de archivo.');
        return null;
    }
}

// Conexión explícita desde botón en UI
async function connectLocalJsonFile() {
    const handle = await getFileHandle();
    if (handle) {
        try {
            const file = await handle.getFile();
            const content = await file.text();
            dbData = JSON.parse(content);
            showToast('¡Archivo datos.json vinculado correctamente!');
            if (currentUser) {
                const updatedUser = dbData.usuarios.find(u => u.id === currentUser.id || u.email === currentUser.email);
                if (updatedUser) {
                    currentUser = updatedUser;
                    localStorage.setItem('unlp_active_user', JSON.stringify(currentUser));
                }
                updateUIForUser();
            }
        } catch (e) {
            showToast('Error al leer el archivo JSON.');
        }
    }
}

// Función encargada de sobrescribir el archivo datos.json en la PC
async function persistData() {
    const handle = await getFileHandle();
    
    if (!handle) {
        localStorage.setItem('unlp_db_data_backup', JSON.stringify(dbData));
        showToast('Guardado en caché local. Selecciona datos.json para persistir en disco.');
        return;
    }

    try {
        const writable = await handle.createWritable();
        await writable.write(JSON.stringify(dbData, null, 2));
        await writable.close();
        console.log('Archivo datos.json actualizado con éxito en el disco.');
    } catch (err) {
        console.error('Error al escribir en datos.json:', err);
        showToast('Error al escribir en el archivo local.');
    }
}

// Session Check
function checkActiveSession() {
    const storedUser = localStorage.getItem('unlp_active_user');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        updateUIForUser();
    } else {
        showGuestUI();
    }
}

// UI Switcher based on Authentication Status & Role
function updateUIForUser() {
    document.getElementById('guestHero').classList.add('d-none');
    document.getElementById('authNavButtons').classList.add('d-none');
    document.getElementById('userBadgeContainer').classList.remove('d-none');
    document.getElementById('userBadgeContainer').classList.add('d-flex');
    
    document.getElementById('navUserName').textContent = currentUser.nombre;
    document.getElementById('userRoleBadge').textContent = currentUser.rol.toUpperCase();

    if (currentUser.rol === 'atleta') {
        document.getElementById('athleteDashboard').classList.remove('d-none');
        document.getElementById('coachDashboard').classList.add('d-none');
        setupAthleteView();
    } else if (currentUser.rol === 'entrenador') {
        document.getElementById('coachDashboard').classList.remove('d-none');
        document.getElementById('athleteDashboard').classList.add('d-none');
        setupCoachView();
    }
}

function showGuestUI() {
    document.getElementById('guestHero').classList.remove('d-none');
    document.getElementById('authNavButtons').classList.remove('d-none');
    document.getElementById('userBadgeContainer').classList.add('d-none');
    document.getElementById('userBadgeContainer').classList.remove('d-flex');
    document.getElementById('athleteDashboard').classList.add('d-none');
    document.getElementById('coachDashboard').classList.add('d-none');
}

// Cambio de día en la planilla
function switchDayView(dayKey) {
    const data = planSemanalMock[dayKey];
    if (!data) return;

    // Actualizar estados de botones
    document.querySelectorAll('#dayTabs .nav-link').forEach(btn => btn.classList.remove('active'));
    const activeTab = document.getElementById(`tab-${dayKey}`);
    if (activeTab) activeTab.classList.add('active');

    // Actualizar contenido de la tabla
    const header = document.getElementById('dayTableHeader');
    if (header) header.className = data.claseHeader;

    const titleEl = document.getElementById('dayTitleHeader');
    if (titleEl) titleEl.textContent = data.titulo;

    const cellEl = document.getElementById('dayContentCell');
    if (cellEl) cellEl.innerHTML = data.contenido;

    const notesEl = document.getElementById('dayNotesText');
    if (notesEl) notesEl.textContent = data.notas || "Sin observaciones adicionales.";
}

// Handler: Registration
async function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const role = document.getElementById('regRole').value;
    const spec = document.getElementById('regSpec').value;
    const password = document.getElementById('regPassword').value;

    const exists = dbData.usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
        showToast('El correo ya se encuentra registrado.');
        return;
    }

    const newUser = {
        id: dbData.usuarios.length + 1,
        nombre: name,
        email: email,
        password: password,
        rol: role,
        especialidad: spec,
        categoria: "U23",
        aptoMedicoVigente: true,
        pbs: { pb100m: 11.50, pb200m: 23.50, pb400m: 54.00 }
    };

    dbData.usuarios.push(newUser);
    await persistData();

    currentUser = newUser;
    localStorage.setItem('unlp_active_user', JSON.stringify(currentUser));

    const modalEl = document.getElementById('registerModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
    modalInstance.hide();

    showToast(`¡Bienvenido/a ${newUser.nombre}! Tu cuenta fue creada.`);
    updateUIForUser();
}

// Handler: Login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = dbData.usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('unlp_active_user', JSON.stringify(currentUser));
        
        const modalEl = document.getElementById('loginModal');
        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modalInstance.hide();

        showToast(`Sesión iniciada como ${user.nombre}`);
        updateUIForUser();
    } else {
        showToast('Credenciales incorrectas. Revisa tu email y contraseña.');
    }
}

// Handler: Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('unlp_active_user');
    showGuestUI();
    showToast('Sesión cerrada correctamente.');
}

// Setup Athlete View Data
function setupAthleteView() {
    document.getElementById('athleteWelcomeMsg').textContent = `¡Hola, ${currentUser.nombre}!`;
    document.getElementById('athleteCategoryBadge').textContent = `Especialidad: ${currentUser.especialidad || 'General'} | Cat: ${currentUser.categoria || 'U23'}`;

    // Cargar planilla por defecto en Lunes
    switchDayView('lunes');

    // Cargar PBs guardados en el usuario
    const pbs = currentUser.pbs || { pb100m: 11.50, pb200m: 23.50, pb400m: 54.00 };
    if (document.getElementById('pb100m')) document.getElementById('pb100m').value = pbs.pb100m || 11.50;
    if (document.getElementById('pb200m')) document.getElementById('pb200m').value = pbs.pb200m || 23.50;
    if (document.getElementById('pb400m')) document.getElementById('pb400m').value = pbs.pb400m || 54.00;

    const record = dbData.registrosDiarios.find(r => r.usuarioId === currentUser.id && r.fecha === '2026-07-20');
    if (record) {
        document.getElementById('dailyStatusBadge').textContent = 'Completado';
        document.getElementById('dailyStatusBadge').className = 'badge bg-success text-white fw-bold px-3 py-2';
        if (document.getElementById('weatherInput')) document.getElementById('weatherInput').value = record.clima || '';
        if (document.getElementById('notesInput')) document.getElementById('notesInput').value = record.observaciones || '';
        if (document.getElementById('shoesSelect')) document.getElementById('shoesSelect').value = record.calzado || 'Zapatillas';
    }
}

// Alternar edición de inputs de PBs
function toggleEditPBs() {
    const inputs = document.querySelectorAll('.pb-input');
    const btn = document.getElementById('btnSavePBs');
    if (!inputs.length) return;
    
    const isDisabled = inputs[0].disabled;
    inputs.forEach(input => input.disabled = !isDisabled);
    if (btn) {
        if (isDisabled) btn.classList.remove('d-none');
        else btn.classList.add('d-none');
    }
}

// Guardar PBs en el usuario y persistir en datos.json
async function savePBs(event) {
    event.preventDefault();
    const pb100 = parseFloat(document.getElementById('pb100m').value) || 11.50;
    const pb200 = parseFloat(document.getElementById('pb200m').value) || 23.50;
    const pb400 = parseFloat(document.getElementById('pb400m').value) || 54.00;

    const newPBs = { pb100m: pb100, pb200m: pb200, pb400m: pb400 };

    currentUser.pbs = newPBs;

    const userIndex = dbData.usuarios.findIndex(u => u.id === currentUser.id || u.email.toLowerCase() === currentUser.email.toLowerCase());
    if (userIndex >= 0) {
        dbData.usuarios[userIndex].pbs = newPBs;
    }

    localStorage.setItem('unlp_active_user', JSON.stringify(currentUser));
    await persistData();

    toggleEditPBs();
    showToast('¡Tus marcas personales (PBs) fueron guardadas en datos.json!');
}

// Save Daily Feedback Form
async function saveDailyFeedback(event) {
    event.preventDefault();
    const rpeRadio = document.querySelector('input[name="rpeColor"]:checked');
    const rpeColor = rpeRadio ? rpeRadio.value : 'Verde';
    const shoes = document.getElementById('shoesSelect').value;
    const weather = document.getElementById('weatherInput').value;
    const notes = document.getElementById('notesInput').value;

    const recordIndex = dbData.registrosDiarios.findIndex(r => r.usuarioId === currentUser.id && r.fecha === '2026-07-20');
    
    const recordData = {
        usuarioId: currentUser.id,
        nombreAtleta: currentUser.nombre,
        fecha: '2026-07-20',
        completado: true,
        rpeColor: rpeColor,
        calzado: shoes,
        clima: weather,
        observaciones: notes
    };

    if (recordIndex >= 0) {
        dbData.registrosDiarios[recordIndex] = recordData;
    } else {
        dbData.registrosDiarios.push(recordData);
    }

    await persistData();

    document.getElementById('dailyStatusBadge').textContent = 'Completado';
    document.getElementById('dailyStatusBadge').className = 'badge bg-success text-white fw-bold px-3 py-2';
    showToast('¡Sensaciones guardadas en datos.json!');
}

// Speed Pace Calculator
function calculatePace() {
    const distance = parseFloat(document.getElementById('calcDistance').value);
    const percent = parseFloat(document.getElementById('calcPercent').value);
    const shoe = document.getElementById('calcShoeType').value;

    if (!distance || !percent || percent <= 0) return;

    const pbs = (currentUser && currentUser.pbs) ? currentUser.pbs : {
        pb100m: parseFloat(document.getElementById('pb100m')?.value) || 11.50,
        pb200m: parseFloat(document.getElementById('pb200m')?.value) || 23.50,
        pb400m: parseFloat(document.getElementById('pb400m')?.value) || 54.00
    };

    const factor = 1 + ((100 - percent) / 100);
    let baseTime = 0;

    if (distance === 100) {
        baseTime = pbs.pb100m;
    } else if (distance === 200) {
        baseTime = pbs.pb200m ? pbs.pb200m : (pbs.pb100m * 2);
    } else if (distance === 400) {
        baseTime = pbs.pb100m * 4;
    } else {
        baseTime = pbs.pb100m * (distance / 100);
    }

    let targetTime = baseTime * factor;

    if (shoe === 'zapatillas') {
        targetTime += 1.2;
    }

    const resultBox = document.getElementById('calcResult');
    if (resultBox) {
        resultBox.classList.remove('d-none');
        resultBox.textContent = `Tiempo Objetivo (${percent}%): ${targetTime.toFixed(2)}s`;
    }
}

// Setup Coach View & Chart.js
function setupCoachView() {
    const tableBody = document.getElementById('coachAthleteTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';

    let rpeCounts = { Verde: 0, Amarillo: 0, Naranja: 0, Rojo: 0, Violeta: 0 };

    dbData.registrosDiarios.forEach(rec => {
        if (rec.rpeColor && rpeCounts.hasOwnProperty(rec.rpeColor)) {
            rpeCounts[rec.rpeColor]++;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold">${rec.nombreAtleta}</td>
            <td>Velocidad</td>
            <td><span class="badge btn-rpe-${rec.rpeColor.toLowerCase()} px-2 py-1">${rec.rpeColor}</span></td>
            <td><small class="text-muted">${rec.calzado}</small></td>
            <td><span class="badge bg-soft-success text-success">Completado</span></td>
        `;
        tableBody.appendChild(tr);
    });

    renderRPEChart(rpeCounts);
}

// Chart.js Visualization
function renderRPEChart(counts) {
    const canvas = document.getElementById('rpeChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (rpeChartInstance) rpeChartInstance.destroy();

    rpeChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Verde (Suave)', 'Amarillo (Medio)', 'Naranja (Fuerte)', 'Rojo (Máximo)', 'Violeta (Alerta)'],
            datasets: [{
                data: [counts.Verde, counts.Amarillo, counts.Naranja, counts.Rojo, counts.Violeta],
                backgroundColor: ['#22C55E', '#EAB308', '#F97316', '#EF4444', '#A855F7']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { boxWidth: 12, font: { size: 10 } } }
            }
        }
    });
}

function triggerExcelUpload() {
    showToast('Simulador: Carga de archivo .xlsx procesada con éxito.');
}

// Toast Helper
function showToast(message) {
    const toastMessage = document.getElementById('toastMessage');
    const toastEl = document.getElementById('liveToast');
    if (toastMessage && toastEl) {
        toastMessage.textContent = message;
        const toast = new bootstrap.Toast(toastEl);
        toast.show();
    }
}

function renderAthletesGrid() {
    const grid = document.getElementById('athletesGrid');
    if (!grid || !dbData || !dbData.usuarios) return;

    grid.innerHTML = '';
    dbData.usuarios.forEach(u => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6';
        
        const isCoach = u.rol === 'entrenador';
        const badgeClass = isCoach ? 'bg-primary-subtle text-primary border border-primary-subtle' : 'bg-primary-subtle text-primary border border-primary-subtle';
        const categoryText = isCoach ? 'Cuerpo Técnico' : (u.categoria || 'U23');

        col.innerHTML = `
            <div class="card border rounded-3 p-3 bg-white athlete-card shadow-xs h-100">
                <div class="d-flex align-items-center gap-3">
                    <div class="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style="width:40px; height:40px;">
                        <i class="fa-solid fa-user"></i>
                    </div>
                    <div>
                        <div class="d-flex align-items-center gap-2">
                            <h6 class="fw-bold mb-0 text-dark">${u.nombre}</h6>
                            <span class="badge extra-small rounded-pill px-2 py-1 ${badgeClass}">${categoryText}</span>
                        </div>
                        <small class="text-muted">Especialidad: ${u.especialidad || 'General'}</small>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(col);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.day-card');
  const prevBtn = document.getElementById('prevDayBtn');
  const nextBtn = document.getElementById('nextDayBtn');
  const currentTitle = document.getElementById('currentDayTitle');
  
  let currentIndex = 0;

  function updateCarousel(index) {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });

    // Actualizar título del header de navegación
    const activeHeader = cards[index].querySelector('.day-header').innerText;
    currentTitle.innerText = activeHeader;

    // Estado de los botones
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === cards.length - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel(currentIndex);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateCarousel(currentIndex);
    }
  });

  // Inicializar
  updateCarousel(currentIndex);
});