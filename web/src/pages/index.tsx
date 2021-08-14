import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>StudentsAPI</title>
        <meta name="description" content="Students API dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bem vindo ao <span>Students API</span>
        </h1>

        <p className={styles.description}>
          Escolha uma opção abaixo para interagir com a API
        </p>

        <div className={styles.grid}>
          <Link href="/get" passHref>
            <a className={styles.card}>
              <h2>
                Rota <span className="purple">GET</span> &rarr;
              </h2>
              <p>Recupere uma lista de estudantes da API</p>
            </a>
          </Link>
          <Link href="/post" passHref>
            <a className={styles.card}>
              <h2>
                Rota <span className="green">POST</span> &rarr;
              </h2>
              <p>Adicione novos estudantes na API</p>
            </a>
          </Link>
          <Link href="/put" passHref>
            <a className={styles.card}>
              <h2>
                Rota <span className="orange">PUT</span> &rarr;
              </h2>
              <p>Atualize estudantes já existentes na API</p>
            </a>
          </Link>
          <Link href="/delete" passHref>
            <a className={styles.card}>
              <h2>
                Rota <span className="red">DELETE</span> &rarr;
              </h2>
              <p>Remova estudantes da API</p>
            </a>
          </Link>
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
