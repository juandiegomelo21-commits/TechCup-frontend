
const { execSync, spawn } = require('child_process');
const path = require('path');
const fs   = require('fs');
const os   = require('os');

// ── 1. Localizar la carpeta del backend ──────────────────────────────────────
const BACKEND_RELATIVE = '../Tech-Up-Futbol-BackEnd';
const backendDir = path.resolve(__dirname, '..', BACKEND_RELATIVE);

if (!fs.existsSync(backendDir)) {
  console.error(`\n[ERROR] No se encontró el backend en: ${backendDir}`);
  console.error('Asegúrate de que ambos proyectos estén en la misma carpeta padre.');
  console.error('Estructura esperada:');
  console.error('  📁 carpeta-padre/');
  console.error('    📁 TechCup-frontend/');
  console.error('    📁 Tech-Up-Futbol-BackEnd/');
  process.exit(1);
}

// ── 2. Elegir el wrapper de Maven según el SO ─────────────────────────────────
const isWindows = os.platform() === 'win32';
const mvnw = isWindows ? 'mvnw.cmd' : './mvnw';

// En Mac/Linux hay que dar permisos de ejecución al wrapper
if (!isWindows) {
  const mvnwPath = path.join(backendDir, 'mvnw');
  if (fs.existsSync(mvnwPath)) {
    try { execSync(`chmod +x "${mvnwPath}"`); } catch (_) {}
  }
}

// ── 3. Arrancar Spring Boot ───────────────────────────────────────────────────
console.log(`[BACK] Directorio: ${backendDir}`);
console.log(`[BACK] Ejecutando: ${mvnw} spring-boot:run -DskipTests\n`);

const proc = spawn(mvnw, ['spring-boot:run', '-DskipTests'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true,
});

proc.on('error', (err) => {
  console.error('\n[ERROR] No se pudo iniciar el backend:', err.message);
  if (err.message.includes('ENOENT')) {
    console.error('Verifica que Java esté instalado y en el PATH.');
    console.error('  → https://adoptium.net/');
  }
  process.exit(1);
});

proc.on('exit', (code) => {
  if (code !== 0 && code !== null) {
    console.error(`\n[BACK] El proceso terminó con código ${code}`);
  }
});
