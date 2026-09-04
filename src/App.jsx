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
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// CMS Admin Pages
import AdmDashboard from './pages/adm/AdmDashboard';
import AdmStyle from './pages/adm/AdmStyle';
import AdmProjects from './pages/adm/AdmProjects';
import AdmPosts from './pages/adm/AdmPosts';
import AdmProfile from './pages/adm/AdmProfile';

export default function App() {
  const location = useLocation();
  const { settings, profile, setSettings, setProfile } = useSettings();
  const { projects, setProjects } = useProjects();
  const { posts, setPosts } = usePosts();

  const cleanPath = location.pathname.toLowerCase().replace(/\/$/, '');
  const isAdmRoute = cleanPath.startsWith('/adm') || cleanPath === '/login';

  return (
    <>
      {!isAdmRoute ? (
        <MultiLayerCanvas settings={settings}>
          {/* Cabeçalho 100% largura total com Liquid Glass estilo Lupa */}
          <Navbar profile={profile} />
          
          <main style={{ minHeight: '80vh', width: '100%' }}>
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
          </main>

          {/* Rodapé 100% largura total */}
          <Footer profile={profile} />

          {/* Botão flutuante do WhatsApp fixo e sempre visível */}
          <WhatsAppButton number={profile?.whatsapp_number} />
        </MultiLayerCanvas>
      ) : (
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
      )}
    </>
  );
}
