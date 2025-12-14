import React, { useState, useEffect, useCallback } from 'react';
import RecipeCard from './RecipeCard';

// Data resep lokal (simulasi database)
const localRecipes = [
  {
    id: 1,
    name: "Nasi Goreng Sederhana",
    description: "Nasi goreng praktis dengan bahan seadanya",
    image: "https://d1vbn70lmn1nqe.cloudfront.net/prod/wp-content/uploads/2023/07/13073811/Praktis-dengan-Bahan-Sederhana-Ini-Resep-Nasi-Goreng-Special-1.jpg.webp",
    rating: 4.5,
    time: "20 menit",
    servings: 2,
    difficulty: "Mudah",
    ingredients: ["Nasi", "Telur", "Bawang Merah", "Bawang Putih", "Kecap", "Garam", "Minyak Goreng"],
    steps: [
      "Panaskan minyak di wajan",
      "Tumis bawang merah dan bawang putih hingga harum",
      "Masukkan telur, orak-arik",
      "Tambahkan nasi, aduk rata",
      "Bumbui dengan kecap dan garam",
      "Aduk hingga matang dan sajikan"
    ]
  },
  {
    id: 2,
    name: "Tumis Sayuran",
    description: "Tumisan sayuran segar dengan bumbu sederhana",
    image: "https://cdn.idntimes.com/content-images/community/2023/03/img-20230314-141209-57bd2747b8f0f1038ca206f3e9ceea3f.jpg",
    rating: 4.3,
    time: "15 menit",
    servings: 2,
    difficulty: "Mudah",
    ingredients: ["Wortel", "Kol", "Brokoli", "Bawang Putih", "Saus Tiram", "Garam", "Minyak Goreng"],
    steps: [
      "Potong sayuran sesuai selera",
      "Panaskan minyak, tumis bawang putih",
      "Masukkan wortel, tumis sebentar",
      "Tambahkan kol dan brokoli",
      "Bumbui dengan saus tiram dan garam",
      "Aduk hingga matang"
    ]
  },
  {
    id: 3,
    name: "Ayam Goreng Bumbu Kuning",
    description: "Ayam goreng dengan bumbu kuning yang gurih",
    image: "https://cdn-brilio-net.akamaized.net/news/2022/02/22/223553/1673217-resep-ayam-goreng-kuning.jpg",
    rating: 4.7,
    time: "40 menit",
    servings: 4,
    difficulty: "Sedang",
    ingredients: ["Ayam", "Kunyit", "Bawang Merah", "Bawang Putih", "Kemiri", "Garam", "Minyak Goreng"],
    steps: [
      "Haluskan bumbu (kunyit, bawang, kemiri)",
      "Marinasi ayam dengan bumbu halus",
      "Diamkan 30 menit",
      "Goreng ayam dengan api sedang",
      "Goreng hingga matang keemasan",
      "Angkat dan tiriskan"
    ]
  },
  {
    id: 4,
    name: "Mie Goreng Telur",
    description: "Mie goreng simpel dengan telur",
    image: "https://allofresh.id/blog/wp-content/uploads/2023/09/cara-membuat-mie-goreng-4-1-scaled.jpg",
    rating: 4.2,
    time: "15 menit",
    servings: 2,
    difficulty: "Mudah",
    ingredients: ["Mie", "Telur", "Kecap", "Saus Tomat", "Bawang Merah", "Cabe", "Minyak Goreng"],
    steps: [
      "Rebus mie hingga setengah matang",
      "Tiriskan mie",
      "Tumis bawang dan cabe",
      "Masukkan telur, orak-arik",
      "Tambahkan mie dan bumbui",
      "Aduk rata dan sajikan"
    ]
  },
  {
    id: 5,
    name: "Sup Sayuran",
    description: "Sup hangat dengan berbagai sayuran",
    image: "https://tse3.mm.bing.net/th/id/OIP._I9FN32-BZ_nJWiDa70kkgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    rating: 4.4,
    time: "30 menit",
    servings: 4,
    difficulty: "Mudah",
    ingredients: ["Wortel", "Kentang", "Kol", "Bawang Merah", "Bawang Putih", "Garam", "Merica", "Air"],
    steps: [
      "Potong sayuran dadu",
      "Didihkan air",
      "Masukkan wortel dan kentang",
      "Tambahkan kol",
      "Bumbui dengan garam dan merica",
      "Masak hingga sayuran empuk"
    ]
  },
  {
    id: 6,
    name: "Telur Dadar Sosis",
    description: "Telur dadar dengan isian sosis",
    image: "https://img-global.cpcdn.com/recipes/afba140da810a050/751x532cq70/telur-dadar-sosis-biasa-foto-resep-utama.jpg",
    rating: 4.0,
    time: "10 menit",
    servings: 2,
    difficulty: "Mudah",
    ingredients: ["Telur", "Sosis", "Bawang Merah", "Garam", "Minyak Goreng"],
    steps: [
      "Kocok telur dengan garam",
      "Iris sosis dan bawang merah",
      "Panaskan minyak",
      "Tuang telur ke wajan",
      "Taburi sosis dan bawang",
      "Masak hingga matang"
    ]
  }
];

const RecipeList = ({ ingredients, onUpdateStats }) => {
  const [recipes, setRecipes] = useState(localRecipes);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk menghitung statistik
  const calculateStatistics = useCallback((recipeList) => {
    if (recipeList.length === 0) {
      return {
        totalRecipes: 0,
        averageMatch: 0,
        averageTime: 0
      };
    }

    let totalMatch = 0;
    let totalTime = 0;
    let validRecipes = 0;

    recipeList.forEach((recipe) => {
      // Hitung kecocokan untuk resep ini
      const calculateMatch = () => {
        if (ingredients.length === 0) return 0;
        
        const matched = recipe.ingredients.filter(recipeIngredient => 
          ingredients.some(userIngredient => 
            recipeIngredient.toLowerCase().includes(userIngredient.name.toLowerCase()) ||
            userIngredient.name.toLowerCase().includes(recipeIngredient.toLowerCase())
          )
        ).length;
        return (matched / recipe.ingredients.length) * 100;
      };

      // Ekstrak waktu masak (dalam menit)
      const extractTime = () => {
        const timeStr = recipe.time;
        const match = timeStr.match(/\d+/);
        return match ? parseInt(match[0]) : 30; // Default 30 menit jika tidak ditemukan angka
      };

      const matchPercentage = calculateMatch();
      const cookTime = extractTime();
      
      // Hanya hitung resep yang memiliki kecocokan minimal 20%
      if (matchPercentage >= 20) {
        totalMatch += matchPercentage;
        totalTime += cookTime;
        validRecipes++;
      }
    });

    // Jika tidak ada resep yang valid, return 0
    if (validRecipes === 0) {
      return {
        totalRecipes: 0,
        averageMatch: 0,
        averageTime: 0
      };
    }

    return {
      totalRecipes: validRecipes,
      averageMatch: totalMatch / validRecipes,
      averageTime: totalTime / validRecipes
    };
  }, [ingredients]);

  // Filter dan sort recipes
  const filterRecipes = useCallback((recipeList) => {
    let filtered = [...recipeList];
    
    if (filter !== 'all') {
      filtered = filtered.filter(recipe => 
        recipe.difficulty.toLowerCase() === filter
      );
    }

    // Sort berdasarkan kecocokan
    filtered.sort((a, b) => {
      const calculateMatch = (recipe) => {
        if (ingredients.length === 0) return 0;
        
        const matched = recipe.ingredients.filter(ing => 
          ingredients.some(avail => 
            avail.name.toLowerCase().includes(ing.toLowerCase()) ||
            ing.toLowerCase().includes(avail.name.toLowerCase())
          )
        ).length;
        return matched / recipe.ingredients.length;
      };

      if (sortBy === 'match') {
        return calculateMatch(b) - calculateMatch(a);
      } else if (sortBy === 'time') {
        const timeA = parseInt(a.time) || 30;
        const timeB = parseInt(b.time) || 30;
        return timeA - timeB;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });

    return filtered;
  }, [filter, sortBy, ingredients]);

  const filteredRecipes = filterRecipes(recipes);
  const hasIngredients = ingredients.length > 0;

  // Update statistik ketika filteredRecipes berubah
  useEffect(() => {
    const stats = calculateStatistics(filteredRecipes);
    
    // Kirim statistik ke parent component (App.jsx)
    if (onUpdateStats) {
      onUpdateStats(stats.totalRecipes, stats.averageMatch, stats.averageTime);
    }
  }, [filteredRecipes, calculateStatistics, onUpdateStats]);

  // Simulasi fetch API
  useEffect(() => {
    if (ingredients.length > 0) {
      setIsLoading(true);
      // Simulasi loading
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [ingredients]);

  // Hitung statistik untuk ditampilkan
  const currentStats = calculateStatistics(filteredRecipes);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            🍽️ Resep yang Cocok
          </h2>
          <p className="text-gray-600 mt-1">
            {hasIngredients 
              ? `Menemukan ${filteredRecipes.length} resep (${currentStats.totalRecipes} cocok)`
              : 'Tambahkan bahan untuk melihat resep yang cocok'}
          </p>
        </div>

        {hasIngredients && filteredRecipes.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm"
            >
              <option value="all">Semua Level</option>
              <option value="mudah">Mudah</option>
              <option value="sedang">Sedang</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 text-sm"
            >
              <option value="match">Kecocokan Tertinggi</option>
              <option value="time">Waktu Tercepat</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-600">Mencari resep yang cocok...</p>
        </div>
      ) : !hasIngredients ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👨‍🍳</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Tambahkan Bahan Dulu Yuk!
          </h3>
          <p className="text-gray-600 mb-6">
            Masukkan bahan-bahan yang ada di dapurmu untuk menemukan resep yang cocok
          </p>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🥕</span>
              </div>
              <p className="text-sm">Sayuran</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🍗</span>
              </div>
              <p className="text-sm">Protein</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🧂</span>
              </div>
              <p className="text-sm">Bumbu</p>
            </div>
          </div>
        </div>
      ) : filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Tidak Ada Resep yang Cocok
          </h3>
          <p className="text-gray-600 mb-6">
            Coba tambahkan lebih banyak bahan untuk mendapatkan rekomendasi resep
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Tambah Bahan Lagi
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                availableIngredients={ingredients}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeList;