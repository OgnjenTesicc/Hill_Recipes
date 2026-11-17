export interface Ingredient {
  id: number;
  name: string;
  description?: string;
  unit?: string;
  allergenIds?: number[];
}