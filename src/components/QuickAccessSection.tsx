import { Bot, Scale, Monitor, Headphones, BookOpen } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const QuickAccessSection = () => {
  const { setCurrentFunction } = useNavigation();
  const [audioaulasLink, setAudioaulasLink] = useState<string>('');
  
  // Buscar link das Áudio-aulas da tabela APP
  useEffect(() => {
    const fetchAudioaulasLink = async () => {
      try {
        const { data, error } = await supabase
          .from('APP')
          .select('link')
          .eq('funcao', 'Áudio-aulas')
          .single();

        if (error) {
          console.error('Erro ao buscar link das Áudio-aulas:', error);
          return;
        }

        if (data?.link) {
          setAudioaulasLink(data.link);
        }
      } catch (err) {
        console.error('Erro ao carregar link:', err);
      }
    };

    fetchAudioaulasLink();
  }, []);
  
  const quickItems = [{
    id: 1,
    title: 'Vade Mecum',
    active: true,
    icon: Scale,
    functionName: 'Vade Mecum Digital'
  }, {
    id: 2,
    title: 'Assistente IA',
    active: true,
    icon: Bot,
    functionName: 'Assistente IA'
  }, {
    id: 3,
    title: 'Plataforma Desktop',
    active: true,
    icon: Monitor,
    functionName: 'Plataforma Desktop'
  }, {
    id: 4,
    title: 'Áudio-aulas',
    active: true,
    icon: Headphones,
    functionName: 'Áudio-aulas',
    externalLink: audioaulasLink
  }, {
    id: 5,
    title: 'Biblioteca Jurídica',
    active: true,
    icon: BookOpen,
    functionName: 'Biblioteca Jurídica'
  }];

  const handleItemClick = (item: typeof quickItems[0]) => {
    if (item.active) {
      if (item.externalLink) {
        window.open(item.externalLink, '_blank');
      } else {
        setCurrentFunction(item.functionName);
      }
    }
  };
  return (
    <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 border border-border/50 text-center mx-4 mb-6 shadow-lg glass-effect-modern">
      {/* Título */}
      <h2 className="text-lg font-semibold text-foreground mb-4">Acesso Rápido</h2>
      
      {/* Grid compacto de itens */}
      <div className="flex justify-center items-center gap-6 mt-4">
        {quickItems.slice(0, 5).map((item, index) => (
          <div 
            key={item.id} 
            className="group cursor-pointer transition-all duration-300 hover:scale-105" 
            onClick={() => handleItemClick(item)} 
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Círculo compacto com ícone - Sombras Profissionais */}
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-yellow-400 flex items-center justify-center transition-all duration-300 group-hover:bg-yellow-500 shadow-lg shadow-yellow-400/25 group-hover:shadow-xl group-hover:shadow-yellow-500/40">
              <item.icon className="w-5 h-5 text-black icon-hover-bounce" />
            </div>
            
            {/* Texto compacto abaixo */}
            <p className="text-xs font-medium max-w-16 mx-auto leading-tight transition-colors duration-300 text-foreground group-hover:text-red-professional">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};