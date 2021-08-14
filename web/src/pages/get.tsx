import Head from "next/head";
import { useEffect, useState } from "react";
import { http } from "../services/axios";
import styles from "../styles/Get.module.css";
import { Student } from "../types/Student";

export default function Get() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    http
      .get("/students")
      .then((res) => res.data)
      .then(setStudents)
      .catch(console.error);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>StudentsAPI</title>
        <meta name="description" content="Students API GET request" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1>
          <span className="purple">GET</span> Students
        </h1>
      </header>

      <main className={styles.main}>
        <div className={styles.grid}>
          {students.map(({ id, name, email, city }) => (
            <div className={styles.card} key={id}>
              <h2>{name}</h2>
              <p>
                <span>Email:</span> {email}
              </p>
              <p>
                <span>Cidade: </span>
                {city}
              </p>
            </div>
          ))}
        </div>
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
