import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { FormEvent, useState } from "react";
import { http } from "../services/axios";
import styles from "../styles/Post.module.css";

export default function Post() {
  const router = useRouter();

  const [wasCreated, setWasCreated] = useState(false);

  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { name, birth, email, city }: Record<string, HTMLInputElement> = (
      event.target as any
    ).elements;

    const data = Object.fromEntries(
      [name, birth, email, city].map((input) => [input.name, input.value])
    );

    await http.post("/students", data);

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
          <span className="green">POST</span> Students
        </h1>
      </header>

      <main className={styles.main}>
        <form className={styles.grid} onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              required
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
              required
              placeholder="Adicione a cidade natal do estudante..."
              disabled={wasCreated}
            />
          </div>
          <button type="submit" disabled={wasCreated}>
            adicionar
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
