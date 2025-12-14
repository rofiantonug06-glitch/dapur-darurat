import React from 'react';

const IngredientList = ({ ingredients, onRemoveIngredient, onClearAll }) => {
  const getCategoryColor = (category) => {
    const colors = {
      sayuran: 'bg-green-100 text-green-800 border border-green-200',
      daging: 'bg-red-100 text-red-800 border border-red-200',
      bahan_pokok: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      bumbu: 'bg-purple-100 text-purple-800 border border-purple-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  const formatCategory = (category) => {
    const names = {
      sayuran: 'Sayuran',
      daging: 'Daging & Protein',
      bahan_pokok: 'Bahan Pokok',
      bumbu: 'Bumbu & Saus'
    };
    return names[category] || category;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            📋 Bahan yang Tersedia
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Total: <span className="font-bold text-orange-600">{ingredients.length}</span> bahan
          </p>
        </div>
        {ingredients.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium transition-colors text-sm"
          >
            Hapus Semua
          </button>
        )}
      </div>

      {ingredients.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-gray-600 mb-2">Belum ada bahan yang ditambahkan</p>
          <p className="text-sm text-gray-500">Tambahkan bahan yang ada di dapurmu untuk mencari resep</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="border border-gray-200 rounded-xl p-4 hover:border-orange-300 transition-colors bg-white hover:bg-gray-50"
              >
                {/* Header dengan nama dan tombol hapus */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg break-words">
                      {ingredient.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => onRemoveIngredient(ingredient.id)}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    aria-label="Hapus bahan"
                    title="Hapus bahan"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>

                {/* Badge kategori TANPA IKON */}
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(ingredient.category)}`}>
                    {formatCategory(ingredient.category)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {ingredients.filter(i => i.category === 'sayuran').length}
                </div>
                <div className="text-sm text-gray-600">Sayuran</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {ingredients.filter(i => i.category === 'daging').length}
                </div>
                <div className="text-sm text-gray-600">Daging & Protein</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {ingredients.filter(i => i.category === 'bahan_pokok').length}
                </div>
                <div className="text-sm text-gray-600">Bahan Pokok</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {ingredients.filter(i => i.category === 'bumbu').length}
                </div>
                <div className="text-sm text-gray-600">Bumbu & Saus</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IngredientList;