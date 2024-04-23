import React, { useState } from 'react';

const Modal = ({ isOpen, onClose }) => {
  const [trade, setTrade] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('pendiente'); // Establecemos 'pendiente' como valor por defecto

  const handleSave = async () => {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('trade', trade);
      queryParams.append('amount', amount);
      queryParams.append('status', status);

      const response = await fetch(`http://localhost:8000/crear_microcredito/?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        onClose();
      } else {
        console.error('Error al crear el microcrédito:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el microcrédito:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Agregar Microcrédito</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Trade:</label>
              <input
                type="text"
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="pendiente">Pendiente</option>
                <option value="aprobado">Aprobado</option>
                <option value="rechazado">Rechazado</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Amount:</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded focus:outline-none">Cancelar</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

