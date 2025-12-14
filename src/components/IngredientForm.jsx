import React, { useState } from 'react';

const IngredientForm = ({ onAddIngredient }) => {
  const [ingredient, setIngredient] = useState('');
  const [category, setCategory] = useState('sayuran');

  const commonIngredients = {
    sayuran: ['Wortel', 'Kentang', 'Bawang Merah', 'Bawang Putih', 'Tomat', 'Cabe', 'Kol', 'Brokoli', 'Timun', 'Tomat'],
    daging: ['Ayam', 'Daging Sapi', 'Telur', 'Ikan', 'Udang', 'Sosis', 'Daging Ayam'],
    bahan_pokok: ['Nasi', 'Mie', 'Roti', 'Tepung Terigu', 'Minyak Goreng', 'Garam', 'Gula', 'Minyak'],
    bumbu: ['Kecap', 'Saus Tomat', 'Minyak Wijen', 'Kecap Inggris', 'Merica', 'Kecap Manis']
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredient.trim()) {
      onAddIngredient({
        id: Date.now(),
        name: ingredient.trim(),
        category: category,
      });
      setIngredient('');
    }
  };

  const handleQuickAdd = (item) => {
    setIngredient(item);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🛒 Tambahkan Bahan yang Ada
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                Pilih Kategori
              </span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
            >
              <option value="sayuran">🥬 Sayuran</option>
              <option value="daging">🍗 Daging & Protein</option>
              <option value="bahan_pokok">🍚 Bahan Pokok</option>
              <option value="bumbu">🧂 Bumbu & Saus</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Nama Bahan
              </span>
            </label>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              placeholder="Contoh: Ayam, Wortel, Bawang..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Tambahkan ke Daftar
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
          <span className="mr-2">💡</span> Bahan yang Sering Tersedia:
        </h3>
        <div className="flex flex-wrap gap-2">
          {commonIngredients[category].map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleQuickAdd(item)}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm flex items-center"
            >
              <span className="mr-1">
                {category === 'sayuran' && '🥬'}
                {category === 'daging' && '🍗'}
                {category === 'bahan_pokok' && '🍚'}
                {category === 'bumbu' && '🧂'}
              </span>
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientForm;