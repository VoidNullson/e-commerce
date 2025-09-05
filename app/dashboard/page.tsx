import prisma from '@/lib/db'
import { currency } from '@/lib/utils'
import { format } from 'date-fns'

export default async function DashboardPage() {
  const recentProducts = await prisma.product.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Recent Products */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Recent Products</h2>
          <div className="card-base p-4">
            <ul className="divide-y">
              {recentProducts.map((product) => (
                <li key={product.id} className="py-2">
                  <p className="font-medium">{product.title}</p>
                  <p className="text-sm text-gray-500">{product.handle}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Orders */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Recent Orders</h2>
          <div className="card-base p-4">
            <ul className="divide-y">
              {recentOrders.map((order) => (
                <li key={order.id} className="flex justify-between py-2">
                  <div>
                    <p className="font-medium">Order #{order.number}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(order.createdAt), 'PPp')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{currency(order.total)}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        order.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
