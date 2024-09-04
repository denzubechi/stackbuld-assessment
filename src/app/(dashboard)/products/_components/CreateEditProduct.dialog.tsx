"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface CreateEditProductDialogProps {
  product?: IProduct | null;
  onSave: (product: IProduct) => void;
  children: React.ReactNode;
}

const categories = ["Electronics", "Books", "Clothing", "Home", "Toys"];

export default function CreateEditProductDialog({ product, onSave, children }: CreateEditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price || "");
  const [image, setImage] = useState(product?.image || "");
  const [description, setDescription] = useState(product?.description || ""); // New description state
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">(product?.status || "ACTIVE");
  const [category, setCategory] = useState(product?.category || categories[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState<string | null>(null);

  const validateImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateImageUrl(image)) {
      setImageError("Please enter a valid image URL.");
      return;
    }

    setImageError(null);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating a network request

    const newProduct: IProduct = {
      id: product?.id || `${Date.now()}`, 
      title,
      price,
      image,
      description, 
      status,
      category,
      createdAt: product?.createdAt || new Date().toISOString(),
    };

    onSave(newProduct);
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[90dvh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Create New Product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Product Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isLoading}
            />
            <Input
              placeholder="Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              disabled={isLoading}
            />
            <Input
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              disabled={isLoading}
            />
            {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={isLoading}
              className="border rounded-md p-2"
              rows={4}
            />
            <Select
              onValueChange={(value) => setStatus(value as "ACTIVE" | "INACTIVE")}
              defaultValue={status}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => setCategory(value)}
              defaultValue={category}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="justify-center">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : product ? "Save Changes" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
