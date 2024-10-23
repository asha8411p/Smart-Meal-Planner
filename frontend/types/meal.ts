export type Meal = {
  id: number;
  name: string;
  instructions: string;
  calories: string;
  ingredients: Ingredient[];
};

export type Ingredient = {
  id: number;
  name: string;
  quantity: string;
  unit: string;
};
