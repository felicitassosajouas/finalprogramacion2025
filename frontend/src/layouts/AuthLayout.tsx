import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export default function AuthLayout() {
    return (
        <>
            {/* Cambiamos bg-slate-800 por bg-bg-crema (tu variable de Tailwind 4) */}
            <div className="bg-bg-crema min-h-screen flex items-center justify-center">
                <div className="w-full max-w-lg mx-auto px-5">
                    <div className="py-10">
                        <Outlet />
                    </div>
                </div>
            </div>
            {/* Mantenemos el Toaster para las notificaciones de login/registro */}
            <Toaster position='top-right' richColors />
        </>
    )
}