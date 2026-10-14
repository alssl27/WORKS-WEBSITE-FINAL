export type PageImage = {src:string;alt:string;caption?:string};

export const pageMedia = {
  home: {src:'/images/abs-townhouse-hero.png',alt:'Victorian townhouse and ABS Properties sign'},
  exterior: {src:'/images/roundthorn-exterior.png',alt:'Red-brick frontage of our Roundthorn Road property in Oldham'},
  garden: {src:'/images/fairfields-garden.png',alt:'Garden at our Fairfields property in Oldham',caption:'A garden from our Oldham property portfolio.'},
  living: {src:'/images/roundthorn-living-room.png',alt:'Bright living room at our Roundthorn Road property'},
  kitchen: {src:'/images/fairfields-kitchen-1.png',alt:'Fitted kitchen at our Fairfields property'},
  family: {src:'/images/brand-home.png',alt:'Illustration of a family arriving at a home with an ABS Properties To Let sign'},
  bungalow: {src:'/images/fairfields-exterior.png',alt:'Front garden and exterior of our Fairfields bungalow in Oldham'},
  street: {src:'/images/retford-street.png',alt:'Terraced houses on Retford Street in Oldham',caption:'Homes from our Oldham property portfolio.'},
} satisfies Record<string,PageImage>;

export const serviceMedia:Record<string,PageImage> = {
  lettings:pageMedia.living,
  management:pageMedia.kitchen,
  sales:pageMedia.exterior,
  commercial:pageMedia.home,
  investments:pageMedia.street,
};
