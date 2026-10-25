// Seed an administrator using the project's Prisma User model.
// Set ADMIN_EMAIL and ADMIN_PASSWORD before running this script.
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
	const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
	const password = process.env.ADMIN_PASSWORD;

	if (!email || !password) {
		throw new Error('Set ADMIN_EMAIL and ADMIN_PASSWORD before running this script.');
	}
	if (password.length < 12) {
		throw new Error('ADMIN_PASSWORD must be at least 12 characters long.');
	}

	const hashedPassword = await bcrypt.hash(password, 12);

	await prisma.user.upsert({
		where: { email },
		update: { password: hashedPassword, role: 'ADMIN' },
		create: { email, password: hashedPassword, role: 'ADMIN' },
	});

	console.log(`Admin account seeded for ${email}.`);
}

main()
	.catch((error) => {
		console.error('Failed to seed admin:', error.message);
		process.exitCode = 1;
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
