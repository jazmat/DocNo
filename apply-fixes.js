// apply-fixes.js — run from project root: node apply-fixes.js
const fs = require('fs');
const path = require('path');

function updatePackageJson() {
  const p = path.join(process.cwd(), 'Package.json');
  if (!fs.existsSync(p)) { console.error('Package.json not found'); return; }
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  j.scripts = j.scripts || {};
  j.scripts.start = 'node backend/server.js';
  j.scripts.dev = 'nodemon backend/server.js';
  j.scripts.migrate = 'cd backend && sequelize-cli db:migrate';
  j.scripts.seed = 'cd backend && sequelize-cli db:seed:all';
  j.scripts.lint = 'eslint backend/src/**';
  fs.writeFileSync(p, JSON.stringify(j, null, 4) + '\n', 'utf8');
  console.log('Updated Package.json scripts');
}

function updateBackendServer() {
  const file = path.join(process.cwd(), 'backend', 'server.js');
  if (!fs.existsSync(file)) { console.error('backend/server.js not found'); return; }
  let src = fs.readFileSync(file, 'utf8');
  if (src.includes("path.join(__dirname, '.env')")) {
    console.log('backend/server.js already updated');
    return;
  }
  src = src.replace(
    "require('dotenv').config();",
    "const path = require('path');\nrequire('dotenv').config({ path: path.join(__dirname, '.env') });"
  );
  fs.writeFileSync(file, src, 'utf8');
  console.log('Patched backend/server.js');
}

function updateDocumentsRoute() {
  const file = path.join(process.cwd(), 'backend', 'src', 'routes', 'documents.js');
  if (!fs.existsSync(file)) { console.error('documents.js not found'); return; }
  let src = fs.readFileSync(file, 'utf8');

  // add UniqueConstraintError to the require line
  src = src.replace(
    /const\s*\{\s*Op\s*\}\s*=\s*require\(\s*'sequelize'\s*\)\s*;/,
    "const { Op, UniqueConstraintError } = require('sequelize');"
  );

  // Replace the documentNumber + create block with a retry loop
  const pattern = /const documentNumber = await generateDocumentNumber[\s\S]*?const document = await Document\.create\([\s\S]*?\}\);\n/;
  if (pattern.test(src)) {
    const replacement = `let document;
        let documentNumber;
        const maxAttempts = 5;
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                documentNumber = await generateDocumentNumber(
                    value.department,
                    value.document_category,
                    user.full_name
                );

                document = await Document.create({
                    document_number: documentNumber,
                    user_id: req.user.id,
                    full_name: user.full_name,
                    email: user.email,
                    document_title: value.document_title,
                    document_category: value.document_category,
                    department: value.department,
                    metadata: { notes: value.notes },
                });

                break;
            } catch (err) {
                const isUniqueErr =
                    err instanceof UniqueConstraintError ||
                    err.name === 'SequelizeUniqueConstraintError' ||
                    err.name === 'UniqueConstraintError';
                if (isUniqueErr && attempt < maxAttempts) {
                    logger.warn(\`Unique constraint collision generating document number (attempt \${attempt}), retrying...\`);
                    await new Promise((r) => setTimeout(r, 50 * attempt));
                    continue;
                }
                throw err;
            }
        }

        if (!document) {
            return res.status(500).json({ error: 'Failed to generate document number after retries' });
        }
`;
    src = src.replace(pattern, replacement);
    fs.writeFileSync(file, src, 'utf8');
    console.log('Patched documents.js with retry loop');
  } else {
    console.log('Could not find the expected document-number/create block to replace - manual edit needed');
  }
}

function main() {
  updatePackageJson();
  updateBackendServer();
  updateDocumentsRoute();
  console.log('Done. Now run git add/commit and start the app.');
}

main();