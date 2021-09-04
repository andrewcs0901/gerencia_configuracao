import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { http } from "../services/axios";
import styles from "../styles/Post.module.css";
import { Student } from "../types/Student";

export default function Delete() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    await http
      .get("/students")
      .then((res) => res.data)
      .then(setStudents)
      .catch((error) => console.log(error));
  };

  const [wasCreated, setWasCreated] = useState(false);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { id }: Record<string, HTMLInputElement> = (event.target as any)
      .elements;

    const data = Object.fromEntries(
      [id].map((input) => [input.name, input.value])
    );

    await http.delete(`/students/${data.id}`);
    setWasCreated(true);
    (event.target as any).reset();
    router.back();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>StudentsAPI</title>
        <meta name="description" content="Students API GET request" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>
          <span className="green">PUT</span> Students
        </h1>
      </header>

      <main className={styles.main}>
        <form className={styles.grid} onSubmit={handleFormSubmit}>
          <div>
            <select id="id" name="id">
              <label htmlFor="id">Selecione o estudante</label>
              {students.map((student) => (
                <option value={student.id} key={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={wasCreated}>
            Deletar
          </button>
        </form>
      </main>

      <footer className={styles.footer}>
        <p>
          Powered by{" "}
          <img
            src="/studenticon.png"
            alt="StudentsAPI"
            width={72}
            height={72}
          />
        </p>
      </footer>
    </div>
  );
}
