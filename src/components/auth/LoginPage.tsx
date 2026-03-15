import { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'usertest' && password === 'provamecA11@@') {
      sessionStorage.setItem('authenticated', 'true');
      onLogin();
    } else {
      setError('Credenziali non valide');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-xl font-bold text-k2p-dark text-center mb-1">Assessment Dossier</h1>
        <p className="text-xs text-gray-400 text-center mb-6">Accedi per continuare</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-k2p-dark mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
              placeholder="Inserisci username"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-k2p-dark mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
              placeholder="Inserisci password"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-k2p-violet text-white text-sm font-medium rounded-lg hover:bg-k2p-grape transition-colors"
          >
            Accedi
          </button>
        </form>
      </div>
    </div>
  );
}
