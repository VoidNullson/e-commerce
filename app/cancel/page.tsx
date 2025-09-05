import { XCircle } from "lucide-react";
import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="container py-12 text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-600" />
      <h1 className="mt-4 text-3xl font-bold">Order Canceled</h1>
      <p className="mt-2 text-lg text-gray-600">
        Your order has been canceled. You have not been charged.
      </p>
      <Link href="/cart">
        <button className="btn btn-primary mt-8">Return to Cart</button>
      </Link>
    </div>
  );
}
