import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import { http } from "../services/axios";
import styles from "../styles/Post.module.css";
import { Student } from "../types/Student";

export default function Update() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [student, setStudent] = useState<Student>();
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    await http
      .get("/students")
      .then((res) => res.data)
      .then(setStudents)
      .catch((error) => console.log(error));
    await http
      .get(`/students/${1}`)
      .then((res) => res.data)
      .then(setStudent)
      .catch((error) => alert(error));
  };

  const [wasCreated, setWasCreated] = useState(false);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { id, name, birth, email, city }: Record<string, HTMLInputElement> = (
      event.target as any
    ).elements;

    const data = Object.fromEntries(
      [id, name, birth, email, city].map((input) => [input.name, input.value])
    );
    console.log(data);
    await http.put(`/students/${data.id}`, data);

    setWasCreated(true);
    (event.target as any).reset();
    router.back();
  }

  async function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const studentId: Number = Number(event.target.value);
    await http
      .get(`/students/${studentId}`)
      .then((res) => res.data)
      .then(setStudent)
      .catch((error) => alert(error));
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
            <select id="id" name="id" onChange={(e) => handleSelect(e)}>
              <label htmlFor="id">Selecione o estudante</label>
              {students.map((student) => (
                <option value={student.id} key={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={student?.name}
              placeholder="Adicione o nome do estudante..."
              disabled={wasCreated}
            />
          </div>
          <div>
            <label htmlFor="birth">Data de Nascimento</label>
            <input
              type="datetime-local"
              id="birth"
              name="birth"
              required
              placeholder="Adicione a data de nascimento do estudante..."
              disabled={wasCreated}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={student?.email}
              required
              placeholder="Adicione o email do estudante..."
              disabled={wasCreated}
            />
          </div>

          <div>
            <label htmlFor="city">Cidade Natal</label>
            <input
              type="text"
              id="city"
              name="city"
              defaultValue={student?.city}
              required
              placeholder="Adicione a cidade natal do estudante..."
              disabled={wasCreated}
            />
          </div>
          <button type="submit" disabled={wasCreated}>
            Atualizar
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
