import React, { useState } from 'react'

import { useCssHandles } from "vtex.css-handles"
const CSS_HANDLES = ["title"] as const

import { FormattedMessage } from "react-intl"

interface TitleProps { 
    greeting: string
}

const Title: StorefrontFunctionComponent<TitleProps> = ({ greeting }) => {
    const [cont, setCont] = useState(0)
    setCont(1)
    const handles = useCssHandles(CSS_HANDLES)
    const greetingText = greeting || <FormattedMessage id="countdown.title" />
    return (
        <div className={`${handles.title} c-muted-1 db tc`}> 
            HOLAAAAAAA {greetingText} {cont}
        </div>
    )
}

Title.schema = {
  title: 'editor.countdown-title.title',
  description: 'editor.countdown-title.description',
  type: 'object',
  properties: {
      greeting: {
          title: 'Hola soy un titulo',
          type: 'string',
          default: null
      }
  },
}

export default Title