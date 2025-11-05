import styles from './page.module.scss'
import logoImg from '/public/pedidoflow.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image
          src={logoImg}
          alt='Logo do sistema'
        />

        <section className={styles.login}>
          <form>
            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu email.."
              className={styles.input}
            />

            <input
              type="passwword"
              required
              name="password"
              placeholder="**************"
              className={styles.input}
            />

            <button type='submit' className={styles.button}>
              Acessar
            </button>
          </form>

          <Link href="/signup" className={styles.text}>
            Não possui uma conta? Cadastre-se aqui
          </Link>
        </section>
      </div>
    </>
  )
}