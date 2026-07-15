export interface Project {
  id: string;
  category: string;
  title: string;
  tagline: string;
  badge: string;
  iconName: string;
  description: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  metrics?: { label: string; value: string }[];
  client: string;
  year: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface Pillar {
  id: string;
  num: string;
  title: string;
  description: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Client {
  name: string;
  sector: string;
}

export interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}
