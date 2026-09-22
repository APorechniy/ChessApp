// scripts/create-release.mjs
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const target = process.argv[2]; // 'frontend' или 'backend'

if (!target || !['frontend', 'backend'].includes(target)) {
    console.error('Укажите цель: node scripts/create-release.mjs frontend|backend');
    process.exit(1);
}

const appPath = `apps/${target}`;
const pkg = JSON.parse(fs.readFileSync(`${appPath}/package.json`, 'utf8'));
const changelogPath = `${appPath}/CHANGELOG.md`;
const tag = `${pkg.name}@${pkg.version}`;

// 1. Достаем описание версии строго из CHANGELOG.md
function extractChangelog(path, version) {
    if (!fs.existsSync(path)) return '';
    const text = fs.readFileSync(path, 'utf8');
    const lines = text.split('\n');
    const startIndex = lines.findIndex(l => l.trim().startsWith(`## ${version}`));
    if (startIndex === -1) return '';

    const rest = lines.slice(startIndex + 1);
    const nextIndex = rest.findIndex(l => l.trim().startsWith('## '));
    return (nextIndex === -1 ? rest : rest.slice(0, nextIndex)).join('\n').trim();
}

const notes = extractChangelog(changelogPath, pkg.version) || `Версия ${pkg.version}`;

console.log(`\n📦 Релиз для ${tag}...`);
fs.writeFileSync('/tmp/release-notes.md', notes);

// 2. Создаем релиз через GitHub CLI (он сам проставит тег)
try {
    execSync(`gh release create "${tag}" --title "${tag}" --notes-file /tmp/release-notes.md`, {
        stdio: 'inherit',
    });
    console.log(`✅ GitHub Release ${tag} успешно создан!`);
} catch (error) {
    console.log(`⚠️ Релиз ${tag} уже существует. Обновляем описание...`);
    try {
        execSync(`gh release edit "${tag}" --notes-file /tmp/release-notes.md`, { stdio: 'inherit' });
        console.log(`✅ Описание релиза ${tag} обновлено!`);
    } catch (editError) {
        console.warn(`Не удалось обновить релиз: ${editError.message}`);
    }
}