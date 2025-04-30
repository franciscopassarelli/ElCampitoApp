import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const texts = [
  'Diversión, competencia y pasión por el Tenis.',
  'Reservá tu cancha y viví la experiencia.',
  'Torneos para todos los niveles.',
];

const Inicio = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [visibleText, setVisibleText] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Secuencia de aparición: imagen > texto > botón
    const timer1 = setTimeout(() => setShowImage(true), 200);
    const timer2 = setTimeout(() => setShowText(true), 1000);
    const timer3 = setTimeout(() => setShowButton(true), 1800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleText(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setVisibleText(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        background: 'radial-gradient(circle at center, #1e1e1e 0%, #000000 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: 3,
        overflow: 'hidden',
      }}
    >
      <img
        src="/elcampito.png"
        alt="Logo"
        style={{
          width: '350px',
          height: 'auto',
          objectFit: 'contain',
          marginBottom: '1rem',
          border: '3px solid white',
          borderRadius: '12px',
          boxShadow: '0 0 20px rgba(255,255,255,0.2)',
          opacity: showImage ? 1 : 0,
          transform: showImage ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s ease-in-out',
        }}
      />

      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          fontFamily: "'Poppins', sans-serif",
          color: '#ffffff',
          textAlign: 'center',
          maxWidth: '80%',
          opacity: showText && visibleText ? 1 : 0,
          transform: showText ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
        }}
      >
        {texts[currentTextIndex]}
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 'bold',
          textTransform: 'none',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          mt: 2,
          px: 4,
          opacity: showButton ? 1 : 0,
          transform: showButton ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.8s ease-in-out, transform 0.8s ease-in-out',
        }}
        component={Link}
        to="/scheduletable"
      >
        ¡Reservá tu cancha!
      </Button>

      {/* Ícono fijo de WhatsApp */}
      <div className="fixed bottom-4 right-4 z-50">
        <a href="https://api.whatsapp.com/send?phone=1167813287" className="btn-wsp">
          <i className="fab fa-whatsapp text-4xl text-white"></i>
        </a>
      </div>
    </Box>
  );
};

export default Inicio;
