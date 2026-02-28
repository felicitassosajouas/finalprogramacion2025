// import Header from "../components/Header";
// import { Carousel } from "../components/Carousel";
// import { Features } from "../components/Features";

// export default function MainView() {
//     return (
//         <div className="flex flex-col min-h-screen 
//                         bg-[#f9faf5] 
//                         dark:bg-slate-900 
//                         transition-colors duration-300">

//             <Header />

//             <main className="flex-grow">
//                 <div className="text-center pt-12 pb-4 
//                                 bg-white 
//                                 dark:bg-slate-900 
//                                 transition-colors duration-300">

//                     <h1 className="text-4xl md:text-5xl font-bold 
//                                    text-[#fd6303] 
//                                    dark:text-orange-400">
//                         Planificá tu propio viaje
//                     </h1>
//                 </div>

//                 <Carousel />
//                 <Features />
//             </main>

//             <footer className="bg-[#fd6303] 
//                                dark:bg-slate-800 
//                                py-6 px-3 
//                                text-white 
//                                text-center 
//                                transition-colors duration-300">
//                 <p>© 2026 Rumbo – Todos los derechos reservados.</p>
//             </footer>
//         </div>
//     ); 
// }

import Header from "../components/Header";
import { Carousel } from "../components/Carousel";
import { Features } from "../components/Features";

export default function MainView() {
    return (
        <div className="flex flex-col min-h-screen 
                        bg-[#f9faf5] 
                        dark:bg-slate-950 
                        transition-colors duration-300">

            <Header />

            <main className="flex-grow">

                <div className="text-center pt-16 pb-8">
                    <h1 className="text-4xl md:text-5xl font-bold 
                                   text-[#fd6303] 
                                   dark:text-orange-400 
                                   transition-colors">
                        Planificá tu propio viaje
                    </h1>
                    <p className="mt-4 text-gray-600 dark:text-slate-400 text-lg">
                        Descubrí experiencias únicas en Mendoza
                    </p>
                </div>

                <Carousel />
                <Features />
            </main>

            <footer className="bg-[#fd6303] 
                               dark:bg-slate-900 
                               py-6 px-3 
                               text-white 
                               text-center 
                               transition-colors duration-300">
                <p>© 2026 Rumbo – Todos los derechos reservados.</p>
            </footer>
        </div>
    ); 
}