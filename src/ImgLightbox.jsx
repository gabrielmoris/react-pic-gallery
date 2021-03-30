import React from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import CircularLoading from './CircularLoading'
import styles from './styles'

// const ImgLightbox = (props: {
//   imgObj: imageObject | null
//   options?: Options
//   onClose: () => void
//   onNavigation: (arg0: 'next' | 'previous') => void
//   hasPrevious: false
//   hasNext: false
// }) => {

const ImgLightbox = (props) => {
  const [imgSrcUrl, setImgSrcUrl] = React.useState('')

  const DescriptionCustomBox = props.options.descriptionCustomBox

  React.useEffect(() => {
    const imgSrc = props.imgObj?.fullSrc
      ? props.imgObj.fullSrc
      : props.imgObj?.thumbnailSrc
      ? props.imgObj.thumbnailSrc
      : null
    if (imgSrc) {
      fetch(imgSrc)
        .then((response) => response.blob())
        .then((blob) => {
          setImgSrcUrl(URL.createObjectURL(blob))
        })
    }
    // fixing body scrolling while lightbox is open
    document.body.style.overflow = 'hidden'
  }, [props.imgObj])

  return (
    <div
      className='reactPic-lightbox'
      onClick={(event) => {
        document.body.style.overflow = ''
        const target = event.target

        if (target.className === 'reactPic-lightbox') {
          props.onClose()
        }
      }}
      style={styles.ModalDiv}
    >
      <div style={styles.LbButtonsDiv}>
        {props.options?.downloadBtnDisplay ||
        props.options?.downloadCustomBtn ? (
          props.options.downloadCustomBtn ? (
            <a href={imgSrcUrl} download style={styles.ABtn}>
              {props.options.downloadCustomBtn()}
            </a>
          ) : (
            <a href={imgSrcUrl} download style={styles.LbButton}>
              Download
            </a>
          )
        ) : null}
      </div>

      {imgSrcUrl === '' ? (
        <div style={{ display: 'block', margin: 'auto' }}>
          <CircularLoading />
        </div>
      ) : (
        <TransformWrapper
          defaultScale={1}
          options={{
            limitToBounds: false,
            limitToWrapper: true,
            transformEnabled: true,
            centerContent:true
          }}
        >
          <div
            className='reactPic-lightbox-background'
            style={{
              display: 'flex',
              width: '100% ',
              height: '100%',
              margin:'auto',
              paddingBottom: 0,
              paddingTop: 0
            }}
          >
            <TransformComponent>
              <img
                src={imgSrcUrl}
                alt=''
                id='lightboxImg'
                style={{
                  maxWidth: '80vw',
                  maxHeight: 'calc(80vh - 60px)',
                  margin: 'auto',
                  zIndex: 1000000
                }}
              />
            </TransformComponent>
          </div>
          {props.options?.descriptionBoxDisplay ? (
            props.imgObj?.description || DescriptionCustomBox  ? (
              DescriptionCustomBox ? (
                <DescriptionCustomBox imgObj={props.imgObj}>
                  {props.imgObj?.description}
                </DescriptionCustomBox>
              ) : (
                <div
                  className='reactPic-description'
                  style={styles.DescriptionDiv}
                >
                  {props.imgObj?.description}
                </div>
              )
            ) : null
          ) : null}
          {props.hasPrevious && (
            <div
              style={{
                position: 'absolute',
                left: 20,
                top: '50%',
                fontSize: 50,
                cursor: 'pointer'
              }}
              onClick={() => {
                props.onNavigation('previous')
              }}
            >
              &#8249;
            </div>
          )}

          {props.hasNext && (
            <div
              style={{
                position: 'absolute',
                right: 20,
                top: '50%',
                fontSize: 50,
                cursor: 'pointer'
              }}
              onClick={() => {
                props.onNavigation('next')
              }}
            >
              &#8250;
            </div>
          )}
        </TransformWrapper>
      )}
    </div>
  )
}

export default ImgLightbox
