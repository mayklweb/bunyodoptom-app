import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SearchIcon } from "../../assets/icons";
import { useProducts } from "../../features/product/hooks/useProducts";

const latinToCyrillic = (text) => {
  const map = {
    A: "А",
    a: "а",
    B: "Б",
    b: "б",
    D: "Д",
    d: "д",
    E: "Е",
    e: "е",
    F: "Ф",
    f: "ф",
    G: "Г",
    g: "г",
    H: "Ҳ",
    h: "ҳ",
    I: "И",
    i: "и",
    J: "Ж",
    j: "ж",
    K: "К",
    k: "к",
    L: "Л",
    l: "л",
    M: "М",
    m: "м",
    N: "Н",
    n: "н",
    O: "О",
    o: "о",
    P: "П",
    p: "п",
    Q: "Қ",
    q: "қ",
    R: "Р",
    r: "р",
    S: "С",
    s: "с",
    T: "Т",
    t: "т",
    U: "У",
    u: "у",
    V: "В",
    v: "в",
    X: "Х",
    x: "х",
    Y: "Й",
    y: "й",
    Z: "З",
    z: "з",
    "O'": "Ў",
    "o'": "ў",
    "G'": "Ғ",
    "g'": "ғ",
    Sh: "Ш",
    sh: "ш",
    Ch: "Ч",
    ch: "ч",
    Yo: "Ё",
    yo: "ё",
    Yu: "Ю",
    yu: "ю",
    Ya: "Я",
    ya: "я",
  };
  let result = text;
  [
    "Sh",
    "sh",
    "Ch",
    "ch",
    "Yo",
    "yo",
    "Yu",
    "yu",
    "Ya",
    "ya",
    "O'",
    "o'",
    "G'",
    "g'",
  ].forEach((k) => {
    if (map[k]) result = result.split(k).join(map[k]);
  });
  return result
    .split("")
    .map((c) => map[c] || c)
    .join("");
};

// Map routes to their page titles
const PAGE_TITLES = {
  "/profile": "Profil",
  "/categories": "Katalog",
  "/cart": "Savat",
};

export default function Header() {
  const [query, setQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: products } = useProducts();

  const isHome = pathname === "/";
  const pageTitle = PAGE_TITLES[pathname];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target))
        setIsDrawerOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setIsDrawerOpen(false);
      setSearchResults([]);
      return;
    }
    setIsDrawerOpen(true);
    setIsLoading(true);
    const timer = setTimeout(() => {
      const cyrillicQuery = latinToCyrillic(query);
      const filtered =
        products?.filter((p) => {
          const name = p.name.toLowerCase();
          return (
            name.includes(query.toLowerCase()) ||
            name.includes(cyrillicQuery.toLowerCase())
          );
        }) ?? [];
      setSearchResults(filtered);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, products]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setIsDrawerOpen(false);
    navigate("/products", {
      state: {
        search: query.trim(),
        searchCyrillic: latinToCyrillic(query.trim()),
      },
    });
    setQuery("");
  };

  const handleProductClick = (id) => {
    setIsDrawerOpen(false);
    setQuery("");
    navigate(`/product/${id}`);
  };

  return (
    <header className="w-full safe-top bg-white shadow-sm fixed top-0 z-10 rounded-b-3xl">
      <div className="container">
        <div className="relative" ref={drawerRef}>
          <div className="w-full flex gap-3 items-center py-2">
            {/* Left side: back button on inner pages, logo on home */}
            {isHome && (
              <div className="shrink-0">
                <Link to="/" className="hidden lg:block">
                  <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="w-44 h-10 object-cover"
                  />
                </Link>
                <Link to="/" className="block lg:hidden">
                  <img
                    src="/images/logo1.svg"
                    alt="Logo"
                    className="w-10 h-10 object-cover"
                  />
                </Link>
              </div>
            )}

            {/* Center: search on home, title on inner pages */}
            {isHome ? (
              <div className="flex-1 relative">
                <form onSubmit={handleSearch}>
                  <div className="flex border border-primary/10 rounded-xl overflow-hidden focus-within:border-secondary transition-all duration-300">
                    <div className="flex flex-auto px-3 py-2">
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => query.trim() && setIsDrawerOpen(true)}
                        placeholder="Shirinlik..."
                        className="outline-none w-full"
                        type="text"
                      />
                    </div>
                    <button
                      className="px-2.5 bg-primary/10 rounded-md hover:bg-secondary transition-all duration-300"
                      type="submit"
                    >
                      <SearchIcon className="text-primary" />
                    </button>
                  </div>
                </form>

                {/* Search dropdown */}
                {isDrawerOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    {isLoading ? (
                      <div className="p-4 text-center text-gray-500">
                        Qidirilmoqda...
                      </div>
                    ) : searchResults.length > 0 ? (
                      <div className="py-2">
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => handleProductClick(product.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          >
                            <img
                              src={`https://api.bunyodoptom.uz${product.images[0]?.url}`}
                              alt={product.name}
                              className="w-16 h-12 object-cover rounded"
                            />
                            <div className="flex-1 text-left">
                              <h4 className="font-medium text-sm">
                                {product.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {product.price.toLocaleString()} сўм
                              </p>
                            </div>
                          </button>
                        ))}
                        <button
                          onClick={handleSearch}
                          className="w-full pt-2 px-4 text-center text-primary font-medium hover:bg-gray-50 border-t border-zinc-100"
                        >
                          Barcha natijalarni ko'rish ({searchResults.length})
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        Hech narsa topilmadi
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full py-2">
                <h1 className="text-xl text-center font-semibold">
                  {pageTitle}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
