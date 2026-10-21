export type PageImage = {src:string;alt:string;caption?:string};

const pagePlaceholder:PageImage = {
  src:'/images/page-placeholder.svg',
  alt:'ABS Properties image placeholder',
};

export const pageMedia = {
  home: pagePlaceholder,
  exterior: pagePlaceholder,
  garden: pagePlaceholder,
  living: pagePlaceholder,
  kitchen: pagePlaceholder,
  family: pagePlaceholder,
  bungalow: pagePlaceholder,
  street: pagePlaceholder,
  townCentre: pagePlaceholder,
  welcomingFamily: pagePlaceholder,
} satisfies Record<string,PageImage>;

export const serviceMedia:Record<string,PageImage> = {
  lettings:pageMedia.welcomingFamily,
  management:pageMedia.family,
  sales:pageMedia.townCentre,
  commercial:pageMedia.home,
  investments:pageMedia.townCentre,
};
