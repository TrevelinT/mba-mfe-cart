import type { RefObject } from "react";
import type { CartLineItem } from "../api";
import { formatPrice } from "../api/format-price";

export interface CartViewProps {
	containerRef: RefObject<HTMLDivElement | null>;
	isOpen: boolean;
	items: CartLineItem[];
	itemCount: number;
	subtotal: number;
	isEmpty: boolean;
	cartAriaLabel: string;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
	onButtonClick: () => void;
}

function CartView({
	containerRef,
	isOpen,
	items,
	itemCount,
	subtotal,
	isEmpty,
	cartAriaLabel,
	onMouseEnter,
	onMouseLeave,
	onButtonClick,
}: CartViewProps) {
	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: wrapper spans button and panel for hover
		<div
			className="cart:relative"
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			ref={containerRef}
		>
			<button
				aria-controls="cart-panel"
				aria-expanded={isOpen}
				aria-haspopup="true"
				aria-label={cartAriaLabel}
				className={`cart:p-2 cart:rounded-full cart:transition-colors cart:relative cart:cursor-pointer ${
					isOpen
						? "cart:bg-surface-container"
						: "cart:hover:bg-surface-container"
				}`}
				onClick={onButtonClick}
				type="button"
			>
				<span
					aria-hidden="true"
					className="material-symbols-outlined cart:text-on-surface"
				>
					shopping_cart
				</span>
				{!isEmpty ? (
					<span
						aria-hidden="true"
						className="cart:absolute cart:top-1 cart:right-1 cart:bg-primary cart:text-on-primary cart:text-[10px] cart:font-bold cart:w-4 cart:h-4 cart:flex cart:items-center cart:justify-center cart:rounded-full"
					>
						{itemCount}
					</span>
				) : null}
			</button>
			<div
				className={`cart:absolute cart:right-0 cart:top-full cart:pt-2 cart:z-50 ${
					isOpen ? "cart:pointer-events-auto" : "cart:pointer-events-none"
				}`}
			>
				<section
					aria-hidden={!isOpen}
					aria-label="Pré-visualização do carrinho"
					className={`cart:w-80 cart:bg-surface cart:border cart:border-outline-variant cart:rounded-xl cart:shadow-2xl cart:p-4 cart:transition-all cart:duration-200 ${
						isOpen ? "cart:opacity-100 cart:visible" : "cart:opacity-0 cart:invisible"
					}`}
					id="cart-panel"
				>
					<div className="cart:flex cart:justify-between cart:items-center cart:mb-4">
						<h2 className="cart:font-headline-md cart:text-on-surface cart:m-0">
							Seu carrinho
						</h2>
						{!isEmpty ? (
							<p className="cart:text-body-sm cart:text-secondary">
								{itemCount} {itemCount === 1 ? "item" : "itens"}
							</p>
						) : null}
					</div>
					{isEmpty ? (
						<p className="cart:text-body-sm cart:text-secondary cart:mb-6">
							Seu carrinho está vazio.
						</p>
					) : (
						<>
							{items.map((item) => (
								<div className="cart:flex cart:gap-4 cart:mb-6" key={item.productId}>
									<div className="cart:w-20 cart:h-20 cart:bg-surface-container-low cart:rounded-lg cart:overflow-hidden cart:border cart:border-outline-variant cart:shrink-0">
										<img
											alt={item.name}
											className="cart:w-full cart:h-full cart:object-cover"
											src={item.imageUrl}
										/>
									</div>
									<div className="cart:flex cart:flex-col cart:justify-between cart:min-w-0 cart:flex-1">
										<div>
											<p className="cart:font-bold cart:text-body-sm cart:line-clamp-1">
												{item.name}
											</p>
											<p className="cart:text-body-sm cart:text-secondary">
												Quantidade: {item.quantity}
											</p>
										</div>
										<p className="cart:font-bold cart:text-primary cart:text-body-md">
											{formatPrice(item.unitPrice * item.quantity)}
										</p>
									</div>
								</div>
							))}
							<div className="cart:border-t cart:border-outline-variant cart:pt-4 cart:flex cart:flex-col cart:gap-4">
								<div className="cart:flex cart:justify-between cart:items-center">
									<span className="cart:text-body-md cart:text-on-surface">Subtotal</span>
									<span className="cart:font-price-lg cart:text-headline-md">
										{formatPrice(subtotal)}
									</span>
								</div>
								<button
									className="cart:w-full cart:bg-primary-container cart:text-on-primary cart:py-3 cart:rounded cart:font-bold cart:text-body-md cart:hover:bg-primary cart:transition-colors cart:cursor-pointer"
									type="button"
								>
									Finalizar compra
								</button>
								<button
									className="cart:w-full cart:text-secondary cart:hover:text-on-surface cart:py-1 cart:text-body-sm cart:transition-colors cart:text-center cart:font-medium cart:cursor-pointer"
									type="button"
								>
									Ver carrinho
								</button>
							</div>
						</>
					)}
				</section>
			</div>
		</div>
	);
}

export { CartView };
