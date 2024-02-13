const bcrypt = require('bcryptjs')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123456');
const userData = [
    { role: 'USER', firstName: 'sanny', lastName: 'pasa', numberphone: '0970890759', email: 'pasa@ggg.mail', password},
    { role: 'USER', firstName: 'peepo', lastName: 'no', numberphone: '0970890758', email: 'peepo@ggg.mail', password},
    { role: 'USER', firstName: 'polo', lastName: 'mo', numberphone: '0970890757', email: 'polo@ggg.mail', password }

];


const run = async () => {
  await prisma.user.createMany({
    data : userData
  });
};

run()