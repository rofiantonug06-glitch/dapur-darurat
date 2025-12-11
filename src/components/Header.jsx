import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold flex items-center">
              🍳 DapurDarurat
            </h1>
            <p className="text-orange-100 mt-2">
              Cari resep dari sisa bahan di dapurmu
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm">Resep Tersedia</p>
              </div>
              <div className="h-10 w-px bg-white/30"></div>
              <div className="text-center">
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm">Bahan Dasar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;