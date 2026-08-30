/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Service {
  id: string;
  title: string;
  icon: any; // Lucide icon
  description: string;
  features: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: any;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface PricingTier {
  id: string;
  title: string;
  price: string;
  description: string;
  isPopular?: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}
