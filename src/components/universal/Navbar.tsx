import React, { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';


const Navbar = () => {

  const username: String = "Ola Nordmann";
  const [showDropdownLogout, setShowDropdownLogout] = useState<Boolean>(false);
  const [showNavDropdown, setShowNavDropdown] = useState<Boolean>(false);

  const toggleLogoutDropdown = () => {
    setShowDropdownLogout(!showDropdownLogout);
  }

  const toggleNavbarDropdown = () => {
    setShowNavDropdown(!showNavDropdown);
  }


  return (
    <div className="bg-[#2e6e53] flex">
      <div className="flex items-center w-full justify-self-start">
        <img src="resources/logo/online-logo-white.png" className="h-12 m-3 w-auto cursor-pointer hidden dark:block"></img>
        <p className="text-[25px] font-semibold text-white">Autobank</p>
        <div className="flex justify-self-end absolute right-[20px] gap-10 items-center">
          <div className='flex justify-self-end md:static right-[20px] gap-10 items-center'>
            {/*
                Dropdown needs to look better
            */}
          <MenuIcon className='cursor-pointer md:!hidden text-white scale-[1.3]' onClick={() => toggleNavbarDropdown()} />

            <div className={(showNavDropdown ? "" : "hidden") + " border-[1px] border-green-800 flex rounded-[10px] flex-col absolute top-[50px] left-[-70px] bg-[#2e6e53] md:border-0 md:flex-row md:flex md:column md:static md:bg-inherit"}>
              <a className="text-white text-[20px] p-3  md:ml-4 rounded-[10px] hover:bg-green-800 cursor-pointer" href="/kvittering">Kvittering</a>
              <a className="text-white  text-[20px] p-3 md:ml-4 rounded-[10px] hover:bg-green-800 cursor-pointer" href="/soknad">Søknad</a>
              <a className="text-white  text-[20px] p-3 md:ml-4 rounded-[10px] hover:bg-green-800  cursor-pointer" href="/minside">Min side</a>
            </div>
          </div>
          <div>
            <button onClick={() => { if (username !== null) { toggleLogoutDropdown() } }} className="flex rounded-[15px] items-center justify-center relativ p-4  h-[50px] bg-white justify-self-end relative z-20">
              <img src="resources/logo/online-logo-blue.png" className="h-5 mr-2"></img>
              {username === null ? <a href="/login">Logg inn</a> : <p>{username}</p>}

            </button>
            {/* ? ????? 
              {showDropdownLogout && username !== null ? 
                <button className='flex rounded-[15px] items-center justify-center relativ p-4  h-[50px] bg-gray-300 justify-self-end absolute top-[40px] '>Logg ut</button>
                : null
              }
              */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;