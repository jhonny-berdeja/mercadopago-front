// app/redirect/page.js
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function MercadoPagoRedirectPage() {
  // Estado para almacenar y mostrar el resultado
  const [statusResult, setStatusResult] = useState({ title: '', message: '', style: '', params: '' });

  // Hook para acceder a los parámetros de la URL
  const searchParams = useSearchParams();
  const status = searchParams.get('status');

  // Ejecutar la lógica de manejo de estado solo cuando los parámetros estén disponibles
  useEffect(() => {
    if (status) {
      // 1. Mostrar todos los parámetros recibidos
      const paramsString = Array.from(searchParams.entries())
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

      let title = 'Mercado Pago Checkout';
      let message = 'Detalles de la Transacción:';
      let styleClass = '';

      // 2. Lógica para manejar cada estado
      if (status.includes('success')) {
        // Usamos includes por si tiene doble igual
        title = '🎉 ¡Pago Aprobado!';
        message = 'Gracias por tu compra. La orden está confirmada.';
        styleClass = 'success';
      } else if (status.includes('pending')) {
        title = '⚠️ Pago Pendiente';
        message = 'Tu pago está pendiente de confirmación. Te notificaremos.';
        styleClass = 'pending';
      } else if (status.includes('failure')) {
        title = '❌ El Pago Fue Rechazado';
        message = 'La transacción no pudo completarse.';
        styleClass = 'failure';
      } else {
        title = '❓ Estado Desconocido';
      }

      // Actualizar el estado con el resultado
      setStatusResult({ title, message, style: styleClass, params: paramsString });
    } else {
      // Manejar el caso si se accede a /redirect sin parámetros
      setStatusResult({
        title: 'Error de Redirección',
        message: 'No se encontraron parámetros de estado en la URL.',
        style: 'failure',
        params: 'No hay parámetros de transacción.',
      });
    }
  }, [status, searchParams]);

  // --- RENDERIZADO DEL RESULTADO ---
  return (
    <div className="container">
      <h1 className={statusResult.style}>{statusResult.title}</h1>
      <p>{statusResult.message}</p>

      {statusResult.params && (
        <div id="statusContainer" style={{ display: 'block' }}>
          <h2>Detalles de la Transacción (MP Redirección):</h2>
          <h3>Parámetros recibidos:</h3>
          <pre style={{ textAlign: 'left', padding: '10px', backgroundColor: '#f9f9f9', border: '1px solid #ddd' }}>{statusResult.params}</pre>
        </div>
      )}
    </div>
  );
}
