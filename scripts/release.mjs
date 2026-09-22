// scripts/release.mjs
import { execSync } from 'node:child_process';
import fs from 'node:fs';

// 1. Создаем теги версий
console.log('--- Создание тегов Changesets ---');
execSync('yarn changeset tag', { stdio: 'inherit' });

// 2. Пушим созданные теги в GitHub
console.log('--- Отправка тегов в origin ---');
execSync('git push --tags', { stdio: 'inherit' });

// 3. Формируем список для @changesets/action, чтобы он создал GitHub Releases
const packages = [
    JSON.parse(fs.readFileSync('apps/frontend/package.json', 'utf8')),
    JSON.parse(fs.readFileSync('apps/backend/package.json', 'utf8')),
];

const currentTags = execSync('git tag --points-at HEAD').toString();

console.log('\npackages published:');
for (const pkg of packages) {
    const tag = `${pkg.name}@${pkg.version}`;
    if (currentTags.includes(tag)) {
        console.log(`- ${tag}`);
    }
}