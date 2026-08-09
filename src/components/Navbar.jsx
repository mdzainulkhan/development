import { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  { name: "Weather", path: "/" },
  { name: "Todo List", path: "/todo-list" },
  { name : "Faq", path: "/faq" },
  { name : "Product", path: "/product" },
  { name : "Switcher", path: "/bg-switcher" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Weather App
        </h1>
        <ul className="hidden md:flex gap-6">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden cursor-pointer text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>
      {open && (
        <ul className="flex flex-col gap-4 mt-4 md:hidden">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}

    </nav>
  );
}