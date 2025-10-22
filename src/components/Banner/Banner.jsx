import bannerImg from "../../resources/sale.jpg"

const Banner = () => (
    <section className="col-span-4">
        <div className="relative flex flex-col h-48 sm:h-64 md:h-80 lg:h-96 w-full bg-center bg-no-repeat rounded aspect-[16/9] lg:aspect-auto overflow-hidden" 
        style={{ 
            backgroundImage: `url(${bannerImg})`, 
            backgroundSize: 'cover'}}
            role="img" 
            aria-label="promotional banner">
            <p className="flex flex-col items-center text-4xl lg:text-6xl text-[#393D47] font-extrabold text-shadow-cyan-500 text-shadow-xs">
                NEW YEAR
                <span>SALE</span>
            </p>
            <p className="text-2xl lg:text-4xl text-end text-[#393D47] font-bold pr-4">save up to <span>50%</span>off</p>
            <div className="flex justify-center mt-auto mb-4">
                <button className="text-xl lg:text-3xl text-white font-semibold custom-border custom-shadow bg-main-color rounded cursor-pointer duration-500 hover:scale-110 hover:bg-white hover:text-black p-2" aria-label="See more about the sale">See more</button>
            </div>
        </div>
    </section>
)
export default Banner;