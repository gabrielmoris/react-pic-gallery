import React from 'react'
import CircularLoading from './CircularLoading'
import { Options } from './models/models'

const ImgLazyLoading = (props: {
  imgSrc: string
  style: React.CSSProperties
  options?: Options
  onClick: () => void
}) => {
  const [imgSrcUrl, setImgSrcUrl] = React.useState('')
  const Loading: () => JSX.Element =
    props.options?.customLoadComponent !== undefined
      ? props.options.customLoadComponent
      : CircularLoading
  React.useEffect(() => {
    const ac = new AbortController()
    if (props.imgSrc) {
      fetch(props.imgSrc)
        .then((response) => response.blob())
        .then((blob) => {
          setImgSrcUrl(URL.createObjectURL(blob))
        })
    }
    return () => {
      ac.abort()
    } // cleanup function
  }, [props.imgSrc])

  if (imgSrcUrl) {
    return (
      <img
        src={imgSrcUrl}
        alt=''
        style={{
          ...props.style
        }}
        onClick={() => {
          props.onClick()
        }}
      />
    )
  } else {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.157)',
          border: '1px solid rgba(0, 0, 0,0.3)'
        }}
      >
        <Loading />
      </div>
    )
  }
}

export default ImgLazyLoading
