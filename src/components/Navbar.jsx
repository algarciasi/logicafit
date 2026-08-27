import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isAdminEmail } from "../lib/adminConfig";

export default function Navbar() {
  const { user } = useAuth();
  const isAdmin = isAdminEmail(user?.email);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-navy"
        >
          <img
            src="/brand/logo.png"
            alt="Lógica Fit"
            className="h-8 w-8 rounded-full object-cover"
          />
          Lógica <span className="text-orange">Fit</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-text-secondary md:flex">
          <a href="/#metodo" className="transition hover:text-navy">
            Método
          </a>
          <Link to="/planes" className="transition hover:text-navy">
            Planes
          </Link>
          <a href="/#casos" className="transition hover:text-navy">
            Casos reales
          </a>
          <Link to="/blog" className="transition hover:text-navy">
            Blog
          </Link>
          <Link to="/calculadora" className="transition hover:text-navy">
            Calculadora
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              to="/admin/clientes"
              className="hidden text-sm font-semibold text-navy transition hover:text-orange-dark sm:block"
            >
              Admin
            </Link>
          )}
          <Link
            to={user ? "/dashboard" : "/login"}
            className="hidden text-sm font-semibold text-navy transition hover:text-orange-dark sm:block"
          >
            {user ? "Mi área" : "Acceder"}
          </Link>
          <Link
            to="/planes"
            className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange/30 transition hover:bg-orange-dark"
          >
            Ver planes
          </Link>
        </div>
      </div>
    </header>
  );
}
