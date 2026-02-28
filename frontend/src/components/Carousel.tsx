// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const initialImages = [
//     "/images/diquePotrerillos.jpg",
//     "/images/portonesParqueSanMartin.jpg",
//     "/images/Arístides.jpg",
//     "/images/teatroIndependencia.jpg",
//     "/images/CerroDeLaGloria.jpg"
// ];

// export const Carousel = () => {
//     const [images, setImages] = useState(initialImages);
//     const [isTransitioning, setIsTransitioning] = useState(false);

//     const handleNext = () => {
//         if (isTransitioning) return;
//         setIsTransitioning(true);

//         setImages((prev) => {
//             const [first, ...rest] = prev;
//             return [...rest, first];
//         });
//     };

//     const handlePrev = () => {
//         if (isTransitioning) return;
//         setIsTransitioning(true);

//         setImages((prev) => {
//             const last = prev[prev.length - 1];
//             const rest = prev.slice(0, prev.length - 1);
//             return [last, ...rest];
//         });
//     };

//     useEffect(() => {
//         const timer = setTimeout(() => setIsTransitioning(false), 700);
//         return () => clearTimeout(timer);
//     }, [images]);

//     useEffect(() => {
//         const interval = setInterval(handleNext, 3000);
//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="relative w-full max-w-7xl mx-auto py-14 overflow-hidden group transition-colors duration-300">

//             <div className="flex justify-center items-center gap-6 px-[10%]">
//                 {images.map((src, index) => {
//                     const isCenter = index === 2;
//                     const isVisible = index >= 0 && index <= 4;
//                     if (!isVisible) return null;

//                     return (
//                         <div
//                             key={src}
//                             className={`transition-all duration-700 ease-in-out rounded-3xl bg-cover bg-center shadow-2xl
//                                 ${isCenter
//                                     ? "min-w-[40%] h-80 z-10 scale-110 opacity-100 ring-4 ring-orange-500/20"
//                                     : "min-w-[20%] h-64 opacity-40 scale-90 blur-[1px]"
//                                 }
//                             `}
//                             style={{ backgroundImage: `url(${src})` }}
//                         />
//                     );
//                 })}
//             </div>

//             <button
//                 onClick={handlePrev}
//                 className="absolute left-8 top-1/2 -translate-y-1/2 
//                            bg-white dark:bg-slate-800
//                            text-gray-800 dark:text-white
//                            p-3 rounded-full shadow-xl 
//                            hover:bg-orange-600 hover:text-white 
//                            transition-all z-20"
//             >
//                 <ChevronLeft size={28} />
//             </button>

//             <button
//                 onClick={handleNext}
//                 className="absolute right-8 top-1/2 -translate-y-1/2 
//                            bg-white dark:bg-slate-800
//                            text-gray-800 dark:text-white
//                            p-3 rounded-full shadow-xl 
//                            hover:bg-orange-600 hover:text-white 
//                            transition-all z-20"
//             >
//                 <ChevronRight size={28} />
//             </button>

//         </div>
//     );
    
// };

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const initialImages = [
    "/images/diquePotrerillos.jpg",
    "/images/portonesParqueSanMartin.jpg",
    "/images/Arístides.jpg",
    "/images/teatroIndependencia.jpg",
    "/images/CerroDeLaGloria.jpg"
];

export const Carousel = () => {
    const [images, setImages] = useState(initialImages);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(2); // centro

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        setImages((prev) => {
            const [first, ...rest] = prev;
            const newArr = [...rest, first];

            const centerImage = newArr[2];
            setCurrentIndex(initialImages.indexOf(centerImage));

            return newArr;
        });
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);

        setImages((prev) => {
            const last = prev[prev.length - 1];
            const rest = prev.slice(0, prev.length - 1);
            const newArr = [last, ...rest];

            const centerImage = newArr[2];
            setCurrentIndex(initialImages.indexOf(centerImage));

            return newArr;
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsTransitioning(false), 700);
        return () => clearTimeout(timer);
    }, [images]);

    useEffect(() => {
        const interval = setInterval(handleNext, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-7xl mx-auto py-14 overflow-hidden group transition-colors duration-300">

            {/* IMÁGENES 3D */}
            <div className="flex justify-center items-center gap-6 px-[10%]">
                {images.map((src, index) => {
                    const isCenter = index === 2;
                    const isVisible = index >= 0 && index <= 4;
                    if (!isVisible) return null;

                    return (
                        <div
                            key={src}
                            className={`transition-all duration-700 ease-in-out rounded-3xl bg-cover bg-center shadow-2xl
                                ${isCenter
                                    ? "min-w-[40%] h-80 z-10 scale-110 opacity-100 ring-4 ring-orange-500/20"
                                    : "min-w-[20%] h-64 opacity-40 scale-90 blur-[1px]"
                                }
                            `}
                            style={{ backgroundImage: `url(${src})` }}
                        />
                    );
                })}
            </div>

            {/* BOTONES */}
            <button
                onClick={handlePrev}
                className="absolute left-8 top-1/2 -translate-y-1/2 
                           bg-white dark:bg-slate-800
                           text-gray-800 dark:text-white
                           p-3 rounded-full shadow-xl 
                           hover:bg-orange-600 hover:text-white 
                           transition-all z-20"
            >
                <ChevronLeft size={28} />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-8 top-1/2 -translate-y-1/2 
                           bg-white dark:bg-slate-800
                           text-gray-800 dark:text-white
                           p-3 rounded-full shadow-xl 
                           hover:bg-orange-600 hover:text-white 
                           transition-all z-20"
            >
                <ChevronRight size={28} />
            </button>

            {/* DOTS ABAJO (FUERA DE LA IMAGEN) */}
            <div className="flex justify-center mt-10 gap-4">
                {initialImages.map((_, index) => (
                    <div
                        key={index}
                        className={`transition-all duration-300 rounded-full
                            ${
                                currentIndex === index
                                    ? "w-8 h-3 bg-orange-500"
                                    : "w-3 h-3 bg-gray-300 dark:bg-slate-600"
                            }
                        `}
                    />
                ))}
            </div>

        </div>
    );
};