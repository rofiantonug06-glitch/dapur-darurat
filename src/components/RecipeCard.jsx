import React, { useState } from 'react';

const RecipeCard = ({ recipe, availableIngredients }) => {
  const [showDetails, setShowDetails] = useState(false);

  const calculateMatchPercentage = () => {
    const matched = recipe.ingredients.filter(ing => 
      availableIngredients.some(avail => 
        avail.name.toLowerCase().includes(ing.toLowerCase()) ||
        ing.toLowerCase().includes(avail.name.toLowerCase())
      )
    ).length;
    return Math.round((matched / recipe.ingredients.length) * 100);
  };

  const matchPercentage = calculateMatchPercentage();
  const matchColor = matchPercentage >= 80 ? 'bg-green-500' : 
                    matchPercentage >= 60 ? 'bg-yellow-500' : 
                    'bg-red-500';

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className={`${matchColor} text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}>
            {matchPercentage}% Cocok
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{recipe.name}</h3>
          <span className="text-orange-500 font-semibold">
            ⭐ {recipe.rating}
          </span>
        </div>

        <p className="text-gray-600 mb-4">{recipe.description}</p>

        <div className="flex items-center text-gray-500 text-sm mb-4">
          <span className="mr-4">⏰ {recipe.time}</span>
          <span>👥 {recipe.servings} porsi</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Kecocokan Bahan:</span>
            <span className="text-sm font-semibold">{matchPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${matchColor} transition-all duration-500`}
              style={{ width: `${matchPercentage}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full bg-orange-50 text-orange-600 hover:bg-orange-100 py-2 rounded-lg font-medium transition-colors"
        >
          {showDetails ? 'Sembunyikan Detail' : 'Lihat Detail Resep'}
        </button>

        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">📝 Bahan yang diperlukan:</h4>
            <ul className="space-y-1 mb-4">
              {recipe.ingredients.map((ingredient, index) => {
                const hasIngredient = availableIngredients.some(avail => 
                  avail.name.toLowerCase().includes(ingredient.toLowerCase()) ||
                  ingredient.toLowerCase().includes(avail.name.toLowerCase())
                );
                
                return (
                  <li key={index} className="flex items-center">
                    <span className={`w-4 h-4 rounded mr-2 ${hasIngredient ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <span className={hasIngredient ? 'text-green-600 font-medium' : 'text-gray-600'}>
                      {ingredient}
                    </span>
                    {hasIngredient && <span className="ml-2 text-xs text-green-500">✓ Tersedia</span>}
                  </li>
                );
              })}
            </ul>

            <h4 className="font-semibold text-gray-800 mb-2">👨‍🍳 Cara Membuat:</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-600">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <div className="mt-4 flex space-x-3">
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all">
                Simpan Resep
              </button>
              <button className="px-4 border border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 transition-colors">
                Print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;