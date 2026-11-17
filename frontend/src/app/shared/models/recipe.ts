export interface Recipe {
  id: number;
  title: string;
  description: string;
  preparationTime: number;
  servings: number;
  difficulty?: string;
  imageUrl?: string;
  authorId?: number;
}