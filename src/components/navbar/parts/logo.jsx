import Link from "next/link";

export const NavbarLogo = () => {
  return (
    <Link 
      className="text-3xl font-bold font-heading text-white hover:text-green-500 active:text-red-600 transition-colors duration-200" 
      href="/"
    >
      Sfida
    </Link>
  );
};
