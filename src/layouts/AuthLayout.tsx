// src/layouts/AuthLayout.tsx
import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 px-4 py-8 sm:px-6 lg:px-8">
      {/* Container untuk konten login, bisa disesuaikan lebarnya */}
      <div className="w-full max-w-md">
        <Outlet /> {/* Di sinilah LoginPage.tsx atau Register.tsx akan dirender */}
      </div>
    </div>
  );
}

export default AuthLayout;
