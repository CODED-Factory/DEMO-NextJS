import Link from "next/link";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-darg bg-dark">
    <Link href="/">
      <a className="navbar-brand">CODED</a>
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link href="/bootcamps">
            <a className="nav-link">
              Bootcamps <span className="sr-only">(current)</span>
            </a>
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
