import videoCard from "../../resources/RTX5090.jpg"

const Poster = () => (

    <section className="col-span-full lg:col-span-3 mt-3">
        <div className="h-full w-full bg-cover bg-center bg-no-repeat rounded flex flex-col justify-between overflow-hidden" style={{ backgroundImage: `url(${videoCard})` }}>
            <div className="text-6xl text-white text-center m-2">BIG SALE 20%</div>
            <div className="flex flex-col items-center">
                <div className="text-xl text-white">The bestseller of 2025 year</div>
                <h1 className="text-2xl text-white">LENNON r2d2 with NVIDIA 5090 TI</h1>
            </div>
        </div>
    </section>
);


export default Poster;