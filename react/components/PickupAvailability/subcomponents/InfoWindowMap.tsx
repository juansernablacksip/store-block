import React, { useState } from 'react'
import { Marker, InfoWindow } from 'react-google-maps'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'pa_markerInfo',
  'pa_markerStoreNameLabel',
  'pa_markerStoreDirectionLabel',
  'pa_markerStorePhoneLabel',
  'pa_markerStoreHoraryLabel',
  'pa_markerStoreDescriptionLabel',
  'pa_markerStoreName',
  'pa_markerStoreDirection',
  'pa_markerStorePhone',
  'pa_markerStoreHorary',
  'pa_markerStoreDescription',
] as const

const InfoWindowMap = (props: any) => {
  const [showInfo, setShowInfo] = useState(true)
  const handles = useCssHandles(CSS_HANDLES)
  typeof props.marker.lat != 'undefined' &&
    typeof props.marker.lgn != 'undefined'
  return (
    <Marker
      key={`marker-${props.i}`}
      icon={props.icon}
      position={{
        lat: parseFloat(props.marker.lat),
        lng: parseFloat(props.marker.lgn),
      }}
      onClick={() => setShowInfo(true)}
    >
      {showInfo ? (
        <InfoWindow onCloseClick={() => setShowInfo(false)}>
          <div className={`t-mini ${handles.pa_markerInfo}`}>
            {typeof props.marker.name != 'undefined' ? (
              <p className={`ma0 t-body ${handles.pa_markerStoreNameLabel}`}>
                {props.infoLabel.labelName}{' '}
                <span
                  className={`ma0 t-body mw9 ${handles.pa_markerStoreNameLabel}`}
                >
                  {props.marker.name}
                </span>
              </p>
            ) : null}
            {typeof props.marker.direction != 'undefined' ? (
              <p
                className={`ma0 t-body ${handles.pa_markerStoreDirectionLabel}`}
              >
                {props.infoLabel.labelDirection}{' '}
                <span
                  className={`ma0 t-body mw9 ${handles.pa_markerStoreDirection}`}
                >
                  {props.marker.direction}
                </span>
              </p>
            ) : null}
            {typeof props.marker.phone != 'undefined' ? (
              <p className={`ma0 t-body ${handles.pa_markerStorePhoneLabel}`}>
                {props.infoLabel.labelPhone}{' '}
                <span
                  className={`ma0 t-body mw9 ${handles.pa_markerStorePhone}`}
                >
                  {props.marker.phone}
                </span>
              </p>
            ) : null}
            {typeof props.marker.horary != 'undefined' ? (
              <p className={`ma0 t-body ${handles.pa_markerStoreHoraryLabel}`}>
                {props.infoLabel.labelHorary}{' '}
                <span
                  className={`ma0 t-body mw9 ${handles.pa_markerStoreHorary}`}
                >
                  {props.marker.horary}
                </span>
              </p>
            ) : null}
            {typeof props.marker.description != 'undefined' ? (
              <p
                className={`ma0 t-body mw9 ${handles.pa_markerStoreDescriptionLabel}`}
              >
                {props.infoLabel.labelDescription}{' '}
                <span
                  className={`ma0 t-body mw9 ${handles.pa_markerStoreDescription}`}
                >
                  {props.marker.description}
                </span>
              </p>
            ) : null}
          </div>
        </InfoWindow>
      ) : null}
    </Marker>
  )
}

export default InfoWindowMap
