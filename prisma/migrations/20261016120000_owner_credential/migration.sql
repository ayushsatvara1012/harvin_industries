-- CreateTable
CREATE TABLE IF NOT EXISTS "OwnerCredential" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "passwordHash" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OwnerCredential_pkey" PRIMARY KEY ("id")
);
