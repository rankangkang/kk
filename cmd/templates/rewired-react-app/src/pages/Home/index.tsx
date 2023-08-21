import styles from './style.module.less'
import bg from '@assets/images/react.png'

export default function Home() {
  return (
    <div className={styles.wrap}>
      <img className={styles.bg} src={bg} alt="" />
      <h1 className={styles.title}>hallo, there</h1>
    </div>
  )
}
