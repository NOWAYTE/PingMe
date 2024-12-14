import { FaGithub } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import Image from "next/image";
import ThemeToggleButton from "@/components/theme-toggle-button";

interface Props {}

const Navbar = (props: Props) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="">
        <Image
        src="/logo.png"
        alt="Logo"
        width={140}
        height={140}
         />
      </div>
      {/* <div>
        <ThemeToggleButton />
      </div> */}
    </div>
  );
};

export default Navbar;
