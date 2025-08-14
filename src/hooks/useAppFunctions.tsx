
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AppFunction {
  id: number;
  funcao: string;
  descricao: string;
  link: string;
}

export const useAppFunctions = () => {
  const [functions, setFunctions] = useState<AppFunction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFunctions = async () => {
      try {
        console.log('useAppFunctions - Iniciando busca das funções...');
        
        const { data, error } = await supabase
          .from('APP')
          .select('id, funcao, descricao, link')
          .order('id');

        if (error) {
          console.error('useAppFunctions - Erro na consulta:', error);
          throw error;
        }
        
        console.log('useAppFunctions - Funções carregadas:', data);
        setFunctions(data || []);
      } catch (err) {
        console.error('useAppFunctions - Erro ao carregar funções:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar funções');
      } finally {
        setLoading(false);
        console.log('useAppFunctions - Carregamento concluído');
      }
    };

    fetchFunctions();
  }, []);

  return { functions, loading, error };
};
