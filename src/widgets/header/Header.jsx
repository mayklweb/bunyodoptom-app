import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchIcon } from "../../assets/icons";
import { useProducts } from "../../features/product/hooks/useProducts";

function Header() {
  const [query, setQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const drawerRef = useRef(null);
  const navigate = useNavigate();
  const { data: products } = useProducts(); // Replace with your actual product fetching hook

  // Latin to Cyrillic transliteration for Uzbek
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

    // Replace multi-character combinations first
    const multiChar = [
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
    ];
    multiChar.forEach((key) => {
      if (map[key]) {
        result = result.split(key).join(map[key]);
      }
    });

    // Replace single characters
    return result
      .split("")
      .map((char) => map[char] || char)
      .join("");
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search products as user types
  useEffect(() => {
    if (query.trim().length > 0) {
      setIsDrawerOpen(true);
      setIsLoading(true);

      // Debounce search
      const timer = setTimeout(() => {
        // Convert Latin to Cyrillic before searching
        const cyrillicQuery = latinToCyrillic(query);
        fetchProducts(query, cyrillicQuery);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setIsDrawerOpen(false);
      setSearchResults([]);
    }
  }, [query]);

  // Replace this with your actual product fetching logic
  const fetchProducts = async (originalQuery, cyrillicQuery) => {
    try {
      // Example: Search with both Latin and Cyrillic
      // const response = await axios.get(`/api/products?search=${originalQuery}&searchCyrillic=${cyrillicQuery}`);
      // const data = response.data;

      // Mock data - replace with your actual API call

      // Search in both Latin and Cyrillic
      const filtered = products.filter((product) => {
        const nameLower = product.name.toLowerCase();
        const queryLower = originalQuery.toLowerCase();
        const cyrillicQueryLower = cyrillicQuery.toLowerCase();

        return (
          nameLower.includes(queryLower) ||
          nameLower.includes(cyrillicQueryLower)
        );
      });

      setSearchResults(filtered);
      setIsLoading(false);
    } catch (error) {
      console.error("Search error:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsDrawerOpen(false);
      const cyrillicQuery = latinToCyrillic(query.trim());
      navigate("/products", {
        state: { search: query.trim(), searchCyrillic: cyrillicQuery },
      });
      setQuery("");
    }
  };

  const handleProductClick = (productId) => {
    setIsDrawerOpen(false);
    setQuery("");
    navigate(`/product/${productId}`);
  };

  return (
    <header>
      <div className="w-full safe-top bg-white shadow-sm fixed top-0 z-10">
        <div className="container">
          <div className="relative" ref={drawerRef}>
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

              <div className="w-full flex flex-auto lg:flex-0 gap-3 relative">
                <form className="w-full" onSubmit={handleSearch}>
                  <div className="lg:w-100 flex flex-auto border border-primary/10 rounded-lg overflow-hidden focus-within:border-secondary transition-all ease-in-out duration-300">
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
                      className="px-2.5 bg-primary/10 rounded-md hover:bg-secondary transition-all ease-in-out duration-300"
                      type="submit"
                    >
                      <SearchIcon className={"text-primary"} />
                    </button>
                  </div>
                </form>

                {/* Search Drawer */}
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
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                          >
                            <img
                              src={`https://api.bunyodoptom.uz${product.images[0]?.url}`} // Assuming the first image is the thumbnail
                              alt={product.name}
                              className="w-16 h-12 object-cover aspect-4/3 rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">
                                {product.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {product.price.toLocaleString()} сўм
                              </p>
                            </div>
                          </button>
                        ))}

                        {/* View All Results */}
                        <button
                          onClick={handleSearch}
                          className="w-full pt-2 px-4 text-center text-primary font-medium hover:bg-gray-50 border-t border-zinc-100"
                        >
                          Barcha natijalarni ko'rish ({searchResults.length})
                        </button>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        Xech narsa topilmadi
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
