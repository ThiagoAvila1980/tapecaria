
import React from 'react';
import { Sofa, Armchair, Car, User, Settings, Building2, MessageSquare } from 'lucide-react';
import { Service, GalleryImage } from './types';

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  role?: string;
}

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Reformas de Sofás',
    description: 'Renovação completa de estruturas e tecidos para sofás de todos os estilos.',
    imageUrl: 'images/sofa02.jpg'
  },
  {
    id: '2',
    title: 'Almofadas',
    description: 'Confecção sob medida com materiais de alta densidade e design exclusivo para seu ambiente.',
    imageUrl: 'images/almofada01.jpg'
  },
  {
    id: '3',
    title: 'Poltronas',
    description: 'Trabalho artesanal para peças clássicas e modernas, garantindo conforto e durabilidade.',
    imageUrl: 'images/poltrona01.jpg'
  },
  {
    id: '4',
    title: 'Cadeiras',
    description: 'Ergonomia e estilo para sua moto, com materiais antiderrapantes e resistentes ao tempo.',
    imageUrl: 'images/cadeira01.jpg'
  },
  {
    id: '5',
    title: 'Puffs',
    description: 'Conforto e estilo para um descanso relaxante.',
    imageUrl: 'images/puff01.jpg'
  },
  {
    id: '6',
    title: 'Serviços automotivos',
    description: 'Personalização e restauração em couro e tecidos originais para veículos de passeio e luxo.',
    imageUrl: 'images/banco_automotivo01.jpg'
  }
];

export const GALLERY: GalleryImage[] = [
  { id: 'g1', url: 'images/trabalho02.jpg', alt: '', category: 'work' },
  { id: 'g2', url: 'images/trabalho06.jpg', alt: '', category: 'machinery' },
  { id: 'g3', url: 'images/trabalho03.jpg', alt: '', category: 'facade' },
  { id: 'g4', url: 'images/trabalho05.jpg', alt: 'Detalhe do acabamento', category: 'work' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Maria Clara Silva',
    text: 'Reformei meu sofá de 10 anos e ele voltou parecendo novo! O acabamento é impecável e o tecido sugerido pela equipe foi perfeito.',
    rating: 5,
    role: 'Cliente Residencial'
  },
  {
    id: 't2',
    name: 'Ricardo Mendonça',
    text: 'Fiz os bancos de couro do meu SUV. Qualidade superior à original de fábrica. Atendimento muito profissional e entrega no prazo.',
    rating: 5,
    role: 'Proprietário de Veículo'
  },
  {
    id: 't3',
    name: 'Ana Paula Oliveira',
    text: 'Excelente trabalho nas cadeiras da minha mesa de jantar. Recomendo a Tapeçaria Paulista para quem busca perfeccionismo.',
    rating: 5,
    role: 'Cliente Residencial'
  }
];

export const CONTACT_WHATSAPP = "5567992931851";
export const INSTAGRAM_URL = "https://www.instagram.com/tapecaria_paulista";
