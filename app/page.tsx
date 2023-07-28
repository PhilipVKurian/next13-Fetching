import Link from 'next/link'
import { Inter } from 'next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Home</h1>
      <p><Link href={"/users"}>Users</Link></p>
      <p>Lower traps, external rotators, serratus anterior</p>
    </main>
  )
}
