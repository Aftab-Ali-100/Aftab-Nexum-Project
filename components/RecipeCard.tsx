'use client';

import { Recipe } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Trash2, Share2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecipeCardProps {
  recipe: Recipe;
  onDelete?: (id: string) => void;
  onView?: (recipe: Recipe) => void;
  showDeleteButton?: boolean;
}

export default function RecipeCard({ 
  recipe, 
  onDelete, 
  onView, 
  showDeleteButton = false 
}: RecipeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="recipe-card h-full cursor-pointer" onClick={() => onView?.(recipe)}>
        <div className="aspect-video bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-t-lg flex items-center justify-center">
          <div className="text-6xl">🍽️</div>
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {recipe.title}
            </CardTitle>
            {showDeleteButton && onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(recipe.id);
                }}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {recipe.description}
          </p>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.cook_time} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            <Badge 
              variant="secondary" 
              className={`text-xs ${
                recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}
            >
              {recipe.difficulty}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {recipe.cuisine}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1">
            {recipe.dietary_tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {recipe.dietary_tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{recipe.dietary_tags.length - 2} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
              onClick={(e) => {
                e.stopPropagation();
                onView?.(recipe);
              }}
            >
              View Recipe
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}