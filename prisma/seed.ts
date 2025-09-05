import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')

async function main() {
  console.log('Seeding database...')

  // Clean up existing data
  await prisma.productCategory.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.review.deleteMany({})
  await prisma.media.deleteMany({})
  await prisma.productVariant.deleteMany({})
  await prisma.product.deleteMany({})
  console.log('Cleaned up old data.')

  // Create Categories
  const categoriesData = [
    { name: 'Apparel' },
    { name: 'Accessories' },
    { name: 'Home Goods' },
    { name: 'Fitness' },
    { name: 'Tech' },
  ]
  const categories = await Promise.all(
    categoriesData.map((cat) =>
      prisma.category.create({
        data: { name: cat.name, slug: slugify(cat.name) },
      })
    )
  )
  console.log(`Created ${categories.length} categories.`)

  const sizes = ['S', 'M', 'L', 'XL']
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White']

  // Create Products
  for (let i = 0; i < 24; i++) {
    const productName = faker.commerce.productName()
    const handle = `${slugify(productName)}-${faker.string.alphanumeric(4)}`

    const product = await prisma.product.create({
      data: {
        title: productName,
        handle,
        description: faker.commerce.productDescription(),
        status: 'active',
        // Assign to a random category
        categories: {
          create: {
            categoryId: categories[Math.floor(Math.random() * categories.length)].id,
          },
        },
        // Create Media
        media: {
          create: [
            { url: faker.image.urlLoremFlickr({ category: 'fashion' }), alt: productName },
            { url: `https://picsum.photos/seed/${handle}/800/600`, alt: productName },
          ],
        },
        // Create Reviews
        reviews: {
          create: Array.from({ length: Math.floor(Math.random() * 7) }).map(() => ({
            author: faker.person.fullName(),
            rating: faker.number.int({ min: 3, max: 5 }),
            body: faker.lorem.paragraph(),
          })),
        },
      },
    })

    // Create Variants for the product
    for (const size of sizes) {
        for (const color of colors) {
            if (Math.random() > 0.3) { // Create variants somewhat sparsely
                await prisma.productVariant.create({
                    data: {
                        productId: product.id,
                        title: `${size} / ${color}`,
                        sku: `${handle.toUpperCase()}-${size}-${color.substring(0,3)}`,
                        option1: size,
                        option2: color,
                        price: parseFloat(faker.commerce.price({ min: 15, max: 150 })),
                        inventoryQty: faker.number.int({ min: 0, max: 20 }),
                    },
                });
            }
        }
    }
    console.log(`Created product: ${product.title} with variants`);
  }
}

main()
  .catch((e) => {
    console.error(e)
    // Fix: Replaced process.exit to avoid type error. Throwing will still exit with a non-zero code.
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect()
  })