import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center justify-center text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Clasfy</h1>
          <p className="text-gray-500 mt-1 md:mt-2">Platform Manajemen Kelas Digital Terintegrasi</p>
          <p className="text-gray-500 mt-1 md:mt-2">untuk Guru dan Siswa.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          {children}
        </div>
        <div className="mt-4 text-center text-xs md:text-sm text-gray-500">
          &copy; {new Date().getFullYear()} | Clasfy by Mas Alfy. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 
