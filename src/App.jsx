import "./styles/theme.css"
import "./styles/global.css";
import { ProductList } from "./components2/ProductList";


export default function App() {
  
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  return (
    //React Fragment
    <>
      <Header cart={cart} />
      <ProductList addToCart={addToCart} />
    </>
  );
}