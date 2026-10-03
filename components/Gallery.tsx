'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';

type Photo = { src: string; alt: string };

export function Gallery({ images }: { images: Photo[] }) {
  const [index, setIndex] = useState(0);
  const [failedSource, setFailedSource] = useState('');
  const dialog = useRef<HTMLDialogElement>(null);
  const thumbnails = useRef<HTMLDivElement>(null);

  if (!images.length) {
    return <div className="image-placeholder gallery-placeholder">Photographs to follow</div>;
  }

  const activeIndex = Math.min(index, images.length - 1);
  const photo = images[activeIndex];

  function selectPhoto(nextIndex: number) {
    setIndex(nextIndex);
    const thumb = thumbnails.current?.children[nextIndex] as HTMLElement | undefined;
    if (thumb && thumbnails.current) {
      const strip = thumbnails.current;
      if (thumb.offsetLeft < strip.scrollLeft || thumb.offsetLeft + thumb.offsetWidth > strip.scrollLeft + strip.clientWidth) {
        strip.scrollTo({ left: Math.max(0, thumb.offsetLeft - strip.clientWidth / 2 + thumb.offsetWidth / 2), behavior: 'auto' });
      }
    }
  }

  function movePhoto(direction: number) {
    selectPhoto((activeIndex + direction + images.length) % images.length);
  }

  function handleKeys(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      movePhoto(event.key === 'ArrowLeft' ? -1 : 1);
    }
  }

  const controls = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
      <button type="button" className="button outline" onClick={() => movePhoto(-1)} disabled={images.length === 1} aria-label="Previous property photograph">Previous</button>
      <span role="status" aria-live="polite" aria-atomic="true">Photo {activeIndex + 1} of {images.length}</span>
      <button type="button" className="button outline" onClick={() => movePhoto(1)} disabled={images.length === 1} aria-label="Next property photograph">Next</button>
    </div>
  );

  return (
    <section className="gallery" role="region" aria-label="Property photographs" aria-roledescription="carousel" onKeyDown={handleKeys}>
      <button type="button" className="gallery-main" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge photograph ${activeIndex + 1}: ${photo.alt}`} style={{ aspectRatio: '16 / 10', background: '#11253c', overflow: 'hidden' }}>
        <Image key={photo.src} src={photo.src} alt={photo.alt} width={1400} height={900} priority unoptimized onError={() => setFailedSource(photo.src)} style={{ width: '100%', height: '100%', maxHeight: 'none', objectFit: 'contain' }} />
        <span>Enlarge photograph</span>
      </button>

      {failedSource === photo.src && <p role="alert" style={{ marginTop: 12 }}>This photograph could not load. Check that {photo.src} matches its filename in public/images.</p>}

      {controls}

      {images.length > 1 && (
        <div ref={thumbnails} className="thumbnails" aria-label="Choose a photograph" style={{ position: 'relative', display: 'flex', overflowX: 'auto', gap: 12, padding: 5, marginTop: 16 }}>
          {images.map((item, i) => (
            <button type="button" key={`${item.src}-${i}`} onClick={() => selectPhoto(i)} aria-pressed={i === activeIndex} aria-label={`Show photograph ${i + 1}: ${item.alt}`} style={{ flex: '0 0 100px', padding: 0, border: i === activeIndex ? '3px solid #c53943' : '3px solid transparent', background: '#ecf4fb' }}>
              <Image src={item.src} alt="" width={180} height={120} unoptimized style={{ width: '100%', height: 70, objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      <dialog ref={dialog} className="photo-dialog" aria-label="Enlarged property photograph" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <button type="button" className="button" onClick={() => dialog.current?.close()}>Close photograph</button>
        <Image key={photo.src} src={photo.src} alt={photo.alt} width={1800} height={1200} unoptimized style={{ maxHeight: '70vh', width: '100%', objectFit: 'contain' }} />
        {controls}
      </dialog>
    </section>
  );
}
