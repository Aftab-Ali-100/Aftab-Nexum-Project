'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Sparkles, Users, Clock, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

export default function Home() {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-emerald-500" />,
      title: "AI-Powered Generation",
      description: "Advanced AI creates personalized recipes based on your preferences and dietary needs."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Community Favorites",
      description: "Discover and share recipes loved by our growing community of food enthusiasts."
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Quick & Easy",
      description: "Generate delicious recipes in seconds, from quick snacks to gourmet meals."
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: "Dietary Friendly",
      description: "Accommodates all dietary restrictions including vegan, keto, gluten-free, and more."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Home Cook",
      content: "RecipeAI has transformed my cooking! I discover new recipes every day that perfectly match my dietary preferences.",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "Food Blogger",
      content: "The AI suggestions are incredibly accurate. It's like having a personal chef who knows exactly what I want to cook.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Busy Parent",
      content: "Perfect for busy weeknights! Quick, healthy recipes that my kids actually eat. Game changer!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-orange-500/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="gradient-text">AI-Powered</span>
                <br />
                Recipe Generator
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover personalized recipes tailored to your taste, dietary needs, and available ingredients. 
                Let AI transform your cooking experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/auth">
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 pulse-glow"
                >
                  <ChefHat className="mr-2 h-5 w-5" />
                  Start Cooking with AI
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-4 text-lg border-2 hover:bg-gray-50"
              >
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-16 relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600">10K+</div>
                    <div className="text-gray-600">Recipes Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600">5K+</div>
                    <div className="text-gray-600">Happy Cooks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">4.9★</div>
                    <div className="text-gray-600">User Rating</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose RecipeAI?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of cooking with our intelligent recipe generation platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Generate perfect recipes in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Tell Us Your Preferences",
                description: "Share your dietary needs, available ingredients, and cuisine preferences"
              },
              {
                step: "2", 
                title: "AI Creates Your Recipe",
                description: "Our advanced AI analyzes your preferences and generates a personalized recipe"
              },
              {
                step: "3",
                title: "Cook & Enjoy",
                description: "Follow the step-by-step instructions and enjoy your delicious meal"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied cooks wh love transformed their kitchen experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full p-6">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">{testimonial?.content}</p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Cooking?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of home cooks we love discovered the magic of AI-powered recipe generation
            </p>
            <Link href="/auth">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg bg-white text-emerald-600 hover:bg-gray-100 font-semibold"
              >
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-lg">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">RecipeAI</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Revolutionizing home cooking with AI-powered recipe generation. 
                Discover, create, and share amazing recipes tailored to your taste.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/generate" className="hover:text-white transition-colors">Generate Recipe</Link></li>
                <li><Link href="/auth" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 RecipeAI. All rights reserved. Made with ❤️ for food lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}