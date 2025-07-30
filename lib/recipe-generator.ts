// Mock AI recipe generation - In production, this would connect to your n8n workflow
export interface RecipeRequest {
  ingredients?: string[];
  cuisine?: string;
  dietary_restrictions?: string[];
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  cook_time?: number;
  servings?: number;
}

export interface GeneratedRecipe {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cook_time: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  dietary_tags: string[];
}

const mockRecipes: GeneratedRecipe[] = [
  {
    title: "Mediterranean Quinoa Bowl",
    description: "A healthy and colorful bowl packed with Mediterranean flavors, fresh vegetables, and protein-rich quinoa.",
    ingredients: [
      "1 cup quinoa",
      "2 cups vegetable broth",
      "1 cucumber, diced",
      "2 tomatoes, diced",
      "1/2 red onion, thinly sliced",
      "1/2 cup kalamata olives",
      "1/2 cup feta cheese, crumbled",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "2 tbsp fresh parsley, chopped",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Rinse quinoa under cold water until water runs clear.",
      "In a medium saucepan, bring vegetable broth to a boil. Add quinoa, reduce heat to low, cover and simmer for 15 minutes.",
      "Remove from heat and let stand 5 minutes. Fluff with a fork and let cool.",
      "In a large bowl, combine cooled quinoa, cucumber, tomatoes, red onion, and olives.",
      "In a small bowl, whisk together olive oil, lemon juice, oregano, salt, and pepper.",
      "Pour dressing over quinoa mixture and toss to combine.",
      "Top with feta cheese and fresh parsley before serving."
    ],
    cook_time: 25,
    servings: 4,
    difficulty: "Easy",
    cuisine: "Mediterranean",
    dietary_tags: ["Vegetarian", "Gluten-Free", "Healthy"]
  },
  {
    title: "Spicy Thai Basil Chicken",
    description: "An authentic Thai stir-fry with aromatic basil, chilies, and tender chicken in a savory sauce.",
    ingredients: [
      "1 lb chicken breast, sliced thin",
      "3 tbsp vegetable oil",
      "4 cloves garlic, minced",
      "2-3 Thai chilies, sliced",
      "1 cup fresh Thai basil leaves",
      "2 tbsp oyster sauce",
      "1 tbsp soy sauce",
      "1 tbsp fish sauce",
      "1 tsp sugar",
      "2 green onions, sliced",
      "Jasmine rice for serving"
    ],
    instructions: [
      "Heat oil in a wok or large skillet over high heat.",
      "Add garlic and chilies, stir-fry for 30 seconds until fragrant.",
      "Add chicken and stir-fry for 3-4 minutes until almost cooked through.",
      "Add oyster sauce, soy sauce, fish sauce, and sugar. Stir-fry for 1 minute.",
      "Add basil leaves and stir-fry until wilted, about 30 seconds.",
      "Garnish with green onions and serve immediately over jasmine rice."
    ],
    cook_time: 15,
    servings: 3,
    difficulty: "Medium",
    cuisine: "Thai",
    dietary_tags: ["Spicy", "High-Protein"]
  }
];

export async function generateRecipe(request: RecipeRequest): Promise<GeneratedRecipe> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In production, this would make a request to your n8n workflow
  // For now, we'll return a mock recipe based on the request
  const baseRecipe = mockRecipes[Math.floor(Math.random() * mockRecipes.length)];
  
  return {
    ...baseRecipe,
    servings: request.servings || baseRecipe.servings,
    difficulty: request.difficulty || baseRecipe.difficulty,
    cuisine: request.cuisine || baseRecipe.cuisine,
  };
}