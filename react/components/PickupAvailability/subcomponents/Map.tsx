import React from 'react'
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps'
import InfoWindowMap from './InfoWindowMap'

const Map = withScriptjs(
  withGoogleMap((props: any) => {
    const { lng, lat } = props.center
    let icon: any = {
      url: props.icon ? props.icon : null,
    }

    if (props.iconWidth && props.iconHeight) {
      icon = {
        ...icon,
        scaledSize: {
          width: parseFloat(props.iconWidth),
          height: parseFloat(props.iconHeight),
        },
      }
    }

    if (icon.url == null) {
      icon = null
    }

    return (
      <GoogleMap
        defaultZoom={props.defaultZoom}
        zoom={props.zoom}
        center={{ lat, lng }}
      >
        {props.markers.length > 0
          ? props.markers.map((marker: any, i: number) => {
              return (
                <InfoWindowMap
                  key={`infoWindow-${i}`}
                  infoLabel={props.infoLabel}
                  marker={marker}
                  icon={icon}
                  i={i}
                />
              )
            })
          : null}
      </GoogleMap>
    )
  })
)

export default Map
