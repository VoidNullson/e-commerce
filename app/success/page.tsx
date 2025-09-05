import prisma from "@/lib/db";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: { orderId?: string };
}) {
    if (!searchParams.orderId) {
        return notFound();
    }
    const order = await prisma.order.findUnique({
        where: { id: searchParams.orderId },
    });
    if (!order) {
        return notFound();
    }

    return (
        <div className="container py-12 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
            <h1 className="mt-4 text-3xl font-bold">Payment Successful!</h1>
            <p className="mt-2 text-lg text-gray-600">
                Thank you for your order.
            </p>
            <p className="mt-1 text-gray-500">
                Your order number is #{order.number}. A confirmation has been sent to your email.
            </p>
            <Link href="/products">
                <button className="btn btn-primary mt-8">Continue Shopping</button>
            </Link>
        </div>
    );
}
