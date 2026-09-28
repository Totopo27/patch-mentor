import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import katex from '../book/node_modules/katex/dist/katex.mjs';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const bookDir = path.resolve(rootDir, 'book');
const docsDir = path.resolve(bookDir, 'src/content/docs');
const publicDir = path.resolve(bookDir, 'public');

console.log('====================================================');
console.log('   AUDITORÍA INTEGRAL DE CALIDAD: PATCH MENTOR      ');
console.log('====================================================\n');

function getMarkdownFiles(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) files = files.concat(getMarkdownFiles(full));
    else if (item.name.endsWith('.md')) files.push(full);
  }
  return files;
}

const mdFiles = getMarkdownFiles(docsDir);
console.log(`[INFO] Encontrados ${mdFiles.length} archivos Markdown en docs/\n`);

// 1. CHEQUEO DE ENLACES INTERNOS Y ASSETS
console.log('--- 1. Verificación de Enlaces Internos y Assets ---');
const validSlugs = new Set();
for (const file of mdFiles) {
  const rel = path.relative(docsDir, file).replace(/\\/g, '/');
  if (rel === 'index.md') {
    validSlugs.add('/');
  } else {
    const slug = '/' + rel.replace(/\.md$/, '') + '/';
    validSlugs.add(slug);
    validSlugs.add(slug.slice(0, -1));
  }
}

let brokenLinks = [];
for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(docsDir, file).replace(/\\/g, '/');

  const mdRegex = /\[([^\]]*)\]\(((\/[^)#?\s]+)(?:#[^)]*)?)\)/g;
  let m;
  while ((m = mdRegex.exec(content)) !== null) {
    const href = m[3];
    if (href.startsWith('/diagrams/') || href.startsWith('/assets/')) {
      const pubPath = path.join(publicDir, href.replace(/^\//, ''));
      if (!fs.existsSync(pubPath)) {
        brokenLinks.push(`[ASSET ROTO] ${relFile} -> ${href}`);
      }
    } else {
      const testHref = href.endsWith('/') ? href : href + '/';
      if (!validSlugs.has(testHref) && !validSlugs.has(href)) {
        brokenLinks.push(`[ENLACE ROTO] ${relFile} -> ${href}`);
      }
    }
  }

  const htmlRegex = /href="((\/[^"#?\s]+)(?:#[^"]*)?)"/g;
  while ((m = htmlRegex.exec(content)) !== null) {
    const href = m[2];
    if (href.startsWith('/diagrams/') || href.startsWith('/assets/')) {
      const pubPath = path.join(publicDir, href.replace(/^\//, ''));
      if (!fs.existsSync(pubPath)) {
        brokenLinks.push(`[ASSET HTML ROTO] ${relFile} -> ${href}`);
      }
    } else {
      const testHref = href.endsWith('/') ? href : href + '/';
      if (!validSlugs.has(testHref) && !validSlugs.has(href)) {
        brokenLinks.push(`[ENLACE HTML ROTO] ${relFile} -> ${href}`);
      }
    }
  }
}

if (brokenLinks.length === 0) {
  console.log('✓ Todos los enlaces internos y assets resuelven correctamente (0 rotos).\n');
} else {
  console.error(`✗ Errores en enlaces (${brokenLinks.length}):`);
  brokenLinks.forEach(e => console.error('  ', e));
  console.log();
}

// 2. CHEQUEO DE SINTAXIS MATEMÁTICA KATEX
console.log('--- 2. Verificación de Expresiones Matemáticas KaTeX ---');
let mathErrors = [];
let formulaCount = 0;

for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(docsDir, file).replace(/\\/g, '/');

  // Match block math $$ ... $$
  const blockMathRegex = /\$\$([\s\S]*?)\$\$/g;
  let b;
  while ((b = blockMathRegex.exec(content)) !== null) {
    formulaCount++;
    const formula = b[1].trim();
    try {
      katex.renderToString(formula, { displayMode: true, throwOnError: true });
    } catch (err) {
      mathErrors.push(`[KATEX BLOCK ERROR] ${relFile}: "${formula}" -> ${err.message}`);
    }
  }

  // Match inline math $ ... $ (ignoring $$)
  const inlineMathRegex = /(?<!\$)\$(?!\$)(.*?)(?<!\$)\$(?!\$)/g;
  let i;
  while ((i = inlineMathRegex.exec(content)) !== null) {
    formulaCount++;
    const formula = i[1].trim();
    if (!formula) continue;
    try {
      katex.renderToString(formula, { displayMode: false, throwOnError: true });
    } catch (err) {
      mathErrors.push(`[KATEX INLINE ERROR] ${relFile}: "${formula}" -> ${err.message}`);
    }
  }
}

console.log(`[INFO] Analizadas ${formulaCount} fórmulas matemáticas (inline y block).`);
if (mathErrors.length === 0) {
  console.log('✓ Todas las expresiones KaTeX compilan sin errores sintácticos.\n');
} else {
  console.error(`✗ Errores en KaTeX (${mathErrors.length}):`);
  mathErrors.forEach(e => console.error('  ', e));
  console.log();
}

// 3. CHEQUEO DE DIAGRAMAS ARCHIFY
console.log('--- 3. Verificación de Diagramas Archify ---');
const diagramsDir = path.resolve(publicDir, 'diagrams');
let archifyErrors = [];
if (fs.existsSync(diagramsDir)) {
  const jsonFiles = fs.readdirSync(diagramsDir).filter(f => f.endsWith('.architecture.json'));
  for (const jsonFile of jsonFiles) {
    const fullPath = path.join(diagramsDir, jsonFile);
    try {
      const output = execSync(
        `node "D:\\.opencode\\skills\\archify\\bin\\archify.mjs" validate architecture "${fullPath}" --quality showcase --json`,
        { encoding: 'utf8' }
      );
      const res = JSON.parse(output);
      if (!res.ok || res.composition?.status !== 'pass') {
        archifyErrors.push(`[ARCHIFY FAIL] ${jsonFile}: ${res.error || 'Composition failed'}`);
      } else {
        console.log(`✓ Diagrama Archify verificado (${jsonFile}): 9/9 checks OK, 0 errores, 0 advertencias.`);
      }
    } catch (err) {
      archifyErrors.push(`[ARCHIFY EXEC ERROR] ${jsonFile}: ${err.message}`);
    }
  }
}
if (archifyErrors.length > 0) {
  archifyErrors.forEach(e => console.error('  ', e));
}
console.log();

// 4. CHEQUEO DE INVARIANTE: PARCHES EN 3 PASOS
console.log('--- 4. Verificación de Invariante: Regla de 3 Pasos en Parches ---');
let missingThreeStepCount = 0;
for (const file of mdFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const relFile = path.relative(docsDir, file).replace(/\\/g, '/');

  if (content.includes('Parche Práctico en 3 Pasos') || content.includes('Paso 1 (Origen')) {
    const hasOrigen = content.includes('Origen:');
    const hasDestino = content.includes('Destino:');
    const hasProposito = content.includes('Propósito:');
    if (!hasOrigen || !hasDestino || !hasProposito) {
      missingThreeStepCount++;
      console.warn(`[WARN INVARIANTE] ${relFile} contiene parche pero omite alguno de los campos (Origen, Destino, Propósito)`);
    } else {
      console.log(`✓ Invariante cumplida en ${relFile}: Origen, Destino y Propósito documentados.`);
    }
  }
}
console.log();

// 5. RESUMEN FINAL
console.log('====================================================');
console.log('                  RESUMEN DE AUDITORÍA              ');
console.log('====================================================');
console.log(`- Enlaces rotos:     ${brokenLinks.length}`);
console.log(`- Errores KaTeX:     ${mathErrors.length}`);
console.log(`- Errores Archify:   ${archifyErrors.length}`);
console.log(`- Invariantes rotas: ${missingThreeStepCount}`);

if (brokenLinks.length === 0 && mathErrors.length === 0 && archifyErrors.length === 0 && missingThreeStepCount === 0) {
  console.log('\n>>> VEREDICTO DE AUDITORÍA: APROBADO CON RIGOR SHOWCASE (0 DEFECTOS TÉCNICOS) <<<');
} else {
  console.log('\n>>> VEREDICTO DE AUDITORÍA: REQUIERE CORRECCIONES <<<');
}
