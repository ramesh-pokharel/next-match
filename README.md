
prisma 7 and better auth

after update to schema.prisma and adding data with prismaData.ts and seed.ts
and adding  seed: "tsx prisma/seed.ts" to migrations in prisma.config.ts
1. npx prisma migrate reset (delete schema and data)
2. prisma db push

3. npx prisma db seed
