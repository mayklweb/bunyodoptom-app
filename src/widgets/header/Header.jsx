import { Link } from "react-router-dom";
import { SearchIcon } from "../../assets/icons";

function Header() {
  return (
    <header>
      <div className="w-full bg-white shadow-sm fixed top-0 z-10">
        <div className="container">
          <div className="relative">
            <div className="w-full flex gap-4 items-center justify-between py-2">
              <div>
                <Link to={"/"} className="w-40 h-12 hidden lg:block">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="w-44 h-10 object-cover"
                  />
                </Link>
                <Link to={"/"} className="w-10 h-10 block lg:hidden">
                  <img
                    src="/images/logo1.svg"
                    alt="Logo"
                    className="w-10 h-10 object-cover lg:hidden"
                  />
                </Link>
              </div>

              <div className="w-full flex flex-auto lg:flex-0 gap-3">
                <form className="w-full">
                  <div className="lg:w-100 flex flex-auto border border-primary/10 rounded-lg overflow-hidden focus-within:border-secondary transition-all ease-in-out duration-300">
                    <div className="flex flex-auto px-3 py-2">
                      <input
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Shirinlik..."
                        className="outline-none w-full"
                        type="text"
                      />
                    </div>
                    <button
                      className="px-2.5 bg-primary/10 rounded-md hover:bg-secondary transition-all ease-in-out duration-300"
                      type="submit"
                    >
                      <SearchIcon className={"text-primary"} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
