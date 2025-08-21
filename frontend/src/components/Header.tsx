import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react"; // only using X for close icon

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#32006e] text-white relative">
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Logos */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/images/cadbury-logo.png"
            alt="Cadbury Celebrations"
            className="h-8 md:h-10"
          />
          <img
            src="/assets/images/my-birthday-song.png"
            alt="My Birthday Song"
            className="h-9 md:h-11 ml-2"
          />
        </div>

        {/* Right Custom Hamburger Icon */}
        <button onClick={() => setIsOpen(true)} className="flex flex-col gap-1.5 items-end focus:outline-none">
          <span className="block h-0.5 w-7 bg-white rounded"></span>   
          <span className="block h-0.5 w-5 bg-white rounded"></span>   
          <span className="block h-0.5 w-7 bg-white rounded"></span>  
        </button>
      </div>

      {/* Overlay (Blur Background) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)} // close when clicking outside
        ></div>
      )}

      {/* Right Slide Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[250px] bg-[#32006e] z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
     <button
  onClick={() => setIsOpen(false)}
  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center"
>
  <X className="h-6 w-6 text-white" />
</button>

        </div>

        {/* Menu Items */}
        <nav className="flex flex-col items-stretch justify-center flex-grow text-right font-semibold">
          <Link
            to="/participate"
            onClick={() => setIsOpen(false)}
            className="w-full py-5 pr-6 border-t border-[#e9bb72] hover:text-yellow-400 font-semibold"
          >
            How to Participate
          </Link>
          <Link
            to="/terms"
            onClick={() => setIsOpen(false)}
            className="w-full py-5 pr-6 border-t border-[#e9bb72] hover:text-yellow-400 font-semibold"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/privacy"
            onClick={() => setIsOpen(false)}
            className="w-full py-5 pr-6 border-t border-[#e9bb72] hover:text-yellow-400 font-semibold"
          >
            Privacy Policy
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full py-5 pr-6 border-t border-[#e9bb72] hover:text-yellow-400 font-semibold"
          >
            Contact Us
          </Link>
          <div className="border-t border-[#e9bb72]" />
        </nav>

        {/* Footer */}
        <div className="bg-white h-20 flex flex-col justify-center items-center">
          <img
            src="/assets/images/mondelez-logo.png"
            alt="Mondelez Logo"
            className="mx-auto h-10 mb-1"
          />
          
        </div>
      </div>
    </header>
  );
}
