import { useState } from 'react';
import { DossierProvider } from '@/context/DossierContext';
import { AppShell } from '@/components/layout/AppShell';
import { LoginPage } from '@/components/auth/LoginPage';

export default function App() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem('authenticated') === 'true'
  );

  if (!authenticated) {
    return <LoginPage onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <DossierProvider>
      <AppShell />
    </DossierProvider>
  );
}
