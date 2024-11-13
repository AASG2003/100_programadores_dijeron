-- CreateTable
CREATE TABLE "Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "respuesta" TEXT NOT NULL,
    "puntos" INTEGER NOT NULL,
    "idPregunta" INTEGER NOT NULL,
    CONSTRAINT "Answer_idPregunta_fkey" FOREIGN KEY ("idPregunta") REFERENCES "Question" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
