import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSettings, useProjects, usePosts } from './hooks/useSettings';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MultiLayerCanvas from './components/MultiLayerCanvas';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Sobre = React.lazy(() => import('./pages/Sobre'));
const Contato = React.lazy(() => import('./pages/Contato'));
const Login = React.lazy(() => import('./pages/Login'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// CMS Admin Pages
const AdmDashboard = React.lazy(() => import('./pages/adm/AdmDashboard'));
const AdmStyle = React.lazy(() => import('./pages/adm/AdmStyle'));
const AdmProjects = React.lazy(() => import('./pages/adm/AdmProjects'));
const AdmPosts = React.lazy(() => import('./pages/adm/AdmPosts'));
const AdmProfile = React.lazy(() => import('./pages/adm/AdmProfile'));

export default function App() {
  const location = useLocation();
  const { settings, profile, setSettings, setProfile } = useSettings();
  const { projects, setProjects } = useProjects();
  const { posts, setPosts } = usePosts();

  const cleanPath = location.pathname.toLowerCase().replace(/\/$/, '');
  const isAdmRoute = cleanPath.startsWith('/adm') || cleanPath === '/login';

  // Garante que o usuário sempre inicie no topo ao trocar de rota ou role até o #hash
  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };
      scrollToTarget();
      const timer = setTimeout(scrollToTarget, 120);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      {!isAdmRoute ? (
        <MultiLayerCanvas settings={settings}>
          {/* Cabeçalho 100% largura total com Liquid Glass estilo Lupa */}
          <Navbar profile={profile} />
          
          <main style={{ minHeight: '80vh', width: '100%' }}>
            <React.Suspense fallback={<div style={{ minHeight: '80vh' }} />}>
              <Routes>
                <Route path="/" element={<Home profile={profile} projects={projects} posts={posts} />} />
                <Route path="/projetos" element={<Projects projects={projects} />} />
                <Route path="/projetos/:slug" element={<ProjectDetail projects={projects} profile={profile} />} />
                <Route path="/blog" element={<Blog posts={posts} />} />
                <Route path="/blog/:slug" element={<BlogPost posts={posts} profile={profile} />} />
                <Route path="/sobre" element={<Sobre profile={profile} />} />
                <Route path="/contato" element={<Contato profile={profile} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Suspense>
          </main>

          {/* Rodapé 100% largura total */}
          <Footer profile={profile} />

          {/* Botão flutuante do WhatsApp fixo e sempre visível */}
          <WhatsAppButton number={profile?.whatsapp_number} />
        </MultiLayerCanvas>
      ) : (
        <React.Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/adm"
              element={
                <ProtectedRoute>
                  <AdmDashboard profile={profile} />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdmStyle settings={settings} setSettings={setSettings} />} />
              <Route path="estilo" element={<AdmStyle settings={settings} setSettings={setSettings} />} />
              <Route path="projetos" element={<AdmProjects projects={projects} setProjects={setProjects} />} />
              <Route path="posts" element={<AdmPosts posts={posts} setPosts={setPosts} />} />
              <Route path="perfil" element={<AdmProfile profile={profile} setProfile={setProfile} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Suspense>
      )}
    </>
  );
}
