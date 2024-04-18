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
                        <TextInput id="name1" type="text" placeholder="Ola Nordmann" required className="w-72"/>
                    </div>

                    <div className="flex flex-col">
                        <Label htmlFor="email1" value="E-post" className="text-white"/>
                        <TextInput id="email1" type="email" placeholder="ola@nordmann.no" required className="w-72"/>
                    </div>
                </div>

                    <div className="flex items-center mt-4 mb-4">
                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-white dark:text-gray-300">Jeg samtykker til Online Bankom sine Terms and conditions</label>
                    </div>
                </div>
                <h2 className="text-lg md:text-2xl mt-4 mb-3">Kvitteringsinformasjon</h2>
                <p className="text-base">Kort brukt til kjøpet</p>


                <div className="flex flex-row mt-4">
                    <div className="flex items-center mb-4 mr-10">
                        <input id="kort-1" type="radio" name="kort" value="Eget" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked/>
                        <label htmlFor="kort-1" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300 text-white">
                        Eget kort
                        </label>

                    </div>

                    <div className="flex items-center mb-4">
                        <input id="kort-2" type="radio" name="kort" value="Online" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="kort-2" className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-30 text-white">
                        Onlines Bankkort
                        </label>
                    </div>
                </div>

                <div className="flex flex-row md:text-left">
                    <div className="flex flex-col mr-20">
                        <Label htmlFor="kontonummer1" value="Kontonummer" className="text-white"/>
                        <TextInput id="kontonummer1" type="number" placeholder="2345 xx xxxx" required className="w-72"/> 
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="beløp1" value="Beløp" className="text-white"/>
                        <TextInput id="beløp1" type="number" placeholder="100" required className="w-72"/> 
                    </div>
                </div>

                <div className="flex flex-row md:text-left">
                    <div className="flex flex-col mr-20">
                        <Label htmlFor="anledning1" value="Anledning" className="text-white"/>
                        <TextInput id="anledning1" type="text" placeholder="Arbeidskveld" required className="w-72"/> 
                    </div>

                    <div className="flex flex-col">
                        <form>
                        <label htmlFor="ansvarlig1" className="block text-sm font-medium text-white dark:text-white w-72">Select your country</label>
                            <select id="ansvarlig1" className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option>Appkom</option>
                                <option>Velkom</option>
                                <option>Backlog</option>
                                <option>Prokom</option>
                                <option>Arrkom</option>
                                <option>Bankkom</option>
                                <option>Bedkom</option>
                                <option>FeminIT</option>
                                <option>OIL</option>
                                <option>Fagkom</option>
                                <option>Trikom</option>
                                <option>Annet</option>
                            </select>
                        </form>
                    </div>
                </div>
        </div>
    );
};

export default ReceiptRegular;
