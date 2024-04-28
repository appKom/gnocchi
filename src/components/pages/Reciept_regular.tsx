import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { SetStateAction, useState } from "react";

const ReceiptRegular = () => {
    const [komite, setKomite] = useState("");

    const handleSelectChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setKomite(event.target.value);
    };

    return (
        <div className="flex flex-col items-center justify-center m-4 md:m-12">
            <div id="Header" className="flex flex-col md:flex-row w-full items-center justify-center text-center md:text-left">
                <h1 className='text-3xl md:text-7xl mr-0 md:mr-40 mb-4 md:mb-0'>Kvitteringskjema</h1>
                <img src='/resources/reciept_page/Mann.png' alt='Mann' className="w-24 md:w-32" />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center mt-6 md:mt-10">
                <div className="mb-4 md:mb-0 md:mr-10 text-center md:text-left">
                    <h2 className="text-xl md:text-3xl font-thin">Har du en onlinebruker?</h2>
                    <h3 className="text-sm md:text-lg font-extralight mt-2">La oss hente kontaktinfoen din for deg!</h3>
                </div>
                <Button className="bg-white text-black">
                    <img src="resources/logo/online-logo-blue.png" className="h-5 mr-2" alt="Logo"></img>
                    Hent kontaktinformasjon
                </Button>
            </div>
            <div className="flex flex-col md:flex-col items-center justify-center mt-6 md:mt-10">
                <h2 className="text-lg md:text-2xl mb-3">Kontaktinformasjon</h2>
                <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col md:mr-8 mb-4">
                        <Label htmlFor="name1" value="Navn" className="text-white"/>
                        <TextInput id="name1" type="text" placeholder="Ola Nordmann" required className="w-full md:w-72"/>
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="email1" value="E-post" className="text-white"/>
                        <TextInput id="email1" type="email" placeholder="ola@nordmann.no" required className="w-full md:w-72"/>
                    </div>
                </div>
                <div className="flex items-center mt-4 mb-4">
    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-white dark:text-gray-300 sm:w-48 md:w-auto">Jeg samtykker til Online Bankom sine Terms and conditions</label>
</div>

            </div>
            <div className="flex flex-col items-center justify-center mt-6 md:mt-10">
                <h2 className="text-lg md:text-2xl mb-3">Kvitteringsinformasjon</h2>
                <p className="text-base text-center">Kort brukt til kjøpet</p>
                <div className="flex flex-col md:flex-row mt-4">
                    <div className="flex items-center mb-4 md:mb-0 md:mr-8">
                        <input id="kort-1" type="radio" name="kort" value="Eget" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked/>
                        <label htmlFor="kort-1" className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 text-white">
                            Eget kort
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input id="kort-2" type="radio" name="kort" value="Online" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="kort-2" className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-30 text-white">
                            Onlines Bankkort
                        </label>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center mt-4">
                    <div className="flex flex-col md:mr-8">
                        <Label htmlFor="kontonummer1" value="Kontonummer" className="text-white"/>
                        <TextInput id="kontonummer1" type="number" placeholder="2345 xx xxxx" required className="w-full md:w-72"/> 
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="beløp1" value="Beløp" className="text-white"/>
                        <TextInput id="beløp1" type="number" placeholder="100" required className="w-full md:w-72"/> 
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center mt-4">
                    <div className="flex flex-col md:mr-8">
                        <Label htmlFor="anledning1" value="Anledning" className="text-white"/>
                        <TextInput id="anledning1" type="text" placeholder="Arbeidskveld" required className="w-full md:w-72"/> 
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="ansvarlig1" value="Ansvarlig" className="text-white"/>
                        <select id="ansvarlig1" value={komite} onChange={handleSelectChange} className="w-full md:w-72 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value ="Appkom">Appkom</option>
                            <option value ="Velkom">Velkom</option>
                            <option value = "Backlog">Backlog</option>
                            <option value="Prokom">Prokom</option>
                            <option value="Arrkom">Arrkom</option>
                            <option value = "Bankkom">Bankkom</option>
                            <option value ="Bedkom">Bedkom</option>
                            <option value = "FeminIT">FeminIT</option>
                            <option value = "OIL">OIL</option>
                            <option value = "Fagkom">Fagkom</option>
                            <option value="Trikom">Trikom</option>
                            <option value="Annet">Annet</option>
                        </select>
                    </div>
                </div>
                <div className="w-full md:w-3/5 text-center md:text-justify mt-6">
                    <h1 className="text-base">Vedlegg/kvittering</h1>
                    <p className="text-base mt-4">Last opp et tydelig bilde/scan av kvitteringen. Husk at kvitteringen må være gyldig for at den skal godkjennes.</p>
                    <p className="text-base">Er du usikker på om kvitteringen er gyldig? Se her</p>
                </div>
                <div className="w-full md:w-3/5 mt-6">
                    <form className="max-w-lg mx-auto">
                        <label className="text-white block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="kvittering">Vedlegg</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="kvittering" type="file"/>
                    </form>
                </div>
                <div className="w-full md:w-3/5 mt-6">
                    <form>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-white dark:text-white">Your message</label>
                        <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                    </form>
                </div>
                <div className="mt-10">
                    <button type="button" className="text-black bg-white hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Send til bankom</button>
                    <button type="button" className="text-black bg-white hover:bg-gray-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-8">Last ned PDF</button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptRegular;
