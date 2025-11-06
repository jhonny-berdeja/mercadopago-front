'use client';

import { Suspense } from 'react';
import RedirectContent from './RedirectContent';

export default function MercadoPagoRedirectPage() {
  return (
    <Suspense fallback={<div>Cargando resultados de pago...</div>}>
      <RedirectContent />
    </Suspense>
  );
}
