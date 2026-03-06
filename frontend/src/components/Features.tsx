import { useState } from "react";

export const Features = () => {
    const [activeCard, setActiveCard] = useState<number | null>(null);

    const services = [
        { 
            img: "/images/icons/luggage.png", 
            text: "Valija inteligente",
            back: "Armá tu equipaje según el clima y la duración del viaje"
        },
        { 
            img: "/images/icons/star.png", 
            text: "Recomendaciones personalizadas",
            back: "Descubrí experiencias adaptadas a tus gustos y preferencias"
        },
        { 
            img: "/images/icons/map.png", 
            text: "Mapa interactivo",
            back: "Explorá puntos turísticos con una experiencia dinámica"
        },
        { 
            img: "/images/icons/foot.png", 
            text: "Free Walking Tours",
            back: "Encontrá tours en distintos puntos de la provincia"
        },
    ];

    return (
        <div className="py-14 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                {services.map((s, i) => {
                    const isActive = activeCard === i;

                    return (
                        <div
                            key={i}
                            className="group cursor-pointer [perspective:1200px]"
                            onClick={() => setActiveCard(isActive ? null : i)}
                        >
                            <div
                                className={`relative h-56 w-full
                                transition-transform duration-[1600ms] ease-[cubic-bezier(.25,.8,.25,1)]
                                [transform-style:preserve-3d]
                                ${isActive ? "[transform:rotateY(180deg)]" : ""}
                                group-hover:[transform:rotateY(180deg)]
                                group-hover:-translate-y-1`}
                            >

                                {/* FRONT */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center
                                                p-8 rounded-3xl
                                                bg-white/70 dark:bg-slate-800/60
                                                backdrop-blur-xl
                                                shadow-2xl
                                                border border-white/30 dark:border-slate-700/40
                                                [backface-visibility:hidden]
                                                transition-shadow duration-700
                                                group-hover:shadow-orange-400/40">

                                    <div className="mb-6 transition-transform duration-700 group-hover:scale-105">
                                        <img 
                                            src={s.img} 
                                            alt={s.text} 
                                            className="w-16 h-16 object-contain drop-shadow-md" 
                                        />
                                    </div>

                                    <p className="text-gray-700 dark:text-slate-200 font-semibold text-lg text-center">
                                        {s.text}
                                    </p>
                                </div>

                                {/* BACK */}
                                <div className="absolute inset-0 flex items-center justify-center
                                                p-8 rounded-3xl
                                                bg-gradient-to-br from-[#fd6303] to-orange-500
                                                text-white
                                                shadow-2xl
                                                [transform:rotateY(180deg)]
                                                [backface-visibility:hidden]
                                                border border-orange-300/30">

                                    <p className="text-center font-medium text-lg leading-relaxed">
                                        {s.back}
                                    </p>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
