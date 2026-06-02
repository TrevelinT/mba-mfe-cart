import { createRoot } from "react-dom/client";
import CartContainer from "./components/cart-container";
import "./styles.css";

const rootElement = document.getElementById("app");
if (!rootElement) {
	throw new Error('Root element "#app" not found');
}

createRoot(rootElement).render(<CartContainer />);
