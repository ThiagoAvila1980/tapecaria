
export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: 'work' | 'machinery' | 'facade';
}

export interface QuoteRequest {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  description: string;
}

export interface AIResponse {
  suggestion: string;
  materials: string[];
}
