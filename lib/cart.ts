'use server'

import { cookies } from 'next/headers'
import { randomBytes } from 'crypto'
import prisma from './db'
import { revalidatePath } from 'next/cache'

export async function getCart() {
  const sessionId = cookies().get('sid')?.value
  if (!sessionId) {
    return null
  }

  return prisma.cart.findUnique({
    where: { sessionId },
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: {
                include: { media: true }
              },
            },
          },
        },
        orderBy: {
          id: 'asc'
        }
      },
    },
  })
}

export async function addToCart({ variantId, quantity }: { variantId: string; quantity: number }) {
  let sessionId = cookies().get('sid')?.value
  let cart = null

  const variant = await prisma.productVariant.findUnique({ where: { id: variantId } })
  if (!variant) {
    throw new Error('Variant not found')
  }

  if (sessionId) {
    cart = await prisma.cart.findUnique({
      where: { sessionId },
      include: { items: true },
    })
  }

  if (!cart) {
    sessionId = randomBytes(16).toString('hex')
    cart = await prisma.cart.create({
      data: { sessionId },
      include: { items: true },
    })
    cookies().set('sid', sessionId, { httpOnly: true, sameSite: 'lax' })
  }

  const existingItem = cart.items.find((item) => item.variantId === variantId)

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        variantId,
        quantity,
        unitPrice: variant.price,
      },
    })
  }

  revalidatePath('/cart')
  revalidatePath('/products')
}

export async function clearCart() {
    const sessionId = cookies().get('sid')?.value;
    if (sessionId) {
        const cart = await prisma.cart.findUnique({
            where: { sessionId },
        });

        if (cart) {
            await prisma.cart.delete({ where: { id: cart.id } });
            cookies().delete('sid');
        }
    }
    revalidatePath('/cart');
}

export async function updateCartItemQuantity({ itemId, quantity }: { itemId: string; quantity: number }) {
  if (quantity < 1) {
    await prisma.cartItem.delete({
      where: { id: itemId },
    });
  } else {
    await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });
  }
  revalidatePath('/cart');
}
