import { Link } from "react-router-dom";

const Categories = ({ title, products = [], amount }) => {
    const list = products.filter((_, i) => i < amount);
    return (
        <section className="col-span-4 max-w-full bg-main-color flex flex-col justify-center items-center rounded">
            <h2 className="text-2xl lg:text-4xl text-white font-bold custom-shadow my-4">{title}</h2>
            <div className="flex justify-center gap-2 flex-wrap">
                {list.map(({ id, name, image }) => (
                    <Link to={`/categories/${id}`} key={id} className="w-75 flex flex-col items-center text-center hover:text-white">
                        <div className="w-full h-full p-5">
                            <img src={image} alt="product" className="object-contain object-center rounded-2xl custom-border transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-amber-100" />
                        </div>
                        <h3 className="text-xl lg:text-2xl text-center  mb-3">{name}</h3>
                    </Link>
                ))}
            </div>
        </section >
    )
}
export default Categories;