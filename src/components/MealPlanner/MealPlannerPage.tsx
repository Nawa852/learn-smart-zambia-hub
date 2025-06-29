
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Camera, Plus, Utensils, ShoppingCart, Calendar, Leaf, Heart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  category: string;
  cookingTime: number;
  servings: number;
}

interface MealPlan {
  id: string;
  week_start_date: string;
  meals: {
    [day: string]: {
      breakfast?: Recipe;
      lunch?: Recipe;
      dinner?: Recipe;
      snacks?: Recipe[];
    };
  };
  shopping_list: string[];
  nutritional_analysis: {
    dailyCalories: number;
    weeklyProtein: number;
    weeklyCarbs: number;
    weeklyFat: number;
  };
}

const MealPlannerPage = () => {
  const [currentPlan, setCurrentPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('monday');
  const [ingredientInput, setIngredientInput] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  const zambianRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Nshima with Kapenta',
      ingredients: [
        { name: 'Mealie meal', quantity: '2', unit: 'cups' },
        { name: 'Kapenta', quantity: '200', unit: 'g' },
        { name: 'Tomatoes', quantity: '3', unit: 'pieces' },
        { name: 'Onions', quantity: '1', unit: 'piece' },
        { name: 'Cooking oil', quantity: '2', unit: 'tbsp' }
      ],
      instructions: [
        'Boil water in a pot',
        'Gradually add mealie meal while stirring',
        'Cook until thick and smooth',
        'Fry kapenta with onions and tomatoes',
        'Serve nshima with kapenta relish'
      ],
      nutrition: { calories: 450, protein: 25, carbs: 65, fat: 12 },
      category: 'Traditional',
      cookingTime: 45,
      servings: 4
    },
    {
      id: '2',
      name: 'Ifisashi (Groundnut Vegetables)',
      ingredients: [
        { name: 'Groundnuts', quantity: '1', unit: 'cup' },
        { name: 'Pumpkin leaves', quantity: '2', unit: 'cups' },
        { name: 'Sweet potato leaves', quantity: '1', unit: 'cup' },
        { name: 'Salt', quantity: '1', unit: 'tsp' }
      ],
      instructions: [
        'Pound groundnuts into paste',
        'Boil vegetables until tender',
        'Add groundnut paste and simmer',
        'Season with salt',
        'Serve with nshima'
      ],
      nutrition: { calories: 380, protein: 18, carbs: 35, fat: 22 },
      category: 'Traditional',
      cookingTime: 30,
      servings: 4
    },
    {
      id: '3',
      name: 'Chikanda (African Polony)',
      ingredients: [
        { name: 'Wild orchid tubers', quantity: '500', unit: 'g' },
        { name: 'Groundnuts', quantity: '200', unit: 'g' },
        { name: 'Baking soda', quantity: '1', unit: 'tsp' },
        { name: 'Salt', quantity: '1', unit: 'tsp' }
      ],
      instructions: [
        'Soak tubers overnight',
        'Pound into paste',
        'Mix with ground nuts',
        'Add baking soda and salt',
        'Steam for 2 hours'
      ],
      nutrition: { calories: 320, protein: 15, carbs: 45, fat: 12 },
      category: 'Traditional',
      cookingTime: 150,
      servings: 6
    }
  ];

  const days = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
  ];

  useEffect(() => {
    if (user) {
      fetchMealPlan();
    }
  }, [user]);

  const fetchMealPlan = async () => {
    try {
      const startOfWeek = getStartOfWeek(new Date());
      const { data, error } = await supabase
        .from('meal_plans')
        .select('*')
        .eq('user_id', user?.id)
        .eq('week_start_date', startOfWeek.toISOString().split('T')[0])
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching meal plan:', error);
      } else if (data) {
        setCurrentPlan(data);
      } else {
        // Create default meal plan
        createDefaultMealPlan(startOfWeek);
      }
    } catch (error) {
      console.error('Error fetching meal plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStartOfWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    return startOfWeek;
  };

  const createDefaultMealPlan = async (startDate: Date) => {
    const defaultPlan = {
      user_id: user?.id,
      week_start_date: startDate.toISOString().split('T')[0],
      meals: days.reduce((acc, day) => ({
        ...acc,
        [day]: {}
      }), {}),
      shopping_list: [],
      nutritional_analysis: {
        dailyCalories: 0,
        weeklyProtein: 0,
        weeklyCarbs: 0,
        weeklyFat: 0
      }
    };

    try {
      const { data, error } = await supabase
        .from('meal_plans')
        .insert(defaultPlan)
        .select()
        .single();

      if (error) throw error;
      setCurrentPlan(data);
    } catch (error) {
      console.error('Error creating meal plan:', error);
    }
  };

  const addMealToDay = async (day: string, mealType: string, recipe: Recipe) => {
    if (!currentPlan) return;

    const updatedMeals = {
      ...currentPlan.meals,
      [day]: {
        ...currentPlan.meals[day],
        [mealType]: recipe
      }
    };

    try {
      const { error } = await supabase
        .from('meal_plans')
        .update({ meals: updatedMeals })
        .eq('id', currentPlan.id);

      if (error) throw error;

      setCurrentPlan({
        ...currentPlan,
        meals: updatedMeals
      });

      toast({
        title: "Meal Added",
        description: `${recipe.name} added to ${day} ${mealType}`,
      });
    } catch (error) {
      console.error('Error updating meal plan:', error);
      toast({
        title: "Error",
        description: "Failed to add meal",
        variant: "destructive"
      });
    }
  };

  const generateShoppingList = async () => {
    if (!currentPlan) return;

    const ingredients = new Set<string>();
    
    Object.values(currentPlan.meals).forEach(dayMeals => {
      Object.values(dayMeals).forEach(meal => {
        if (meal && 'ingredients' in meal) {
          (meal as Recipe).ingredients.forEach(ingredient => {
            ingredients.add(`${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`);
          });
        }
      });
    });

    const shoppingList = Array.from(ingredients);

    try {
      const { error } = await supabase
        .from('meal_plans')
        .update({ shopping_list: shoppingList })
        .eq('id', currentPlan.id);

      if (error) throw error;

      setCurrentPlan({
        ...currentPlan,
        shopping_list: shoppingList
      });

      toast({
        title: "Shopping List Generated",
        description: `${shoppingList.length} items added to your shopping list`,
      });
    } catch (error) {
      console.error('Error generating shopping list:', error);
    }
  };

  const recognizeIngredients = async () => {
    // Simulate AI ingredient recognition
    const commonZambianIngredients = [
      'Mealie meal', 'Kapenta', 'Sweet potatoes', 'Pumpkin leaves',
      'Groundnuts', 'Beans', 'Tomatoes', 'Onions', 'Cabbage'
    ];

    setIngredientInput(commonZambianIngredients.join(', '));
    
    toast({
      title: "Ingredients Recognized",
      description: "AI has identified common Zambian ingredients",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-600 to-orange-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-3xl">
              <Utensils className="w-8 h-8" />
              Zambian Meal Planner & Nutrition
            </CardTitle>
            <p className="text-green-100">
              Plan healthy, affordable meals using local Zambian ingredients
            </p>
          </CardHeader>
        </Card>

        <Tabs defaultValue="planner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="planner">Meal Planner</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
            <TabsTrigger value="shopping">Shopping List</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          </TabsList>

          <TabsContent value="planner" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Weekly Meal Plan</h2>
              <Button onClick={generateShoppingList}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Generate Shopping List
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
              {days.map((day) => (
                <Card key={day} className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-center text-lg capitalize">
                      {day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {['breakfast', 'lunch', 'dinner'].map((mealType) => (
                      <div key={mealType} className="border rounded-lg p-3">
                        <h4 className="font-medium text-sm capitalize mb-2">
                          {mealType}
                        </h4>
                        {currentPlan?.meals[day]?.[mealType] ? (
                          <div className="text-xs">
                            <p className="font-medium">
                              {currentPlan.meals[day][mealType].name}
                            </p>
                            <p className="text-gray-600">
                              {currentPlan.meals[day][mealType].nutrition.calories} cal
                            </p>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full h-8 text-xs"
                            onClick={() => addMealToDay(day, mealType, zambianRecipes[0])}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add
                          </Button>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Zambian Recipes</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={recognizeIngredients}>
                  <Camera className="w-4 h-4 mr-2" />
                  Scan Ingredients
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Recipe
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {zambianRecipes.map((recipe) => (
                <Card key={recipe.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline">{recipe.category}</Badge>
                      <Utensils className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{recipe.cookingTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-400" />
                        <span>{recipe.nutrition.calories} cal</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <h4 className="font-medium text-sm">Ingredients:</h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        {recipe.ingredients.slice(0, 3).map((ingredient, i) => (
                          <p key={i}>
                            {ingredient.quantity} {ingredient.unit} {ingredient.name}
                          </p>
                        ))}
                        {recipe.ingredients.length > 3 && (
                          <p className="text-blue-600">+{recipe.ingredients.length - 3} more</p>
                        )}
                      </div>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      View Recipe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shopping" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Shopping List</h2>
              <Button onClick={generateShoppingList}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Refresh List
              </Button>
            </div>

            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                {currentPlan?.shopping_list && currentPlan.shopping_list.length > 0 ? (
                  <div className="space-y-2">
                    {currentPlan.shopping_list.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 border rounded">
                        <input type="checkbox" className="rounded" />
                        <span className="flex-1">{item}</span>
                        <Badge variant="outline" className="text-xs">
                          <Leaf className="w-3 h-3 mr-1" />
                          Local
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No shopping list yet
                    </h3>
                    <p className="text-gray-600">
                      Add meals to your weekly plan to generate a shopping list
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6">
            <h2 className="text-2xl font-bold">Nutritional Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 mx-auto mb-3 text-red-500" />
                  <h3 className="font-semibold text-2xl mb-1">1,850</h3>
                  <p className="text-gray-600">Daily Calories</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-8 h-8 mx-auto mb-3 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P</span>
                  </div>
                  <h3 className="font-semibold text-2xl mb-1">85g</h3>
                  <p className="text-gray-600">Protein</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-8 h-8 mx-auto mb-3 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">C</span>
                  </div>
                  <h3 className="font-semibold text-2xl mb-1">245g</h3>
                  <p className="text-gray-600">Carbohydrates</p>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-8 h-8 mx-auto mb-3 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">F</span>
                  </div>
                  <h3 className="font-semibold text-2xl mb-1">62g</h3>
                  <p className="text-gray-600">Fats</p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Nutritional Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">
                      <Leaf className="inline w-4 h-4 mr-1" />
                      Rich in Local Nutrients
                    </h4>
                    <p className="text-green-700 text-sm">
                      Your meal plan includes plenty of groundnuts (protein), sweet potato leaves (vitamins), 
                      and kapenta (omega-3 fatty acids) - all excellent sources of nutrition available locally in Zambia.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">
                      <Heart className="inline w-4 h-4 mr-1" />
                      Balanced Macronutrients
                    </h4>
                    <p className="text-blue-700 text-sm">
                      Your current plan provides a good balance of carbohydrates from nshima and sweet potatoes, 
                      protein from fish and groundnuts, and healthy fats from traditional cooking methods.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MealPlannerPage;
