const {PrismaClient} =require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  await prisma.$executeRawUnsafe('DROP Database selling-shoes')
  await prisma.$executeRawUnsafe('CREATE Database selling-shoes')
}
console.log('Reset DB')
run()