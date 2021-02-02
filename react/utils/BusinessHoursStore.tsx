const dayOfWeek = (infoWindow: any, dayNumber: number) => {
  const {
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = infoWindow.labelWeekdays
  switch (dayNumber) {
    case 1:
      return monday
    case 2:
      return tuesday
    case 3:
      return wednesday
    case 4:
      return thursday
    case 5:
      return friday
    case 6:
      return saturday
    case 7:
      return sunday
    default:
      return 'Error:Día no valido'
  }
}

const timeFormat = (time: string, format?: string) => {
  if (!time) {
    return ''
  }

  const [hour, minute] = time.split(':')

  if (format === '12') {
    return `${
      parseInt(hour, 10) > 12 ? parseInt(hour, 10) - 12 : hour
    }:${minute}${parseInt(hour, 10) >= 12 ? 'pm' : 'am'}`
  }

  return `${hour}:${minute}`
}

const businessHoursStore = (pickupPointSelected: any, infoWindow: any) => {
  let businessHoursLabel = ''
  pickupPointSelected.businessHours.map((horary: any) => {
    businessHoursLabel +=
      dayOfWeek(infoWindow, horary.dayOfWeek) +
      ' ' +
      timeFormat(horary.openingTime, '12') +
      ' - ' +
      timeFormat(horary.closingTime, '12') +
      ' | '
  })
  return businessHoursLabel
}

export default { businessHoursStore }
