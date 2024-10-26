export type Meal = {
  id: number;
  name: string;
  instructions: string;
  calories: string;
  ingredients: Ingredient[];
  budget?: number;
};

export type Ingredient = {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  price: number;
};
