import fs from 'node:fs';
import path from 'node:path';

// Restore only the named Abbeyhills photos. Preserve existing gallery entries.
const filename = 'data/properties.json';
const records = JSON.parse(fs.readFileSync(filename, 'utf8'));
const property = records.find((record: { id: string }) => record.id === 'abs-001');
if (!property) throw new Error('Abbeyhills property record abs-001 is missing.');

let added = 0;
for (let number = 1; number <= 8; number++) {
  const candidates = number === 4 ? ['ah4.png', 'ah4..png'] : [`ah${number}.png`];
  const name = candidates.find(candidate => fs.existsSync(path.join('public', 'images', candidate)));
  if (!name || candidates.some(candidate => property.images.some((image: { src: string }) => image.src === `/images/${candidate}`))) continue;
  property.images.push({
    src: `/images/${name}`,
    alt: number === 1 ? 'Front exterior of the Abbeyhills Road property' : `Abbeyhills Road property photograph ${number}`,
  });
  added++;
}
if (added) {
  property.images.sort((a: { src: string }, b: { src: string }) => {
    const photoNumber = (src: string) => Number(src.match(/\/ah([1-8])\.{1,2}png$/)?.[1] ?? 99);
    return photoNumber(a.src) - photoNumber(b.src);
  });
  fs.writeFileSync(filename, JSON.stringify(records, null, 2) + '\n');
}
console.log(`Abbeyhills Road: ${property.images.length} gallery photographs configured; ${added} added.`);
if (!property.images.length) console.log('Copy ah1.png to ah8.png into public/images, then restart the dev server. ah4..png is also supported.');
