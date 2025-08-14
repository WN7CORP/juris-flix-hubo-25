import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Monitor, Play, X, Brain, Zap, ArrowRight } from 'lucide-react';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { useNavigation } from '@/context/NavigationContext';
export const AssistenteIA = () => {
  const {
    functions
  } = useAppFunctions();
  const {
    setCurrentFunction
  } = useNavigation();
  const [showVideo, setShowVideo] = useState(false);

  // Encontrar o link do Assistente IA na tabela
  const assistenteIAFunction = functions.find(func => func.funcao.toLowerCase().includes('assistente') && func.funcao.toLowerCase().includes('ia'));
  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send/?phone=5511940432865&text=Ol%C3%A1%2C+Evelyn%21+Poderia+me+ajudar?&type=phone_number&app_absent=0', '_blank');
  };
  const handleAppClick = () => {
    if (assistenteIAFunction?.link) {
      // Abrir no app via webview usando o sistema de navegação
      setCurrentFunction('Assistente IA Premium');
    }
  };
  const handleVideoClick = () => {
    setShowVideo(true);
  };
  const closeVideo = () => {
    setShowVideo(false);
  };
  return <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header minimalista */}
        <div className="mb-6 sm:mb-8 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <Brain className="h-6 w-6 sm:h-8 md:h-10 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Assistente IA Jurídico
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Inteligência artificial especializada em Direito brasileiro
          </p>
        </div>

        {/* Video Demo Button */}
        <div className="mb-6 sm:mb-8 text-center">
          <Button onClick={handleVideoClick} variant="outline" className="flex items-center gap-2 mx-auto border-red-500/30 text-red-500 hover:bg-red-500/10 text-sm sm:text-base" size="sm">
            <Play className="h-3 w-3 sm:h-4 sm:w-4" />
            Ver Demonstração
          </Button>
        </div>

        {/* Options Grid - Profissional e Minimalista */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* WhatsApp IA */}
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-green-500/20 hover:border-green-500/40 bg-card/50 backdrop-blur-sm" onClick={handleWhatsAppClick}>
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-green-500/20 transition-colors relative">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <Brain className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                </div>
              </div>
              <CardTitle className="text-lg sm:text-xl text-green-600 flex items-center justify-center gap-2">
                <span>WhatsApp IA</span>
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm">
                <strong>Evelyn IA</strong> - Assistente jurídica via WhatsApp com respostas instantâneas
              </p>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                  <span>Inteligência Artificial Especializada</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                  <span>Respostas instantâneas 24/7</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                  <span>Especializada em Direito</span>
                </div>
              </div>
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white group text-xs sm:text-sm" size="sm">
                <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Conversar no WhatsApp
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>

          {/* App IA */}
          <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-blue-500/20 hover:border-blue-500/40 bg-card/50 backdrop-blur-sm" onClick={handleAppClick}>
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-blue-500/20 transition-colors relative">
                <Monitor className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <Brain className="h-2 w-2 sm:h-3 sm:w-3 text-white" />
                </div>
              </div>
              <CardTitle className="text-lg sm:text-xl text-blue-600 flex items-center justify-center gap-2">
                <span>IA Premium</span>
                <Zap className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pt-0">
              <p className="text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm">
                <strong>IA Completa</strong> - Interface avançada com recursos extras e histórico
              </p>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                  <span>Interface completa e avançada</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                  <span>Histórico de conversas</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                  <span>Recursos profissionais</span>
                </div>
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white group text-xs sm:text-sm" size="sm">
                <Monitor className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Acessar IA Premium
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Section Minimalista */}
        <Card className="border-red-500/20 bg-card/30 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-center flex items-center justify-center gap-2">
              <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
              IA Especializada em Direito Brasileiro
            </h3>
            <p className="text-muted-foreground text-center text-xs sm:text-sm">
              Ambas opções utilizam nossa <strong>IA avançada especializada em Direito brasileiro</strong>, 
              treinada para auxiliar em questões jurídicas, elaboração de peças processuais e esclarecimentos legais.
            </p>
          </CardContent>
        </Card>

        {/* Video Modal */}
        {showVideo && <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="bg-background rounded-lg w-full max-w-4xl h-[70vh] relative">
              <div className="flex items-center justify-between p-3 sm:p-4 border-b py-[7px] px-[10px]">
                <h3 className="text-base sm:text-lg font-semibold">Demonstração da IA Jurídica</h3>
                <Button variant="ghost" size="icon" onClick={closeVideo}>
                  <X className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              <div className="p-3 sm:p-4 h-full px-0 py-[3px]">
                <iframe src="https://www.youtube.com/embed/HlE9u1c_MPQ" className="w-full h-full rounded" title="Demonstração da IA Jurídica" frameBorder="0" allowFullScreen />
              </div>
            </div>
          </div>}
      </div>
    </div>;
};