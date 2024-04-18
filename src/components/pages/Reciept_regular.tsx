import { Button, Checkbox, Label, TextInput } from "flowbite-react";

const ReceiptRegular = () => {
    const username: String = "Ola Nordmann";

    return (
        <div className="flex flex-col items-center justify-center h-full m-4 md:m-12">
            <div id="Header" className="flex flex-col md:flex-row w-full items-center justify-center text-center md:text-left">
                <h1 className='text-3xl md:text-7xl mr-0 md:mr-40 mb-4 md:mb-0'>Kvitteringskjema</h1>
                <img src='/resources/reciept_page/Mann.png' alt='Mann' className="w-24 md:w-32" />
            </div>

            <div id="UnderHeader" className="flex flex-col md:flex-row items-center justify-center mt-6 md:mt-10 text-center md:text-left">
                <div className="mb-4 md:mb-0 md:mr-10">
                    <h2 className="text-xl md:text-4xl font-thin">Har du en onlinebruker?</h2>
                    <h3 className="text-sm md:text-lg font-extralight text-center">La oss hente kontaktinfoen din for deg!</h3>
                </div>
                <Button className="bg-white text-black">
                    <img src="resources/logo/online-logo-blue.png" className="h-5 mr-2" alt="Logo"></img>
                    Hent kontaktinformasjon
                </Button>
            </div>

            <div id="Content" className="flex flex-col md:flex-col w-full items-center justify-center mt-6 md:mt-10 text-center md:text-left">
                <h2 className="text-lg md:text-2xl mb-3">Kontaktinformasjon</h2>
                <div className="flex flex-row">
                    <div className="flex flex-col mr-20">
                        <Label htmlFor="name1" value="Navn" className="text-white"/>
                        <TextInput id="name1" type="text" placeholder="Ola Nordmann" required />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="email1" value="E-post" className="text-white"/>
                        <TextInput id="email1" type="email" placeholder="ola@nordmann.no" required />
                    </div>
                </div>
                    <div className="flex items-center mt-4 mb-4">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-white dark:text-gray-300">Jeg samtykker til Online Bankom sine Terms and conditions</label>
                    </div>
                </div>
                <h2 className="text-lg md:text-2xl mt-4 mb-3">Kvitteringsinformasjon</h2>
        </div>
    );
};

export default ReceiptRegular;
