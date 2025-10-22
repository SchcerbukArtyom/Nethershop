import ErrorImg from '../../resources/error.jpg'

const Error = ({ error, resetErrorBoundary }) => { 
    return (
        <div className="col-span-4 flex flex-col items-center justify-center p-4 border-2 border-white rounded-3xl">
            <h2 className="text-3xl text-white font-semibold text-center my-3">Something happening on this page...</h2>
            <img src={ErrorImg} alt="errorImage" />
            <p className="text-lg text-white my-4">Please, restart page</p>
            <button 
                onClick={resetErrorBoundary} 
                className="text-xl  font-semibold custom-border custom-shadow custom-btn">
                    Restart
            </button>
    </div>
    )
}

export default Error