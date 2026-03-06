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
    const [currentIndex, setCurrentIndex] = useState(2);

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
        const interval = setInterval(handleNext, 5000); // Aumenté a 5s para que no sea tan frenético
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-7xl mx-auto py-4 md:py-8 overflow-hidden group">

            {/* CONTENEDOR DE IMÁGENES */}
            <div className="flex justify-center items-center gap-2 md:gap-6 px-4 md:px-[10%]">
                {images.map((src, index) => {
                    const isCenter = index === 2;
                    // En móvil ocultamos las imágenes de los extremos (0 y 4) para que no ensucien
                    const isSide = index === 1 || index === 3;
                    
                    return (
                        <div
                            key={src}
                            className={`transition-all duration-700 ease-in-out rounded-2xl md:rounded-3xl bg-cover bg-center shadow-xl
                                ${isCenter
                                    ? "min-w-[70%] md:min-w-[40%] h-64 md:h-80 z-10 scale-105 md:scale-110 opacity-100 ring-4 ring-orange-500/20"
                                    : isSide 
                                        ? "min-w-[15%] md:min-w-[20%] h-48 md:h-64 opacity-40 scale-90 blur-[1px] hidden sm:block" 
                                        : "hidden md:block min-w-[20%] h-64 opacity-20 scale-75 blur-[2px]"
                                }
                            `}
                            style={{ backgroundImage: `url(${src})` }}
                        />
                    );
                })}
            </div>

            {/* BOTONES ADAPTADOS */}
            <button
                onClick={handlePrev}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 
                           bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
                           text-gray-800 dark:text-white
                           p-2 md:p-3 rounded-full shadow-lg 
                           hover:bg-orange-600 hover:text-white 
                           transition-all z-20"
            >
                <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
            </button>

            <button
                onClick={handleNext}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 
                           bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
                           text-gray-800 dark:text-white
                           p-2 md:p-3 rounded-full shadow-lg 
                           hover:bg-orange-600 hover:text-white 
                           transition-all z-20"
            >
                <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
            </button>

            {/* DOTS */}
            <div className="flex justify-center mt-6 md:mt-10 gap-2 md:gap-4">
                {initialImages.map((_, index) => (
                    <div
                        key={index}
                        className={`transition-all duration-300 rounded-full
                            ${currentIndex === index
                                ? "w-6 md:w-8 h-2 md:h-3 bg-orange-500"
                                : "w-2 md:w-3 h-2 md:h-3 bg-gray-300 dark:bg-slate-600"
                            }
                        `}
                    />
                ))}
            </div>
        </div>
    );
};