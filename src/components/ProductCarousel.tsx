
import { useProdutos } from '@/hooks/useProdutos';
import { useEffect, useState } from 'react';

export const ProductCarousel = () => {
  const { data: produtos, isLoading } = useProdutos();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll mais lento e suave
  useEffect(() => {
    if (!produtos || produtos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Quando chegar no final, volta para o início
        return prevIndex >= produtos.length - 1 ? 0 : prevIndex + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [produtos]);

  if (isLoading) {
    return (
      <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-r from-store-primary/10 to-premium-primary/10 rounded-2xl flex items-center justify-center animate-pulse shadow-lg">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-store-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Carregando produtos incríveis...</p>
        </div>
      </div>
    );
  }

  if (!produtos || produtos.length === 0) {
    return (
      <div className="w-full h-48 sm:h-56 md:h-64 bg-gradient-to-r from-store-primary/10 to-premium-primary/10 rounded-2xl flex items-center justify-center shadow-lg">
        <p className="text-sm text-muted-foreground">Produtos em breve...</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-gradient-to-r from-store-primary/5 to-premium-primary/5 shadow-2xl border">
      {/* Título do Carrossel */}
      <div className="text-center py-4 sm:py-6 bg-gradient-to-r from-store-primary/10 to-premium-primary/10">
        <h2 className="text-xl sm:text-2xl font-bold gradient-text-legal mb-2">
          📚 Nossos Produtos em Destaque
        </h2>
        <p className="text-sm text-muted-foreground px-4">
          Produtos selecionados especialmente para seus estudos
        </p>
      </div>
      
      {/* Carrossel de Imagens - Agora tocável */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden group">
        {/* Botões de navegação */}
        <button
          onClick={() => setCurrentIndex(prev => prev === 0 ? produtos.length - 1 : prev - 1)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setCurrentIndex(prev => prev === produtos.length - 1 ? 0 : prev + 1)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="flex h-full px-4 sm:px-6 gap-4 sm:gap-6">
          {produtos.map((produto, index) => (
            <div
              key={produto.id}
              className={`flex-shrink-0 transition-all duration-1000 ease-in-out cursor-pointer ${
                index === currentIndex ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
              }`}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${100 / produtos.length}%`,
                minWidth: '140px',
                maxWidth: '180px'
              }}
              onClick={() => setCurrentIndex(index)}
            >
              <div className="relative group h-full w-full max-w-[160px] mx-auto">
                <img
                  src={produto.produtos}
                  alt={`Produto ${produto.id}`}
                  className="w-full h-full object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 aspect-[3/4]"
                  style={{ aspectRatio: '3/4' }}
                  onError={(e) => {
                    console.log('Erro ao carregar imagem:', produto.produtos);
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-2">
                      <span className="text-xs sm:text-sm font-bold">Produto #{produto.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Indicadores - Mostram apenas produtos disponíveis */}
      <div className="flex justify-center py-3 sm:py-4 space-x-1 sm:space-x-2">
        {produtos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-store-primary shadow-lg scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
