import styles from './style.module.less'
import bg from '../assets/images/bg.png'

export default function Page() {
  return (
    <div className={styles.wrap}>
      <img src={bg} alt="" />
      <h1>hi, there</h1>
    </div>
  )
}