import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importamos react-router-dom
import Navbar from './components/Navbar'; // Importamos el componente Navbar
import Inicio from './components/Inicio'; // Importamos el componente Inicio
import ScheduleTable from './components/ScheduleTable'; // Importamos el componente ScheduleTable
import './App.css'; // Importamos el archivo CSS
import Clima from './components/widgets/ApiClima/Clima'
import Lluvia from './components/widgets/ApiClima/Lluvia'


const App = () => {
  return (
    <Router>
      <Navbar /> {/* Incluimos el componente Navbar */}
      <Routes>
        <Route path="/" element={<Inicio />} /> {/* Página de inicio */}
        <Route path="/scheduletable" element={<ScheduleTable />} /> {/* Página de menú */}
        <Route path="/clima" element={<Clima />} /> {/* Página de clima */}
        <Route path="/lluvia" element={<Lluvia />} /> 
      </Routes>
    </Router>
  );
};

export default App;
