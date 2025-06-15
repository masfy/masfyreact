import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom'; // Pastikan react-router-dom terinstal
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
// Import MotionDiv jika Anda menggunakan Framer Motion. Jika tidak, hapus baris ini dan ganti <MotionDiv> dengan <div>
import { MotionDiv } from '../../components/ui/motion'; 

// Definisi skema validasi menggunakan Zod
const loginSchema = z.object({
  username: z.string().min(1, { message: 'Nama pengguna wajib diisi.' }),
  password: z.string().min(1, { message: 'Kata sandi wajib diisi.' }),
});

// Infer tipe dari skema Zod
type LoginFormValues = z.infer<typeof loginSchema>;

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { // Opsional: nilai default untuk form
      username: '',
      password: '',
    },
  });

  // Fungsi yang dipanggil saat form disubmit
  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null); // Reset error sebelumnya

    try {
      // --- SIMULASI PANGGILAN API LOGIN ---
      // GANTI BAGIAN INI DENGAN LOGIKA AUTENTIKASI API ASLI ANDA
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulasi penundaan 1.5 detik

      if (data.username === 'user' && data.password === 'password') {
        // Jika login berhasil
        console.log('Login berhasil:', data);
        // Simpan token atau info pengguna (contoh: ke localStorage)
        localStorage.setItem('userToken', 'dummy_jwt_token_for_user');
        // Arahkan ke halaman dashboard atau halaman yang sesuai setelah login
        navigate('/dashboard'); 
      } else {
        // Jika kredensial salah
        setError('Nama pengguna atau kata sandi salah.');
      }
    } catch (apiError) {
      // Tangani kesalahan dari panggilan API
      setError('Terjadi kesalahan saat login. Silakan coba lagi.');
      console.error('Login API error:', apiError);
    } finally {
      // Selalu hentikan loading setelah proses selesai (berhasil atau gagal)
      setLoading(false);
    }
  };

  return (
    // Menggunakan MotionDiv untuk animasi masuk. Jika tidak ada MotionDiv, ganti dengan <div> biasa.
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Kelas Tailwind untuk memusatkan konten dan memberikan latar belakang gradient
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 p-4 sm:p-6"
    >
      <Card className="w-full max-w-md mx-auto shadow-2xl rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Selamat Datang Kembali!
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600 dark:text-gray-400">
            Masuk untuk melanjutkan ke akun Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Nama Pengguna
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan nama pengguna Anda"
                {...register('username')}
                className={`w-full ${errors.username ? 'border-red-500 focus:ring-red-500' : ''}`}
                disabled={loading}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Kata Sandi
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan kata sandi Anda"
                {...register('password')}
                className={`w-full ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                disabled={loading}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Area untuk menampilkan pesan error umum dari server atau validasi kustom */}
            {error && (
              <p className="text-sm font-medium text-red-600 text-center bg-red-50 dark:bg-red-900/20 p-2 rounded-md border border-red-200 dark:border-red-900">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full py-2.5 text-lg font-semibold rounded-md transition-colors duration-200 flex items-center justify-center" // Tambah flex, items-center, justify-center untuk spinner
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Masuk...
                </>
              ) : (
                'Masuk'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm space-y-2"> {/* space-y-2 untuk jarak antar link */}
            <p className="text-gray-600 dark:text-gray-400">
              Belum punya akun?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Daftar sekarang
              </Link>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                Lupa kata sandi?
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}

export default LoginPage;
