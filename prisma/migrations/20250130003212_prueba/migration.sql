/*
  Warnings:

  - Added the required column `size` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `age` on the `Pet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `age` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XSMALL', 'SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUPPY', 'ADULT', 'SENIOR');

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "size" "Size" NOT NULL,
DROP COLUMN "age",
ADD COLUMN     "age" "Age" NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "age" "Age" NOT NULL,
ADD COLUMN     "size" "Size" NOT NULL;
