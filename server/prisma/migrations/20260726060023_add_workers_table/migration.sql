-- CreateEnum
CREATE TYPE "Workerstatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "worker" (
    "id" TEXT NOT NULL,
    "workerName" TEXT NOT NULL,
    "status" "Workerstatus" NOT NULL DEFAULT 'ACTIVE',
    "lastHeartBeat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "worker_pkey" PRIMARY KEY ("id")
);
