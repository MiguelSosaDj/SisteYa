import React, { useState, useEffect } from 'react';
import { BsPlus, BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Modal from '../components/Modal';
import '../styles/globals.css';

const Dashboard = () => {
  const [microcreditos, setMicrocreditos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmployee, setIsEmployee] = useState(true);


  useEffect(() => {
    obtenerMicrocreditos();
  }, []);

  const obtenerMicrocreditos = async () => {
    try {
      const response = await fetch('http://localhost:8000/obtener_microcreditos/');
      if (response.ok) {
        let data = await response.json();
        // Ordenar los microcréditos por fecha de inicio en orden descendente
        data = data.sort((a, b) => new Date(b.init_date) - new Date(a.init_date));
        setMicrocreditos(data);
      } else {
        console.error('Error al obtener los microcréditos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener los microcréditos:', error);
    }
  };


  const handleOpenModal = () => {
    debugger
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const handleSaveMicrocredit = async (microcreditData) => {
    try {
      const queryParams = new URLSearchParams();
      Object.keys(microcreditData).forEach(key => {
        queryParams.append(key, microcreditData[key]);
      });

      const response = await fetch(`http://localhost:8000/crear_microcredito/?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Microcrédito guardado exitosamente.');
        setIsModalOpen(false);
        obtenerMicrocreditos(); 
      } else {
        console.error('Error al guardar el microcrédito:', response.status);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = microcreditos.slice(indexOfFirstItem, indexOfLastItem);

  const goToPrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Dashboard de Microcréditos</h1>
      {isEmployee && (
        <button 
          onClick={handleOpenModal} 
          className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none`}
        >
          <BsPlus className="mr-2" />Agregar Microcrédito
        </button>
      )}
      <br></br>
      <a href="login" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none">Cerrar sesión</a>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveMicrocredit} />
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 text-left">Trade</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(microcredito => (
              <tr key={microcredito.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{microcredito.trade}</td>
                <td className="py-2 px-4">{microcredito.amount}</td>
                <td className="py-2 px-4">{microcredito.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between p-4">
          <button 
            onClick={goToPrevPage} 
            disabled={currentPage === 1} 
            className="text-gray-500 focus:outline-none"
          >
            <BsChevronLeft />
          </button>
          <button 
            onClick={goToNextPage} 
            disabled={indexOfLastItem >= microcreditos.length} 
            className="text-gray-500 focus:outline-none"
          >
            <BsChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;