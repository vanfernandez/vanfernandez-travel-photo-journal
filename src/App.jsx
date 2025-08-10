import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import EntryDetail from './pages/EntryDetail.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/entry/:id" element={<EntryDetail />} />
    </Routes>
  );
}
