// ScheduleTable.jsx (Solo Vista, sin nombres)
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Loader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <CircularProgress size={50} />
    <Typography variant="body1" sx={{ marginLeft: '10px' }}>Cargando...</Typography>
  </Box>
);

const ScheduleTable = () => {
  const today = new Date();
  const [currentDay, setCurrentDay] = useState(today);
  const [reservations, setReservations] = useState({});
  const [loading, setLoading] = useState(false);

  const times = Array.from({ length: 33 }, (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minutes}`;
  });

  useEffect(() => {
  const fetchReservations = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'reservations'));
      const resData = {};
      querySnapshot.forEach((doc) => {
        resData[doc.id] = doc.data();
      });
      setReservations(resData);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  fetchReservations();
}, []);

  const handleDateChange = async (date) => {
    setLoading(true);
    setCurrentDay(date);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula carga
    setLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, padding: '0', backgroundColor: '#2f2f2f', minHeight: '100vh', marginTop: '64px' }}>
     
      <Box sx={{ flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginBottom: { xs: '20px', md: '0' } }}>
        <Box 
          sx={{ 
            textAlign: 'center', 
            marginBottom: '20px',
            background: 'linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))',
            padding: '10px',
            borderRadius: '50%',
            width: '220px',
            height: '220px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img 
            src="/elcampito1.png" 
            alt="Logo" 
            style={{ 
              width:'200px',
              height:'200px',
              borderRadius:'50%',
              objectFit: 'contain'
            }} 
          />
        </Box>

      

        <Box>
          <Typography variant="h5" align="center" gutterBottom sx={{ color: '#fff' }}>
            Selecciona un día
          </Typography>
          <DatePicker
            selected={currentDay}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            inline
            todayButton="Hoy"
            locale={es}
          />
        </Box>
      </Box>

      <Box sx={{ flex: '3', padding: '20px' }}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              sx={{
                fontFamily: 'Georgia, serif',
                fontWeight: 'bold',
                color: '#fff',
                margin: '0 20px',
              }}
            >
              Horarios de Canchas - {format(currentDay, 'EEEE dd/MM/yyyy', { locale: es })}
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: { xs: '100%', md: '700px' },
                margin: '0 auto',
                borderRadius: '10px',
                overflow: 'hidden',
              }}
            >
              <Table size="small" sx={{ borderCollapse: 'collapse' }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ backgroundColor: '#343a40', color: '#fff', textAlign: 'center',   fontWeight: 'bold', padding: '2px', border: '1px solid black' }}>
                      Hora
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#343a40', color: '#fff', textAlign: 'center',   fontWeight: 'bold', padding: '2px', border: '1px solid black' }}>
                      Tenis 1
                    </TableCell>
                    <TableCell sx={{ backgroundColor: '#343a40', color: '#fff', textAlign: 'center',   fontWeight: 'bold', padding: '2px', border: '1px solid black' }}>
                      Tenis 2
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {times.map((time) => (
                    <TableRow key={time}>
                    <TableCell
  sx={{
    backgroundColor: '#343a40',
    color: '#fff',
    textAlign: 'center',
    padding: '2px',
    border: '1px solid black',
    fontWeight: 'bold',
    fontSize: '14px',
  }}
>
  {time}
</TableCell>



                      {[1, 2].map((court) => {
                        const key = `${format(currentDay, 'dd-MM-yyyy')}_${time}_${court}`;
                        const reservation = reservations[key];

                        return (
                          <TableCell
  key={court}
  sx={{
    backgroundColor: reservation
      ? (reservation.type === 'reservada_eventual' ? '#ffc107' : '#155724')
      : '#28a745',
    color: reservation
      ? (reservation.type === 'reservada_eventual' ? '#000' : '#fff')
      : '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: '2px',
    border: '1px solid black',
  }}
>
  {reservation
    ? (reservation.type === 'reservada_eventual' ? 'Eventual' : 'Fijo')
    : ''}
</TableCell>

                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
      <div className="fixed bottom-4 right-4 z-50">

<a href="https://api.whatsapp.com/send?phone=" className="btn-wsp">
  <i className="fab fa-whatsapp text-4xl text-white"></i> {/* Agrega el icono de WhatsApp */}
</a>
</div>
    </Box>
    
  );
};

export default ScheduleTable;
