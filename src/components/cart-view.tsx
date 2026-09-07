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
	onRemoveItem: (productId: string) => void;
	onIncreaseItem: (productId: string) => void;
	onDeleteItem: (productId: string) => void;
}

function MinusIcon() {
	return (
		<svg
			aria-hidden="true"
			className="cart:size-4"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M19 13H5v-2h14v2z" />
		</svg>
	);
}

function PlusIcon() {
	return (
		<svg
			aria-hidden="true"
			className="cart:size-4"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
		</svg>
	);
}

function TrashIcon() {
	return (
		<svg
			aria-hidden="true"
			className="cart:size-4"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
		</svg>
	);
}

function ShoppingCartIcon() {
	return (
		<svg
			aria-hidden="true"
			className="cart:size-6 cart:text-on-surface"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
		</svg>
	);
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
	onRemoveItem,
	onIncreaseItem,
	onDeleteItem,
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
				<ShoppingCartIcon />
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
						isOpen
							? "cart:opacity-100 cart:visible"
							: "cart:opacity-0 cart:invisible"
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
								<div
									className="cart:flex cart:gap-4 cart:mb-6"
									key={item.productId}
								>
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
											<div className="cart:flex cart:items-center cart:gap-2 cart:mt-1">
												<div className="cart:flex cart:items-center cart:border cart:border-outline-variant cart:rounded">
													<button
														aria-label={`Diminuir quantidade de ${item.name}`}
														className="cart:p-1 cart:hover:bg-surface-container cart:transition-colors cart:cursor-pointer cart:text-secondary cart:hover:text-on-surface cart:disabled:opacity-40 cart:disabled:cursor-not-allowed cart:disabled:hover:bg-transparent cart:disabled:hover:text-secondary"
														disabled={item.quantity === 1}
														onClick={() => onRemoveItem(item.productId)}
														type="button"
													>
														<MinusIcon />
													</button>
													<span
														aria-live="polite"
														className="cart:min-w-6 cart:text-center cart:text-body-sm cart:font-bold"
														role="status"
													>
														{item.quantity}
													</span>
													<button
														aria-label={`Aumentar quantidade de ${item.name}`}
														className="cart:p-1 cart:hover:bg-surface-container cart:transition-colors cart:cursor-pointer cart:text-secondary cart:hover:text-on-surface"
														onClick={() => onIncreaseItem(item.productId)}
														type="button"
													>
														<PlusIcon />
													</button>
												</div>
												<button
													aria-label={`Remover ${item.name} do carrinho`}
													className="cart:p-1 cart:rounded cart:hover:bg-surface-container cart:transition-colors cart:cursor-pointer cart:text-secondary cart:hover:text-on-surface"
													onClick={() => onDeleteItem(item.productId)}
													type="button"
												>
													<TrashIcon />
												</button>
											</div>
										</div>
										<p className="cart:font-bold cart:text-primary cart:text-body-md">
											{formatPrice(item.unitPrice * item.quantity)}
										</p>
									</div>
								</div>
							))}
							<div className="cart:border-t cart:border-outline-variant cart:pt-4 cart:flex cart:flex-col cart:gap-4">
								<div className="cart:flex cart:justify-between cart:items-center">
									<span className="cart:text-body-md cart:text-on-surface">
										Subtotal
									</span>
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
