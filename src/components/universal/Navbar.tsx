const Navbar = () => {

  const username: String = "Ola Nordmann";
  
  
  return (
    <div className="bg-[#2e6e53] flex"> 
        <div className="flex items-center w-full justify-self-start" >
            <img src="resources/logo/online-logo-white.png" className="h-12 m-3 w-auto cursor-pointer hidden dark:block"></img>
            <p className="text-[25px] font-semibold text-white">Autobank</p>
            <div className="flex justify-self-end absolute right-[20px] gap-10 items-center">
              <a className="text-white text-[20px] cursor-pointer" href="/kvittering">Kvittering</a>
              <a className="text-white  text-[20px] cursor-pointer" href="/soknad">Søknad</a>
              <a className="text-white  text-[20px] cursor-pointer" href="/minside">Min side</a>
              <button className="flex rounded-[15px] items-center justify-center relativ p-4  h-[50px] bg-white justify-self-end">
                <img src="resources/logo/online-logo-blue.png" className="h-5 mr-2"></img>
                {username === null ? <a href="/login">Logg inn</a> : <p>{username}</p>}
              </button>
            </div>
        </div>
    </div>
  );
}

export default Navbar;