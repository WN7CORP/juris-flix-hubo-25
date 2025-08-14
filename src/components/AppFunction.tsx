
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { NoticiasJuridicas } from '@/components/NoticiasJuridicas';
import { Downloads } from '@/components/Downloads';
import { PlataformaDesktop } from '@/components/PlataformaDesktop';
import { Videoaulas } from '@/components/Videoaulas';
import { Anotacoes } from '@/components/Anotacoes';
import { Explorar } from '@/components/Explorar';
import { Premium } from '@/components/Premium';
import { PremiumRequired } from '@/components/PremiumRequired';
import { AssistenteIA } from '@/components/AssistenteIA';
import { BibliotecaClassicos } from '@/components/BibliotecaClassicos';
import { Loja } from '@/components/Loja';
import { RatingCard } from '@/components/RatingCard';

import { useEffect, useState } from 'react';

export const AppFunction = () => {
  const { currentFunction, setCurrentFunction } = useNavigation();
  const { functions, loading } = useAppFunctions();
  const [functionData, setFunctionData] = useState<any>(null);
  
  useEffect(() => {
    console.log('AppFunction - currentFunction:', currentFunction);
    console.log('AppFunction - functions:', functions);
    
    if (currentFunction && functions.length > 0) {
      // Buscar função na base de dados
      let func = functions.find(f => f.funcao === currentFunction);
      
      // Tratamento especial para "Biblioteca de Habilidades Pessoais" 
      // que deve usar o link da "Biblioteca de Poder Pessoal"
      if (currentFunction === 'Biblioteca de Habilidades Pessoais') {
        func = functions.find(f => f.funcao === 'Biblioteca de Poder Pessoal');
      }
      
      console.log('AppFunction - functionData encontrada:', func);
      setFunctionData(func || null);
    } else {
      setFunctionData(null);
    }
  }, [currentFunction, functions]);
  
  const handleBack = () => {
    setCurrentFunction(null);
  };
  
  if (!currentFunction || loading) {
    return (
      <>
        {null}
      </>
    );
  }


  // Componentes específicos para funções customizadas (sempre prioritários)
  const renderSpecificComponent = () => {
    console.log('AppFunction - renderSpecificComponent para:', currentFunction);
    
    // Verificar por nome exato primeiro
    switch (currentFunction) {
      case 'Videoaulas':
        return <Videoaulas />;
      case 'Notícias Jurídicas':
        return <NoticiasJuridicas />;
      case 'Downloads':
        return <Downloads />;
      case 'Plataforma Desktop':
        return <PlataformaDesktop />;
      case 'Anotações':
        return <Anotacoes />;
      case 'Explorar':
        return <Explorar />;
      case 'Premium':
        return <Premium />;
      case 'Loja':
        return <Loja />;
      case 'Assistente IA Jurídica':
      case 'Assistente IA':
        return <AssistenteIA />;
      
      // Funções sem restrições
      case 'Biblioteca de Clássicos':
        return <BibliotecaClassicos />;
      case 'Mapas Mentais':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Mapas Mentais</h2>
              <p className="text-muted-foreground">Organize suas ideias jurídicas de forma visual</p>
            </div>
          </div>
        );
      case 'Banco de Questões':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Banco de Questões</h2>
              <p className="text-muted-foreground">Milhares de questões para concursos públicos</p>
            </div>
          </div>
        );
      case 'Cursos':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Cursos</h2>
              <p className="text-muted-foreground">Cursos preparatórios especializados</p>
            </div>
          </div>
        );
      case 'Dashboard':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Dashboard</h2>
              <p className="text-muted-foreground">Painel principal em desenvolvimento</p>
            </div>
          </div>
        );
      case 'Favoritos':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Favoritos</h2>
              <p className="text-muted-foreground">Seus itens favoritos aparecerão aqui</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  const specificComponent = renderSpecificComponent();

  // Se há um componente específico, renderizar com layout completo
  if (specificComponent) {
    // Para a Loja, renderizar sem wrapper adicional pois já tem seu próprio layout
    if (currentFunction === 'Loja') {
      return (
        <>
          {specificComponent}
        </>
      );
    }
    
    return (
      <>
        <div className="min-h-screen bg-background">
          {/* Header with back button */}
          <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/30">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 sm:py-4 py-[10px] bg-zinc-950">
              <div className="flex items-center gap-2 sm:gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBack} 
                  className="text-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold gradient-text">
                    {currentFunction}
                  </h1>
                  {functionData?.descricao && (
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {functionData.descricao}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="pt-16 sm:pt-20">
            {specificComponent}
          </main>
        </div>
      </>
    );
  }

  // Para "Assistente IA Jurídica Premium" - iframe sem restrições
  if (currentFunction === 'Assistente IA Jurídica Premium') {
    console.log('AppFunction - Renderizando iframe para Assistente IA Jurídica Premium');
    
    return (
      <>
        <div className="min-h-screen bg-background">
          {/* Header with back button */}
          <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/30">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 sm:py-4 py-[10px]">
              <div className="flex items-center gap-2 sm:gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBack} 
                  className="text-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold gradient-text">
                    Assistente IA Jurídica Premium
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Inteligência Artificial Jurídica Avançada
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* WebView Content */}
          <main className="pt-16 sm:pt-20 h-screen">
            <iframe 
              src="https://enchanted-pricey-walkover.glitch.me" 
              className="w-full h-full border-0" 
              title="Assistente IA Jurídica Premium"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              loading="lazy"
            />
          </main>
        </div>
      </>
    );
  }

  // Para "Plataforma Desktop Premium" - iframe sem restrições  
  if (currentFunction === 'Plataforma Desktop Premium') {
    console.log('AppFunction - Renderizando iframe para Plataforma Desktop Premium');
    
    return (
      <>
        <div className="min-h-screen bg-background">
          {/* Header with back button */}
          <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/30">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 sm:py-4 py-[10px]">
              <div className="flex items-center gap-2 sm:gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBack} 
                  className="text-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold gradient-text">
                    Plataforma Desktop Premium
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Versão completa para desktop
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* WebView Content */}
          <main className="pt-16 sm:pt-20 h-screen">
            <iframe 
              src={functionData?.link || "https://enchanted-pricey-walkover.glitch.me"} 
              className="w-full h-full border-0" 
              title="Plataforma Desktop Premium"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              loading="lazy"
            />
          </main>
        </div>
      </>
    );
  }

  // Para todas as outras funções da tabela APP que têm link válido, renderizar diretamente
  if (functionData && functionData.link && functionData.link.trim() !== '') {
    console.log('AppFunction - Renderizando iframe para:', functionData.funcao, 'Link:', functionData.link);
    
    return (
      <>
        <div className="min-h-screen bg-background">
          {/* Header with back button */}
          <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/30">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 sm:py-4 py-[10px]">
              <div className="flex items-center gap-2 sm:gap-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleBack} 
                  className="text-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold gradient-text">
                    {functionData.funcao}
                  </h1>
                  {functionData.descricao && (
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {functionData.descricao}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* WebView Content */}
          <main className="pt-16 sm:pt-20 h-screen">
            <iframe 
              src={functionData.link} 
              className="w-full h-full border-0" 
              title={functionData.funcao}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              loading="lazy"
            />
          </main>
        </div>
      </>
    );
  }

  // Para funções que não têm componente específico nem link válido
  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header with back button */}
        <header className="fixed top-0 left-0 right-0 z-40 glass-effect border-b border-border/30">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 sm:py-4 py-[10px]">
            <div className="flex items-center gap-2 sm:gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack} 
                className="text-foreground hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 hover:scale-110 h-8 w-8 sm:h-10 sm:w-10"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold gradient-text">
                  {currentFunction}
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Content for functions without specific components or links */}
        <main className="pt-16 sm:pt-20 h-screen">
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">
                {currentFunction}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {functionData?.descricao || 'Funcionalidade em desenvolvimento'}
              </p>
              {!functionData && (
                <p className="text-sm text-amber-400">
                  Esta função será implementada em breve
                </p>
              )}
              {functionData && (!functionData.link || functionData.link.trim() === '') && (
                <p className="text-sm text-amber-400">
                  Link em configuração
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
