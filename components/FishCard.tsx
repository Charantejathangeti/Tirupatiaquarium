import React, { useState } from 'react';
import { Plus, Info, Sparkles, Loader2, ShoppingBag } from 'lucide-react';
import { Fish } from '../types';
import { getFishCareTips } from '../services/geminiService';

interface FishCardProps {
  fish: Fish;
  onAddToCart: (fish: Fish, quantity: number) => void;
  isAdmin?: boolean;
}

const FishCard: React.FC<FishCardProps> = ({ fish, onAddToCart, isAdmin }) => {
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleIncrement = () => setQuantity(prev => Math.min(prev + 1, fish.stock));
  const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1));

  const handleAskAI = async () => {
    if (aiTip) return; 
    setLoadingAi(true);
    const tip = await getFishCareTips(fish.name);
    setAiTip(tip);
    setLoadingAi(false);
  };

  const hasDiscount = fish.originalPrice && fish.originalPrice > fish.price;
  const discountPercent = hasDiscount 
    ? Math.round(((fish.originalPrice! - fish.price) / fish.originalPrice!) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full overflow-hidden group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={fish.imageUrl} 
          alt={fish.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-0 right-0 bg-yellow-500 text-blue-900 font-bold px-3 py-1 rounded-bl-lg shadow-sm text-xs uppercase tracking-wider">
          {fish.category}
        </div>
        {fish.stock === 0 && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-white font-bold text-xl border-2 border-white px-6 py-2 rounded-lg transform -rotate-12">SOLD OUT</span>
          </div>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
            <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-blue-700 transition-colors line-clamp-2 min-h-[3rem]">{fish.name}</h3>
            <p className="text-xs text-slate-500 italic mt-1 font-serif line-clamp-1">{fish.scientificName}</p>
        </div>

        <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-extrabold text-blue-900">₹{fish.price.toFixed(0)}</span>
            {hasDiscount && (
              <>
                <span className="text-xs text-slate-400 font-medium line-through">₹{fish.originalPrice?.toFixed(0)}</span>
                <span className="text-xs text-green-600 font-bold bg-green-50 px-1 rounded">{discountPercent}% OFF</span>
              </>
            )}
        </div>

        <p className="text-sm text-slate-600 mb-4 line-clamp-2">{fish.description}</p>

        {showDetails && (
          <div className="mb-4 bg-blue-50 p-3 rounded-lg text-sm border border-blue-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div><span className="font-bold text-blue-800">Habitat:</span> {fish.habitat}</div>
                <div><span className="font-bold text-blue-800">Stock:</span> {fish.stock} Left</div>
            </div>
            
            <div className="pt-2 border-t border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-purple-700 flex items-center gap-1">
                  <Sparkles size={12} /> AI Expert Tip
                </span>
                {!aiTip && !loadingAi && (
                  <button 
                    onClick={handleAskAI}
                    className="text-xs text-blue-600 hover:text-blue-800 underline font-medium"
                  >
                    Ask Gemini
                  </button>
                )}
              </div>
              
              {loadingAi && (
                <div className="flex items-center gap-2 text-xs text-slate-500 py-1">
                  <Loader2 className="animate-spin h-3 w-3 text-purple-600" /> Getting advice...
                </div>
              )}
              
              {aiTip && (
                <p className="text-xs text-slate-700 italic bg-white p-2 rounded border border-purple-100 shadow-sm">
                  "{aiTip}"
                </p>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 gap-2">
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="More Details"
          >
            <Info size={20} />
          </button>

          {fish.stock > 0 && !isAdmin ? (
            <div className="flex items-center gap-2 flex-grow justify-end">
              <div className="flex items-center border border-slate-300 rounded-lg h-9 bg-slate-50">
                <button 
                  onClick={handleDecrement}
                  className="px-2 text-slate-600 hover:bg-slate-200 rounded-l-lg h-full transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-2 text-sm font-bold w-6 text-center text-slate-800">{quantity}</span>
                <button 
                  onClick={handleIncrement}
                  className="px-2 text-slate-600 hover:bg-slate-200 rounded-r-lg h-full transition-colors"
                  disabled={quantity >= fish.stock}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => onAddToCart(fish, quantity)}
                className="bg-blue-600 text-white px-3 h-9 rounded-lg hover:bg-blue-700 transition-colors shadow-md active:transform active:scale-95 flex items-center gap-1 font-medium text-sm"
              >
                <ShoppingBag size={16} /> Add
              </button>
            </div>
          ) : isAdmin ? (
             <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-500">Admin Mode</span>
          ) : (
            <span className="text-sm text-red-500 font-bold bg-red-50 px-3 py-1 rounded">No Stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FishCard;