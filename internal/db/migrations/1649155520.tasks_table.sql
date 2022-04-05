-- +migrate Up
CREATE TABLE "task" (
  "id" INTEGER CONSTRAINT "task_pk" PRIMARY KEY,
  "name" TEXT NOT NULL,
  "complete" INTEGER(1) DEFAULT 0 NOT NULL
);

-- +migrate Down
DROP TABLE "task";
