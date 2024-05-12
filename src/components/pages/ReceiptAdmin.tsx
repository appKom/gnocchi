import { Button, Checkbox, Label, TextInput, Textarea, Dropdown } from "flowbite-react";

const ReceiptAdmin = () => {
  return (<div className = "flex flex-col items-center justify-center h-full m-4 md:m-12">
            <div className="flex flex-row gap-96">
          <div className="flex flex-col mr-20 justify-start">
            <Label htmlFor="search" value="Search" className="text-white" />
            <TextInput
              id="search"
              type="search"
              placeholder="Søk..."
              
            />
          </div>

          <div className="flex flex-col mt-5 ">
            <Dropdown dismissOnClick={false} label="Filetrer" color="light" >
              <Dropdown.Item >Appkom</Dropdown.Item>
              <Dropdown.Item>Arrkom</Dropdown.Item>
              <Dropdown.Item>Backlog</Dropdown.Item>
              <Dropdown.Item>Bankkom</Dropdown.Item>
              <Dropdown.Item>Bedkom</Dropdown.Item>
              <Dropdown.Item>Debug</Dropdown.Item>
              <Dropdown.Item>Dotkom</Dropdown.Item>
              <Dropdown.Item>Fagkom</Dropdown.Item>
              <Dropdown.Item>FeminIT</Dropdown.Item>
              <Dropdown.Item>Fondstyret</Dropdown.Item>
              <Dropdown.Item>HS</Dropdown.Item>
              <Dropdown.Item>Prokom</Dropdown.Item>
              <Dropdown.Item>Trikom</Dropdown.Item>
              <Dropdown.Item>Velkom</Dropdown.Item>
              <Dropdown.Item>OIL</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
  </div> );
}

export default ReceiptAdmin;
