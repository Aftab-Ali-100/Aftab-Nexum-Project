'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { generateRecipe, RecipeRequest, GeneratedRecipe } from '@/lib/recipe-generator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChefHat, 
  Sparkles, 
  Clock, 
  Users, 
  Plus, 
  X, 
  Save,
  Download,
  Share2
} from 'lucide-react';
import Header from '@/components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function GeneratePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<GeneratedRecipe | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [cookTime, setCookTime] = useState(30);
  const [servings, setServings] = useState(4);

  const cuisines = [
    'Pakastani', 'Mexican', 'Chinese', 'Japanese', 'Indian', 'Thai', 'French', 
    'Mediterranean', 'American', 'Korean', 'Vietnamese', 'Greek', 'Spanish'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 
    'Low-Carb', 'High-Protein', 'Nut-Free', 'Soy-Free'
  ];

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth');
      } else {
        setUser(user);
      }
    };

    getUser();
  }, [router]);

  const addIngredient = () => {
    if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const toggleDietaryRestriction = (restriction: string) => {
    if (dietaryRestrictions.includes(restriction)) {
      setDietaryRestrictions(dietaryRestrictions.filter(r => r !== restriction));
    } else {
      setDietaryRestrictions([...dietaryRestrictions, restriction]);
    }
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) {
      toast.error('Please add at least one ingredient');
      return;
    }

    setLoading(true);
    try {
      const request: RecipeRequest = {
        ingredients,
        cuisine: cuisine || undefined,
        dietary_restrictions: dietaryRestrictions,
        difficulty,
        cook_time: cookTime,
        servings
      };

      const recipe = await generateRecipe(request);
      setGeneratedRecipe(recipe);
      toast.success('Recipe generated successfully!');
    } catch (error) {
      toast.error('Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveRecipe = async () => {
    if (!generatedRecipe || !user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('recipes')
        .insert({
          title: generatedRecipe.title,
          description: generatedRecipe.description,
          ingredients: generatedRecipe.ingredients,
          instructions: generatedRecipe.instructions,
          cook_time: generatedRecipe.cook_time,
          servings: generatedRecipe.servings,
          difficulty: generatedRecipe.difficulty,
          cuisine: generatedRecipe.cuisine,
          dietary_tags: generatedRecipe.dietary_tags,
          user_id: user.id
        });

      if (error) throw error;
      
      toast.success('Recipe saved to your collection!');
    } catch (error) {
      toast.error('Failed to save recipe');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Generate Your Perfect Recipe</span>
          </h1>
          <p className="text-xl text-gray-600">
            Tell us your preferences and let AI create a personalized recipe for you
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recipe Generator Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ChefHat className="h-6 w-6 text-emerald-600" />
                  <span>Recipe Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Ingredients */}
                <div>
                  <Label className="text-base font-semibold">Available Ingredients</Label>
                  <div className="flex space-x-2 mt-2">
                    <Input
                      value={currentIngredient}
                      onChange={(e) => setCurrentIngredient(e.target.value)}
                      placeholder="e.g., chicken, tomatoes, basil"
                      onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
                    />
                    <Button onClick={addIngredient} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {ingredients.map((ingredient) => (
                      <Badge
                        key={ingredient}
                        variant="secondary"
                        className="flex items-center space-x-1"
                      >
                        <span>{ingredient}</span>
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeIngredient(ingredient)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Cuisine */}
                <div>
                  <Label className="text-base font-semibold">Cuisine Type</Label>
                  <Select value={cuisine} onValueChange={setCuisine}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select cuisine (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {cuisines.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Dietary Restrictions */}
                <div>
                  <Label className="text-base font-semibold">Dietary Preferences</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {dietaryOptions.map((option) => (
                      <Badge
                        key={option}
                        variant={dietaryRestrictions.includes(option) ? "default" : "outline"}
                        className="cursor-pointer justify-center py-2"
                        onClick={() => toggleDietaryRestriction(option)}
                      >
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Difficulty & Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-base font-semibold">Difficulty</Label>
                    <Select value={difficulty} onValueChange={(value: any) => setDifficulty(value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-base font-semibold flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Cook Time (min)</span>
                    </Label>
                    <Input
                      type="number"
                      value={cookTime}
                      onChange={(e) => setCookTime(Number(e.target.value))}
                      className="mt-2"
                      min={5}
                      max={300}
                    />
                  </div>
                  <div>
                    <Label className="text-base font-semibold flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Servings</span>
                    </Label>
                    <Input
                      type="number"
                      value={servings}
                      onChange={(e) => setServings(Number(e.target.value))}
                      className="mt-2"
                      min={1}
                      max={12}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={loading || ingredients.length === 0}
                  className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating Recipe...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Recipe</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Generated Recipe */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence>
              {generatedRecipe ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl">{generatedRecipe.title}</CardTitle>
                          <p className="text-gray-600 mt-2">{generatedRecipe.description}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={saveRecipe}
                            disabled={saving}
                            size="sm"
                            variant="outline"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-4">
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{generatedRecipe.cook_time} min</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{generatedRecipe.servings} servings</span>
                        </div>
                        <Badge 
                          className={
                            generatedRecipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            generatedRecipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }
                        >
                          {generatedRecipe.difficulty}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline">{generatedRecipe.cuisine}</Badge>
                        {generatedRecipe.dietary_tags.map((tag) => (
                          <Badge key={tag} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Ingredients */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
                        <ul className="space-y-2">
                          {generatedRecipe.ingredients.map((ingredient, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Instructions */}
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                        <ol className="space-y-3">
                          {generatedRecipe.instructions.map((instruction, index) => (
                            <li key={index} className="flex space-x-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-semibold">
                                {index + 1}
                              </span>
                              <span className="text-gray-700">{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card className="h-96 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <ChefHat className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">Your generated recipe will appear here</p>
                    <p className="text-sm mt-2">Fill out the form and click "Generate Recipe" to get started</p>
                  </div>
                </Card>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}