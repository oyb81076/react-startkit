import React, { Suspense } from 'react';

import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Suspense fallback={<>Loading Component</>}>
      <AppRoutes />
    </Suspense>
  );
}
export default App;
