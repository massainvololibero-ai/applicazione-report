import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { DossierData } from '@/types/dossier';
import { DEFAULT_COMPETENCIES, DEFAULT_POTENTIAL_FACTORS } from '@/constants/competencies';
import { DEFAULT_DEVELOPMENT_TOOLS } from '@/constants/developmentTools';

const initialState: DossierData = {
  slide1: {
    candidateName: '',
    carrieraVisioneInsieme: '',
    softSkillsBusiness: '',
    softSkillsAction: '',
    softSkillsRelation: '',
    considerazioniFinali: '',
    valoreDiMercato: 3,
    competenzeManageriali: 'medio',
    potenziale: 'medio',
    valoreAziendale: 'medio',
  },
  slide2: {
    businessCase: '',
    rolePlayCapoCollaboratore: '',
    rolePlayPeerToPeer: '',
  },
  slide3: {
    competencies: [...DEFAULT_COMPETENCIES],
    potentialFactors: [...DEFAULT_POTENTIAL_FACTORS],
    puntiDiForza: '',
    areeDiMiglioramento: '',
  },
  slide4: {
    developmentTools: DEFAULT_DEVELOPMENT_TOOLS.map(t => ({ ...t })),
    puntiDiForzaTags: [],
    areeDiMiglioramentoTags: [],
  },
  slide5: {
    aspettativeFuture: '',
    readinessDescription: '',
    engagement: '',
    readinessForRole: 2,
    roleName: '',
    readinessStatus: 'pronto_con_restrizioni',
  },
  slide6: {
    matrixPosition: { x: 0.5, y: 0.5 },
    commento: '',
  },
  slide7: {
    matrixPosition: { x: 0.5, y: 0.5 },
    commento: '',
  },
};

type Action =
  | { type: 'UPDATE_SLIDE'; slide: keyof DossierData; data: Partial<DossierData[keyof DossierData]> }
  | { type: 'RESET' };

function reducer(state: DossierData, action: Action): DossierData {
  switch (action.type) {
    case 'UPDATE_SLIDE':
      return {
        ...state,
        [action.slide]: { ...state[action.slide], ...action.data },
      };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

interface DossierContextType {
  state: DossierData;
  dispatch: React.Dispatch<Action>;
}

const DossierContext = createContext<DossierContextType | null>(null);

export function DossierProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DossierContext.Provider value={{ state, dispatch }}>
      {children}
    </DossierContext.Provider>
  );
}

export function useDossier() {
  const ctx = useContext(DossierContext);
  if (!ctx) throw new Error('useDossier must be used within DossierProvider');
  return ctx;
}
