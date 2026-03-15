import { DossierProvider } from '@/context/DossierContext';
import { AppShell } from '@/components/layout/AppShell';

export default function App() {
  return (
    <DossierProvider>
      <AppShell />
    </DossierProvider>
  );
}
