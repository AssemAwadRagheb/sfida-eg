import { SocialMedia } from "@/components/footer/socialMedia";
import { useRouter } from "next/navigation";

export const NavbarRoutes = ({ setIsMenuOpen }) => {
  const router = useRouter();
  const handleNavigation = (link) => {
    router.push(link);
    setIsMenuOpen?.();
  };

  return (
    <ul className="flex flex-col md:flex-row px-4 font-semibold font-heading md:gap-8 text-center md:text-[unset]">
      <li>
        <button
          className="text-white hover:text-green-500 md:block py-2 transition-colors duration-200"
          onClick={() => handleNavigation("/")}
        >
          الرئيسية
        </button>
      </li>
      <li>
        <button
          className="text-white hover:text-green-500 md:block py-2 transition-colors duration-200"
          onClick={() => handleNavigation("/products")}
        >
          منتجاتنا
        </button>
      </li>
{/*       <li>
        <button
          className="text-white hover:text-green-500 md:block py-2 transition-colors duration-200"
          onClick={() => handleNavigation("/dashboard")}
        >
          لوحة التحكم
        </button>
      </li> */}
      <li>
        <button
          className="text-white hover:text-green-500 md:block py-2 transition-colors duration-200"
          onClick={() => window.open('https://www.instagram.com/sfid.aa/', '_blank')}
        >
          تواصل معنا
        </button>
      </li>
    </ul>
  );
};
