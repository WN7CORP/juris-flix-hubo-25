import { ShoppingCart, Bot, Library, Headphones, Home, FileText, Brain } from 'lucide-react';
import { useState } from 'react';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { useDeviceDetection } from '@/hooks/useDeviceDetection';

interface FooterMenuProps {
  isVisible?: boolean;
}

export const FooterMenu = ({ isVisible = true }: FooterMenuProps) => {
  const [activeItem, setActiveItem] = useState('home');
  const { setCurrentFunction } = useNavigation();
  const { functions } = useAppFunctions();
  const { isDesktop } = useDeviceDetection();

  const findFunction = (searchTerm: string) => {
    return functions.find(func => 
      func.funcao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const menuItems = [
    {
      id: 'home',
      title: 'Início',
      icon: Home,
      function: null,
      color: 'primary'
    },
    {
      id: 'audio-aulas',
      title: 'Áudio-aulas',
      icon: Headphones,
      function: findFunction('audio')?.funcao || findFunction('áudio')?.funcao || 'Áudio-aulas',
      color: 'community'
    },
    {
      id: 'biblioteca',
      title: 'Biblioteca',
      icon: Library,
      function: findFunction('biblioteca')?.funcao || 'Biblioteca',
      color: 'info'
    },
    {
      id: 'anotacoes',
      title: 'Anotações',
      icon: FileText,
      function: 'Anotações',
      color: 'warning'
    },
    {
      id: 'mapas',
      title: 'Mapas',
      icon: Brain,
      function: 'Mapas Mentais',
      color: 'info'
    }
  ];

  const getItemStyles = (item: typeof menuItems[0], isActive: boolean) => {
    const baseStyles = "relative flex flex-col items-center py-3 px-3 rounded-xl transition-all duration-300 transform active:scale-95 group min-w-0 flex-1";
    
    if (isActive) {
      switch (item.color) {
        case 'store':
          return `${baseStyles} text-white bg-gradient-to-br from-store-primary to-store-secondary shadow-lg scale-105 animate-store-glow`;
        case 'community':
          return `${baseStyles} text-white bg-gradient-to-br from-community-primary to-community-secondary shadow-lg scale-105 animate-community-glow`;
        case 'info':
          return `${baseStyles} text-white bg-gradient-to-br from-info to-blue-600 shadow-lg scale-105`;
        case 'warning':
          return `${baseStyles} text-white bg-gradient-to-br from-warning to-orange-600 shadow-lg scale-105`;
        default:
          return `${baseStyles} text-primary bg-gradient-to-br from-primary/30 to-accent-legal/30 shadow-lg scale-105 animate-glow-pulse border border-primary/20`;
      }
    } else {
      return `${baseStyles} text-muted-foreground hover:text-primary hover:bg-footer-hover transition-all duration-300`;
    }
  };

  const getIconStyles = (item: typeof menuItems[0], isActive: boolean) => {
    const baseStyles = "relative p-2 rounded-lg transition-all duration-300";
    
    if (isActive) {
      return `${baseStyles} bg-white/20 scale-110`;
    } else {
      return `${baseStyles} group-hover:bg-primary/20 group-hover:scale-105`;
    }
  };

  const handleItemClick = (item: typeof menuItems[0]) => {
    setActiveItem(item.id);
    
    // Se for biblioteca, mostrar opções
    if (item.id === 'biblioteca') {
      // Criar um modal ou menu suspenso com as 3 opções da biblioteca
      const bibliotecaOptions = [
        'Biblioteca Jurídica',
        'Livros Clássicos', 
        'Biblioteca de Doutrinas'
      ];
      
      // Por enquanto, usar a primeira opção como padrão
      setCurrentFunction(bibliotecaOptions[0]);
    } else {
      setCurrentFunction(item.function);
    }
  };

  // Desktop version
  if (isDesktop) {
    return (
      <div className={`transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        <div className="glass-effect-modern rounded-2xl overflow-hidden">
          <div className="flex justify-around items-center px-2 py-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={getItemStyles(item, isActive)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Indicador ativo */}
                  {isActive && (
                     <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
                  )}
                  
                  {/* Icon container */}
                  <div className={getIconStyles(item, isActive)}>
                    <Icon className={`h-5 w-5 transition-all duration-300 ${
                      isActive ? 'icon-pulse-active' : 'icon-hover-bounce'
                    }`} />
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs font-medium transition-all duration-300 mt-1 text-center leading-tight ${
                    isActive ? 'font-semibold text-white' : 'group-hover:font-medium'
                  }`}>
                    {item.title}
                  </span>
                  
                  {/* Efeito de brilho no hover */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-xl" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Mobile version
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 safe-area-pb-legal transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="mx-3 mb-3">
        <div className="max-w-md mx-auto glass-effect-modern rounded-2xl overflow-hidden">
          <div className="flex justify-around items-center px-0 my-0 mx-0 rounded-none py-0">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={getItemStyles(item, isActive)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Indicador ativo */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
                  )}
                  
                  {/* Icon container */}
                  <div className={getIconStyles(item, isActive)}>
                    <Icon className={`h-5 w-5 transition-all duration-300 ${
                      isActive ? 'icon-pulse-active' : 'icon-hover-bounce'
                    }`} />
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs font-medium transition-all duration-300 mt-1 text-center leading-tight ${
                    isActive ? 'font-semibold text-white' : 'group-hover:font-medium'
                  }`}>
                    {item.title}
                  </span>
                  
                  {/* Efeito de brilho no hover */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-xl" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
