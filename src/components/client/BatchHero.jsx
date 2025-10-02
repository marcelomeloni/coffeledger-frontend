import React, { useState, useEffect } from 'react';
import { ChevronDown, ShieldCheck, ArrowUpRight } from 'lucide-react';

/**
 * A refined, "Old Money" style Hero component for displaying a coffee batch.
 * @param {string} producerName - The name of the coffee producer or estate.
 * @param {string} onchainId - The human-readable, off-chain ID for the batch (e.g., "FSN-2025-001").
 * @param {string} batchAddress - The on-chain Solana public key of the batch account. REQUIRED for the verification link.
 */
export const BatchHero = ({ producerName, onchainId, batchAddress }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Default values for a polished look even if props are missing
  const displayName = producerName || "A Prestigious Estate";
  const displayOnchainId = onchainId || "Unavailable";
  const solanaExplorerLink = batchAddress ? `https://solscan.io/account/${batchAddress}?cluster=devnet` : null;

  return (
    <>
      {/* Importing the serif font directly in the component for ease of use */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;700&display=swap');
        
        .font-serif-display {
          font-family: 'Cormorant Garamond', serif;
        }

        @keyframes subtle-fade-in {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-subtle-fade-in {
          animation: subtle-fade-in 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
      `}</style>
      
      <div className="relative h-screen bg-[#100f0d] text-stone-200 overflow-hidden">
        {/* Subtle textured background with a parallax effect */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: 'linear-gradient(#d4a574 1px, transparent 1px), linear-gradient(to right, #d4a574 1px, transparent 1px)',
            backgroundSize: '3rem 3rem',
            transform: `translateY(${scrollY * 0.2}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-4xl w-full">
            
            <div className="animate-subtle-fade-in">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-400/60 font-medium">
                A Mark of Distinction
              </p>
              <div className="w-24 h-px bg-amber-400/30 mx-auto mt-4 mb-8"></div>
            </div>

            <h1 className="font-serif-display text-6xl md:text-8xl font-medium text-stone-100 leading-none animate-subtle-fade-in animation-delay-200">
              {displayName}
            </h1>
            
            <p className="max-w-2xl mx-auto mt-8 text-lg md:text-xl text-stone-300/80 font-light leading-relaxed animate-subtle-fade-in animation-delay-400">
              A journey of excellence, from soil to cup. Each step of this microlot has been 
              meticulously documented to ensure its unparalleled provenance and quality.
            </p>

            {/* --- Certificate of Authenticity Plaque --- */}
            <div className="inline-block mt-12 border border-stone-700/80 p-4 animate-subtle-fade-in animation-delay-600">
              <div className="flex items-center gap-4">
                <ShieldCheck className="w-6 h-6 text-amber-400/50 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-xs text-stone-400 tracking-widest">PROOF OF PROVENANCE</p>
                  <p className="font-mono text-base text-stone-200 mt-1">{displayOnchainId}</p>
                  {solanaExplorerLink && (
                     <a 
                        href={solanaExplorerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-amber-400/70 hover:text-amber-300 transition-colors duration-300 mt-2"
                     >
                        <span className="text-sm font-sans group-hover:underline">Verify on Solana</span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" />
                     </a>
                  )}
                </div>
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </>
  );
};