const ReceiptRegular = () => {
    const username: String = "Ola Nordmann";

    return (
        <div className="flex flex-col items-center justify-center w-full h-full m-4 md:m-12">
            <div id="Header" className="flex flex-col md:flex-row w-full items-center justify-center text-center md:text-left">
                <h1 className='text-3xl md:text-7xl mr-0 md:mr-40 mb-4 md:mb-0'>Kvitteringskjema</h1>
                <img src='/resources/reciept_page/Mann.png' alt='Mann' className="w-24 md:w-32" />
            </div>
            <div id="UnderHeader" className="flex flex-col md:flex-row w-full items-center justify-center mt-6 md:mt-10 text-center md:text-left">
                <div className="mb-4 md:mb-0 md:mr-10">
                    <h2 className="text-xl md:text-4xl font-thin">Har du en onlinebruker?</h2>
                    <h3 className="text-sm md:text-lg font-extralight text-center">La oss hente kontaktinfoen din for deg!</h3>
                </div>
                <button className="flex rounded-[15px] items-center justify-center relative py-2 px-4 h-[50px] bg-white">
                    <img src="resources/logo/online-logo-blue.png" className="h-5 mr-2" alt="Logo"></img>
                    {username === null ? <a href="/login">Logg inn</a> : <p>{username}</p>}
                </button>
            </div>
        </div>
    );
};

export default ReceiptRegular;
