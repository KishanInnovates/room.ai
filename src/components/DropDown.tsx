import { roomType, themeType } from "@/utils/dropdowntypes";
import { Menu, Transition } from "@headlessui/react";


interface DropDownProps{
    theme: themeType | roomType;
    setTheme: (theme: themeType | roomType) => void;
    themes: themeType[] | roomType[];
}

export default function DropDown({ theme, setTheme, themes }: DropDownProps) {
    return (
        <Menu as="div" className="relative block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-between items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
                    {theme}
                    <Chev
                </Menu.Button>
            </div>
        </Menu>
    )
}