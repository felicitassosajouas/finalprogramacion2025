import Header from "../components/Header";
import { Carousel } from "../components/Carousel";
import { Features } from "../components/Features";
import "../index.css";
export default function MainView() {
    return (
        <div className="bg-[#f9faf5] flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-grow">
                <div className="text-center pt-12 pb-4 bg-white">
                    <h1 className="bg-[#f9faf5]  text-4xl md:text-5xl font-bold text-[#fd6303]">
                        Planificá tu propio viaje
                    </h1>
                </div>
                <Carousel />
                <Features />
            </main>
            <footer className="bg-[#fd6303] py-3 px-3 text-white py-6 text-center">
                <p>© 2026 Rumbo – Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
