-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "boxMaterial" TEXT NOT NULL,
    "boxSize" TEXT NOT NULL,
    "braceletMaterial" TEXT NOT NULL,
    "dialColor" TEXT NOT NULL,
    "movimentType" TEXT NOT NULL,
    "picture" TEXT[],
    "releaseYear" TIMESTAMP(3) NOT NULL,
    "extras" TEXT NOT NULL,
    "originCountry" TEXT NOT NULL,
    "brandId" TEXT,

    CONSTRAINT "Watch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Watch" ADD CONSTRAINT "Watch_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
