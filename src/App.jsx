import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IngredientForm from './components/IngredientForm';
import IngredientList from './components/IngredientList';
import RecipeList from './components/RecipeList';

function App() {
  const [ingredients, setIngredients] = useState(() => {
    const saved = localStorage.getItem('dapurDaruratIngredients');
    return saved ? JSON.parse(saved) : [];
  });

  // State untuk statistik dinamis
  const [stats, setStats] = useState({
    totalRecipes: 0,
    averageMatch: 0,
    averageTime: 0
  });

  useEffect(() => {
    localStorage.setItem('dapurDaruratIngredients', JSON.stringify(ingredients));
  }, [ingredients]);

  const handleAddIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleRemoveIngredient = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const handleClearAll = () => {
    if (window.confirm('Yakin ingin menghapus semua bahan?')) {
      setIngredients([]);
    }
  };

  // Callback untuk update statistik dari RecipeList
  const updateStats = (totalRecipes, avgMatch, avgTime) => {
    setStats({
      totalRecipes,
      averageMatch: avgMatch,
      averageTime: avgTime
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom kiri - Form dan Daftar Bahan */}
          <div className="lg:col-span-1 space-y-6">
            <IngredientForm onAddIngredient={handleAddIngredient} />
            <IngredientList 
              ingredients={ingredients}
              onRemoveIngredient={handleRemoveIngredient}
              onClearAll={handleClearAll}
            />
            
            {/* Tips Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                💡 Tips Dapur Darurat
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <p className="text-gray-600">Gunakan bahan yang hampir kadaluarsa terlebih dahulu</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <p className="text-gray-600">Simpan bahan makanan dengan benar agar tahan lama</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <p className="text-gray-600">Kombinasikan sisa bahan dengan kreatif</p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <p className="text-gray-600">Masak dalam porsi sesuai kebutuhan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Kolom kanan - Daftar Resep */}
          <div className="lg:col-span-2">
            <RecipeList 
              ingredients={ingredients} 
              onUpdateStats={updateStats} // Kirim callback
            />
            
            {/* Stats Section - DINAMIS */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">{ingredients.length}</div>
                <div className="text-sm text-gray-600">Bahan Ditambahkan</div>
              </div>
              <div className="bg-white rounded-xl shadow p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.totalRecipes}</div>
                <div className="text-sm text-gray-600">Resep Cocok</div>
              </div>
              <div className="bg-white rounded-xl shadow p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.averageMatch > 0 ? Math.round(stats.averageMatch) + '%' : '0%'}
                </div>
                <div className="text-sm text-gray-600">Rata-rata Kecocokan</div>
              </div>
              <div className="bg-white rounded-xl shadow p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stats.averageTime > 0 ? Math.round(stats.averageTime) + 'm' : '0m'}
                </div>
                <div className="text-sm text-gray-600">Waktu Masak Rata-rata</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">🍳 DapurDarurat</h3>
              <p className="text-gray-400">Solusi cerdas untuk masak dari bahan sisa yang ada di dapurmu</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">© 2025 DapurDarurat. All rights reserved.</p>
              <p className="text-sm text-gray-500">
                Dibuat untuk mengurangi food waste
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;