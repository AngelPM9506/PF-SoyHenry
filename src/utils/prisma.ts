import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient({
		errorFormat: 'pretty',
	  });
} else {
	let globalWithPrisma = global as typeof globalThis & {
		prisma: PrismaClient;
	};
	if (!globalWithPrisma.prisma) {
		globalWithPrisma.prisma = new PrismaClient({
			errorFormat: 'pretty',
		  });
	}
	prisma = globalWithPrisma.prisma;
}

export default prisma;