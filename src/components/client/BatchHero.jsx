import React from 'react';

export function BatchHero({ producerName, onchainId }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white px-4 py-16">
      {/* Background with a subtle, luxurious glow */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black opacity-95"></div>
        {/* Subtle, elegant grain or texture overlay */}
        <div className="absolute inset-0 bg-repeat opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noiseFilter)\' opacity=\'0.1\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}></div>
      </div>

      <div className="relative container mx-auto p-6 sm:p-12 text-center z-10">
        <div className="bg-white bg-opacity-5 backdrop-filter backdrop-blur-3xl rounded-3xl p-8 sm:p-16 border border-white border-opacity-20 shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:scale-105">
          
          {/* Header and sub-header */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-playfair font-black tracking-tight leading-relaxed md:leading-snug mb-4 drop-shadow-2xl animate-slide-in">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-gray-400">
              The Journey of Your Coffee
            </span>
          </h1>

          <p className="text-lg sm:text-xl font-lato font-light tracking-wide italic mt-6 mb-2 drop-shadow-lg animate-fade-in">
            A meticulously crafted batch, brought to you by
          </p>

          <p className="text-xl sm:text-3xl font-lato font-extrabold tracking-widest uppercase text-amber-100 drop-shadow-2xl animate-fade-in-up-delay">
            {producerName}
          </p>

          {/* Call-to-action button */}
          <a
            href={`#batch-details-${onchainId}`}
            className="mt-12 inline-block px-10 py-4 text-base sm:text-lg font-bold uppercase tracking-widest text-black bg-amber-400 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50 drop-shadow-lg animate-fade-in-down-delay"
            aria-label="Explore the details of this coffee batch"
          >
            Explore Batch Details
          </a>

          {/* Batch ID and details */}
          <div className="mt-12 pt-6 border-t border-white border-opacity-10">
            <p className="text-xs sm:text-sm font-light italic tracking-wider text-gray-400 drop-shadow-md animate-fade-in-down">
              Batch ID:
              <span className="font-mono font-medium ml-2 text-white">
                {onchainId || 'Unavailable'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}