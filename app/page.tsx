// app/page.js (Versión Simplificada)
'use client';

import { useState } from 'react';
// 🚫 Ya no necesitamos useSearchParams ni useEffect para la redirección aquí

export default function MercadoPagoCheckout() {
  const [statusMessage, setStatusMessage] = useState('');

  // ⚠️ URL de tu backend NestJS (¡Ajustar!)
  const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_NESTJS_BACKEND_BASE_URL;
  const NESTJS_BACKEND_URL = `${BACKEND_BASE_URL}/mercadopago/create-preference`;

  // --- LÓGICA DE CREACIÓN DE PREFERENCIA ---
  const handlePayClick = async () => {
    setStatusMessage('Creando preferencia de pago...');

    const preferenceData = {
      clientEmail: 'test_user_123456789@testuser.com',
      products: [
        {
          title: 'Producto de prueba',
          quantity: 1,
          price: 250,
        },
      ],
    };

    try {
      const response = await fetch(NESTJS_BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferenceData),
      });

      if (!response.ok) {
        throw new Error(`Error en el backend: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const initPoint = data.sandboxInitPoint;

      if (initPoint) {
        setStatusMessage('Redireccionando a Mercado Pago...');
        window.location.href = initPoint;
      } else {
        setStatusMessage('Error: No se recibió el punto de inicio de pago.');
      }
    } catch (error) {
      console.error('Fallo al crear la preferencia:', error);
      setStatusMessage(`Fallo en la conexión: Verifique el backend.`);
    }
  };

  // --- RENDERIZADO ---
  return (
    <div className="container">
      <h1>Mercado Pago Checkout</h1>
      <p>Presiona el botón para crear la preferencia de pago.</p>
      <button className="checkout-button" onClick={handlePayClick} disabled={statusMessage.includes('Creando')}>
        Pagar ARS 250 con NestJS/MP
      </button>
      <p style={{ marginTop: '20px' }}>{statusMessage}</p>
    </div>
  );
}
