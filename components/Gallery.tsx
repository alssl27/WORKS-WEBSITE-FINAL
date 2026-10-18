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
    <div className="gallery-controls">
      <button type="button" className="button outline" onClick={() => movePhoto(-1)} disabled={images.length === 1} aria-label="Previous property photograph">Previous</button>
      <span role="status" aria-live="polite" aria-atomic="true">Photo {activeIndex + 1} of {images.length}</span>
      <button type="button" className="button outline" onClick={() => movePhoto(1)} disabled={images.length === 1} aria-label="Next property photograph">Next</button>
    </div>
  );

  return (
    <section className="gallery" role="region" aria-label="Property photographs" aria-roledescription="carousel" onKeyDown={handleKeys}>
      <button type="button" className="gallery-main" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge photograph ${activeIndex + 1}: ${photo.alt}`}>
        <Image className="gallery-photo" key={photo.src} src={photo.src} alt={photo.alt} width={1400} height={900} sizes="(max-width: 1344px) calc(100vw - 48px), 1280px" preload onError={() => setFailedSource(photo.src)} />
        <span>Enlarge photograph</span>
      </button>

      {failedSource === photo.src && <p role="alert" className="gallery-error">This photograph could not load. Please try another photograph or refresh the page.</p>}

      {controls}

      {images.length > 1 && (
        <div ref={thumbnails} className="thumbnails" aria-label="Choose a photograph">
          {images.map((item, i) => (
            <button type="button" key={`${item.src}-${i}`} onClick={() => selectPhoto(i)} aria-pressed={i === activeIndex} aria-label={`Show photograph ${i + 1}: ${item.alt}`}>
              <Image src={item.src} alt="" width={180} height={120} sizes="100px" />
            </button>
          ))}
        </div>
      )}

      <dialog ref={dialog} className="photo-dialog" aria-label="Enlarged property photograph" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <button type="button" className="button photo-dialog-close" onClick={() => dialog.current?.close()}>Close photograph</button>
        <Image className="photo-dialog-image" key={photo.src} src={photo.src} alt={photo.alt} width={1800} height={1200} sizes="(max-width: 1440px) 90vw, 1360px" />
        {controls}
      </dialog>
    </section>
  );
}
