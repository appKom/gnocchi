import FrontInfo from "../components/FrontInfo"
import Topbar from "../components/TopBar"
import Bottombar from "../components/BottomBar"
import Button from "../components/universal/Button"
import happy from "../components/happy.png"
import { useAuth0 } from "@auth0/auth0-react"
export default function frontPage()
{
    const { isAuthenticated, loginWithRedirect } = useAuth0();
    return (<body className="bg-[#2E6E53] md:flex flex-col space-y-4 xs:h-auto ph:h-screen">
    <Topbar/>
    <FrontInfo/>
    <Bottombar/>
    <div className="z-30">
        <header className="w-1/2 text-white text-5xl font-bold z-30 px-10">Autobank</header>
        <div className="flex flex-row items-center space-x-4 mx-10">
            <div className="w-1/2">
                <p className="text-white px-20 text-left text-xl">
                Trenger du økonomisk støtte til diverse arrangement?
                Autobank er et hjelpemiddel for studenter i Online som ønsker å søke om økonomisk støtte eller sende inn kvitteringer for personlige utlegg.
                Onlines økonomiansvarlige vil behandle dine henvendelser fortløpende. Følg med i din profil for å se statusoppdateringer på dine saker.
                </p>
            </div>

            <div className="w-1/2 ">
            <img src={happy} alt="" className="money-honey px-20"/>
            </div>
        </div>
        <div className="flex w-1/2 flex-row items-center justify-center space-x-10">
        {!isAuthenticated && <Button title={"Logg inn ->"} color={"green"} onClick={()=>loginWithRedirect()}></Button>}
            
            <Button title={"FAQ"} color={"white"} href="/faq"></Button>
            <Button title={"Kontakt"} color={"white"} href="mailto:appkom@online.ntnu.no" ></Button>
        </div>
    </div>
    </body>)
}