import React from 'react'
import styles from './Countdown.css'

interface CountdownProps { }

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ }) => {
  return (
  <div className={styles.myDivGeneral}>
    <div className={styles.myDiv1}>
      <h1 className={styles.myTextLeft}> 
        Envío gratis desde S/.250
      </h1>
      <a href="http://www.google.com" className={styles.myTextRight}>
        Ver condiciones
      </a>
    </div>
    <div className={styles.myDiv2}>
      <h1 className={styles.myTextTHNLeft}>
        Visita también:
      </h1>
      <a href="http://www.google.com">
        <img src="https://www.triathlon.com.pe/media/wysiwyg/THN_BLANCO.png" alt="THN Catalogo" width="50" height="30"/>
      </a>
      <h2 className={styles.myTextTHNRight}>
        CATÁLOGO
      </h2>
    </div>
  </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default Countdown
