import Image from 'next/image';
import Link from 'next/link';
import {pageMedia,type PageImage} from '@/lib/page-media';

export function PageIntro({title,children,image=pageMedia.home,eyebrow='ABS Properties · Oldham',compact=false}:{title:string;children?:React.ReactNode;image?:PageImage;eyebrow?:string;compact?:boolean}) {
  return <section className={`page-intro visual-intro${compact ? ' visual-intro-compact' : ''}`}>
    <div className="container visual-intro-grid">
      <div className="visual-intro-copy">
        <Link className="intro-home-link" href="/">Home <span aria-hidden="true">/</span></Link>
        <p className="eyebrow">{eyebrow}</p><h1>{title}</h1>
        {children && <div className="intro-copy">{children}</div>}
      </div>
      <figure className="visual-intro-media"><Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 100vw, 46vw"/>{image.caption && <figcaption>{image.caption}</figcaption>}</figure>
    </div>
  </section>;
}
