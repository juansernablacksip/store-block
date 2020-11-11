import React, { useState } from 'react'
import { TimeSplit } from './typings/global'
import { tick, getTwoDaysFromNow } from './utils/time'
import { useCssHandles } from "vtex.css-handles"
//-import { FormattedMessage } from 'react-intl'

interface CountdownProps {
   targetDate: string
   //,title: string
}

const DEFAULT_TARGET_DATE = getTwoDaysFromNow()
// const CSS_HANDLES = ['container', 'countdown', 'title']
const CSS_HANDLES = ["countdown"]

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  targetDate = DEFAULT_TARGET_DATE,
}) => {
  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  //const titleText = title || <FormattedMessage id="countdown.title" />
  const handles = useCssHandles(CSS_HANDLES)

  tick(targetDate, setTime)

  /*
    return (
-   <div className={`${handles.container} t-heading-2 fw3 w-100 pt7 pb6 c-muted-1 db tc`}>
-     <div className={`${handles.title} db tc`}>
-       { titleText }
-     </div>
      <div className={`${handles.countdown} db tc`}>
        {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
      </div>
-   </div>
  )
  */
  return (
    <div className={`${handles.countdown} db tc`}>
      {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
    </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
   /*title: {
     title: 'I am a title',
     type: 'string',
     default: null,
   },*/
    targetDate: {
      title: 'Final date',
      description: 'Final date used in the countdown',
      type: 'string',
      default: null,
    },
  },
}

export default Countdown
