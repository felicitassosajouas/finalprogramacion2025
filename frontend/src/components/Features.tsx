// export const Features = () => {
//     const services = [
//         { img: "/images/icons/luggage.png", text: "Valija inteligente" },
//         { img: "/images/icons/star.png", text: "Recomendaciones de eventos y actividades" },
//         { img: "/images/icons/map.png", text: "Mapa interactivo" },
//         { img: "/images/icons/foot.png", text: "Descubrí los Free Walking Tours" },
//     ];

//     return (
//         <div className="bg-white py-16 px-4">
//         <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
//             {services.map((s, i) => (
//             <div key={i} className="flex flex-col items-center text-center group">
//                 <div className="mb-6 transition-transform group-hover:scale-110 duration-300">
//                 <img 
//                     src={s.img} 
//                     alt={s.text} 
//                     className="w-16 h-16 object-contain" 
//                 />
//                 </div>
//                 <p className="text-gray-600 font-semibold text-lg leading-snug max-w-[200px]">
//                 {s.text}
//                 </p>
//             </div>
//             ))}
//         </div>
//         </div>
//     );
// };

export const Features = () => {
    const services = [
        { img: "/images/icons/luggage.png", text: "Valija inteligente" },
        { img: "/images/icons/star.png", text: "Recomendaciones de eventos y actividades" },
        { img: "/images/icons/map.png", text: "Mapa interactivo" },
        { img: "/images/icons/foot.png", text: "Descubrí los Free Walking Tours" },
    ];

    return (
        <div className="py-20 px-4 transition-colors duration-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {services.map((s, i) => (
                    <div 
                        key={i} 
                        className="flex flex-col items-center text-center p-8 
                                   rounded-3xl
                                   bg-white/80 dark:bg-slate-800/60
                                   backdrop-blur-md
                                   shadow-xl
                                   hover:scale-105
                                   transition-all duration-300 group"
                    >
                        <div className="mb-6 transition-transform group-hover:scale-110 duration-300">
                            <img 
                                src={s.img} 
                                alt={s.text} 
                                className="w-16 h-16 object-contain" 
                            />
                        </div>
                        <p className="text-gray-700 dark:text-slate-300 font-semibold text-lg leading-snug">
                            {s.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};