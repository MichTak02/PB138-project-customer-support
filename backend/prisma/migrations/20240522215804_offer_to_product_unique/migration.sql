/*
  Warnings:

  - A unique constraint covering the columns `[offerId,productId]` on the table `OfferToProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OfferToProduct_offerId_productId_key" ON "OfferToProduct"("offerId", "productId");
