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

// Componente inteligente para decidir qual "página inicial" mostrar
function HomePage() {
  const { userRole } = useAuth();
  if (userRole === USER_ROLES.STAGE_PARTNER) {
    return <WorkstationPage />;
  }
  // O Dashboard do Dono de Marca é o padrão
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
                                    {/* NOVAS ROTAS DE PARCEIRO */}
                                    <Route path="/history" element={<HistoryPage />} />
                                </Routes>
                            </Layout>
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </AuthProvider>
    );
}
