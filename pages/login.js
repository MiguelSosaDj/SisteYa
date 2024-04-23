// pages/login.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';


function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const togglePasswordVisibility = () => {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const getCSRFToken = () => {
        const csrfCookie = document.cookie.split(';')
          .find(cookie => cookie.trim().startsWith('csrftoken='));
        if (csrfCookie) {
          return csrfCookie.split('=')[1];
        } else {
          console.error('CSRF token not found in cookies');
          return '';
        }
      };
      
      const csrfToken = getCSRFToken();
      
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRFToken': csrfToken,
        },
        body: new URLSearchParams(formData).toString(),
      });
      const data = await response.json();

      if (response.ok && data.success) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-center text-3xl font-bold mb-8">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block shadow-inner	text-gray-700 text-sm font-bold mb-2">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <input type="checkbox" onClick={togglePasswordVisibility} className="mr-2 leading-tight"/>
            <label htmlFor="showPassword" className="text-gray-700 text-sm">Mostrar contraseña</label>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Iniciar Sesión
          </button>
        </form>
        <div className="text-center mt-4">
          ¿Necesitas una cuenta? <a href="/register" className="text-blue-500">Registrar</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;