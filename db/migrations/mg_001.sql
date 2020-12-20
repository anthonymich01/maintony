CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "created_at" timestamptz DEFAULT (now()),
  "deleted_at" timestamptz DEFAULT null
);

CREATE TABLE "students" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "created_at" timestamptz DEFAULT (now()),
  "deleted_at" timestamptz DEFAULT null
);

CREATE TABLE "courses" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "created_at" timestamptz DEFAULT (now()),
  "deleted_at" timestamptz DEFAULT null
);

CREATE TABLE "assignments" (
  "id" SERIAL PRIMARY KEY,
  "student_id" int,
  "course_id" int,
  "created_at" timestamptz DEFAULT (now()),
  "deleted_at" timestamptz DEFAULT null
);

ALTER TABLE "assignments" ADD FOREIGN KEY ("student_id") REFERENCES "students" ("id");
ALTER TABLE "assignments" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id");

CREATE INDEX ON "students" ("full_name");
CREATE INDEX ON "courses" ("name");

INSERT INTO "students" ("full_name") VALUES ('Lily-Anne Armitage'),
                                            ('Fardeen Hutchings'),
                                            ('Virginia Michael'),
                                            ('Esther Talbot'),
                                            ('Kaden Stephenson'),
                                            ('Kameron Stevens'),
                                            ('Radhika Avery'),
                                            ('Wilma Romero'),
                                            ('Eesha Gordon'),
                                            ('Eamon Moreno'),
                                            ('Dionne Shah'),
                                            ('Syeda Richardson'),
                                            ('Karim Clayton'),
                                            ('Kris Harrell'),
                                            ('Leonard Rodriquez'),
                                            ('Jaydon Yu'),
                                            ('Bernice Petersen'),
                                            ('Antonio Acevedo'),
                                            ('Taiba Akhtar'),
                                            ('Toyah Maxwell'),
                                            ('Akram Macdonald'),
                                            ('Waleed Bourne'),
                                            ('Lilly Lennon'),
                                            ('Momina Campbell'),
                                            ('Jac Randolph'),
                                            ('Shelby Jarvis'),
                                            ('Tayah Wormald'),
                                            ('Waqas Sykes'),
                                            ('Libbi Anthony'),
                                            ('Brook Rowland');

INSERT INTO "courses" ("name") VALUES ('Agricultural Engineering'),
                                      ('Architectural Engineering'),
                                      ('Biochemical Engineering'),
                                      ('Biological Engineering'),
                                      ('Biomedical Engineering'),
                                      ('Chemical Engineering'),
                                      ('Civil Engineering'),
                                      ('Computer Engineering'),
                                      ('Construction Engineering'),
                                      ('Electrical Engineering');

INSERT INTO "users" ("username", "password")
VALUES ('maintony', '$2b$10$h43R8JOD.2Gi9mJU1h01X.G302cDwU14bHtuP2OVn.uwCVuRVNOki')