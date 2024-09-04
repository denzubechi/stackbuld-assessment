"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductDialog({
	children,
	onSuccess = () => {},
}: {
	children: ReactNode;
	onSuccess?: () => void;
}) {
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [productName, setProductName] = useState("");
	const [productPrice, setProductPrice] = useState("");
	const [productImageUrl, setProductImageUrl] = useState("");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate a product creation process
		setTimeout(() => {
			setIsLoading(false);
			setOpen(false);
			router.refresh();
		}, 1000);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto">
				<DialogHeader>
					<DialogTitle>Add New Product</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="grid gap-4 py-4">
					<div className="flex flex-col gap-4">
						<Label htmlFor="productName">Product Name*</Label>
						<Input
							id="productName"
							placeholder="Product Name"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-4">
						<Label htmlFor="productPrice">Product Price*</Label>
						<Input
							id="productPrice"
							placeholder="Product Price"
							value={productPrice}
							onChange={(e) => setProductPrice(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-4">
						<Label htmlFor="productImageUrl">Image URL*</Label>
						<Input
							id="productImageUrl"
							placeholder="Image URL"
							value={productImageUrl}
							onChange={(e) => setProductImageUrl(e.target.value)}
						/>
					</div>
					<DialogFooter className="justify-center items-center flex">
						<Button
							disabled={productName.trim().length === 0 || isLoading}
							type="submit"
							className="p-3 rounded w-full max-w-[280px] py-3.5 h-fit"
						>
							{isLoading ? "Loading..." : "Save Product"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
