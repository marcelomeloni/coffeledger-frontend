import { Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth, USER_ROLES } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import ProfilePage from './pages/profile'; 

// Páginas
import Dashboard from './pages/index';
import BatchesListPage from './pages/batches';
import NewBatchPage from './pages/batches/new';
import BatchDetailsPage from './pages/batches/[id]';
import LoginPage from './pages/login';
import PartnersListPage from './pages/partners';
import WorkstationPage from './pages/workstation';
import HistoryPage from './pages/history';
import BatchPage from './pages/BatchPage'; // Página Pública
import PartnerProfile from './pages/PartnerProfile'; // <-- NOVA IMPORTAÇÃO

// Componente inteligente para decidir qual "página inicial" mostrar
function HomePage() {
    // Puxe também o isLoading e o objeto USER_ROLES do contexto
    const { userRole, isLoading, USER_ROLES } = useAuth();
  
    // 1. Enquanto o AuthContext ainda está carregando a sessão, mostre um spinner.
    // Isso evita que o Dashboard apareça rapidamente antes do redirecionamento.
    if (isLoading) {
      return <Spinner fullPage />;
    }
  
    // 2. Verifique se a role do usuário é a de quem gerencia os lotes.
    // Apenas essas roles devem ver o Dashboard principal.
    if (userRole === USER_ROLES.BATCH_OWNER ) {
      return <Dashboard />;
    }
  
    // 3. Para TODAS as outras roles autenticadas (logistics, warehouse, grader, etc.),
    // a página inicial correta é a Estação de Trabalho.
    // Se a role não for nula/indefinida, ele entra aqui.
    if (userRole) {
      return <WorkstationPage />;
    }
  
    // 4. Fallback: Se por algum motivo não houver role (o que não deve acontecer
    // em uma rota protegida), volte para o Dashboard como padrão seguro.
    return <Dashboard />;
  }

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* 🚀 ROTA PÚBLICA / COMERCIAL (FORA DE PROTEÇÃO E LAYOUT) */}
                <Route path="/batch/:id" element={<BatchPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route 
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Routes>
                                    {/* ROTA PRINCIPAL ATUALIZADA */}
                                    <Route path="/" element={<HomePage />} />
                                   
                                    {/* Rotas Comuns ou de Dono de Marca */}
                                    <Route path="/batches" element={<BatchesListPage />} />
                                    <Route path="/batches/new" element={<NewBatchPage />} />
                                    <Route path="/partners" element={<PartnersListPage />} />
                                    <Route path="/batches/:id" element={<BatchDetailsPage />} />
                                    <Route path="/profile" element={<ProfilePage />} />
                                    
                                    {/* Rotas de Parceiro */}
                                    <Route path="/history" element={<HistoryPage />} />
                                    <Route path="/registry" element={<PartnerProfile />} /> {/* <-- NOVA ROTA */}
                                </Routes>
                            </Layout>
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </AuthProvider>
    );
}
