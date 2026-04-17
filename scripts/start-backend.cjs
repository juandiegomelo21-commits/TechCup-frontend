const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const backendDir = path.resolve(__dirname, '..', '../Tech-Up-Futbol-BackEndFINALISIMA');

if (!fs.existsSync(backendDir)) {
  console.warn('\n[BACK] ⚠️  Backend no encontrado — arrancando solo el frontend.');
  console.warn('[BACK] Para correr el backend, clona Tech-Up-Futbol-BackEnd en la misma carpeta que este proyecto.\n');
  process.exit(0);
}

const isWindows = os.platform() === 'win32';
const mvnw = isWindows ? 'mvnw.cmd' : './mvnw';

if (!isWindows) {
  const { execSync } = require('child_process');
  try { execSync(`chmod +x "${path.join(backendDir, 'mvnw')}"`); } catch (_) {}
}

console.log(`[BACK] Iniciando Spring Boot en: ${backendDir}\n`);

const proc = spawn(mvnw, ['spring-boot:run', '-DskipTests'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true,
});

proc.on('error', (err) => {
  console.error('\n[ERROR] No se pudo iniciar el backend:', err.message);
  process.exit(1);
});
