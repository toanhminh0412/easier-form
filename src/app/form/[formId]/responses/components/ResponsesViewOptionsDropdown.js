import Link from 'next/link'
import { useContext } from 'react'

import xlsx from 'json-as-xlsx'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import FormContext from '../contexts/FormContext'
import ResponsesContext from '../contexts/ResponsesContext'
import { convertResponsesToCsv, convertResponsesToExcel } from '@/helpers/responses'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ResponsesViewOptionsDropdown() {
    const { form } = useContext(FormContext);
    const { responses } = useContext(ResponsesContext);

    const downloadCsv = () => {
        // Strip spaces and replace with underscore and convert to lowercase
        // for the file name
        const formattedFormTitle = form.title.replace(/ /g, "_").toLowerCase();

        const csv = convertResponsesToCsv(form, responses);
        console.log(csv);
        const element = document.createElement('a');
        const file = new Blob([csv], {type: 'text/csv'});
        element.href = URL.createObjectURL(file);
        element.download = `${formattedFormTitle}.csv`;
        document.body.appendChild(element);
        element.click();
    }

    const downloadExcel = () => {
        const excel = convertResponsesToExcel(form, responses);
        console.log(excel);

        // Strip spaces and replace with underscore and convert to lowercase
        // for the file name
        const formattedFormTitle = form.title.replace(/ /g, "_").toLowerCase();

        const settings = {
            fileName: formattedFormTitle, // Name of the resulting spreadsheet
            extraLength: 3, // A bigger number means that columns will be wider
            writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
            writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
            RTL: false, // Display the columns from right-to-left (the default value is false)
        }
        xlsx([excel], settings);
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                View options
                <FontAwesomeIcon icon={faChevronDown} className="-mr-1 h-4 w-4 text-gray-400" aria-hidden="true" />
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem disabled>
                        {({ focus, disabled }) => (
                        <Link
                            href="#"
                            className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm', disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer')}
                        >
                            View in Google Sheet (coming soon)
                        </Link>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ focus }) => (
                        <Link
                            href="#"
                            className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
                            onClick={downloadCsv}
                        >
                            Download CSV
                        </Link>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {({ focus }) => (
                        <Link
                            href="#"
                            className={classNames(focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}
                            onClick={downloadExcel}
                        >
                            Download Excel
                        </Link>
                        )}
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}
