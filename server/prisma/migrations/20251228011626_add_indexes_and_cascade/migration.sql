-- DropForeignKey
ALTER TABLE "FishingSession" DROP CONSTRAINT "FishingSession_userId_fkey";

-- CreateIndex
CREATE INDEX "idx_fishing_session_user" ON "FishingSession"("userId");

-- CreateIndex
CREATE INDEX "idx_fishing_session_expires" ON "FishingSession"("expiresAt");

-- CreateIndex
CREATE INDEX "idx_user_points" ON "User"("points" DESC);

-- CreateIndex
CREATE INDEX "idx_user_verified_guest" ON "User"("isVerified", "isGuest");

-- AddForeignKey
ALTER TABLE "FishingSession" ADD CONSTRAINT "FishingSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
