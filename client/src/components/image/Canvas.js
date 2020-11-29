import React, { useRef, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setPageBlob } from '../../redux/actions/pages'
import * as pcbImage from '../../lib/pcb-image-processing'
import * as pcbEdge from '../../lib/pcb-edge-detection'

const Canvas = ({
  pages: { saving },
  imageSource,
  pageObject,
  print,
  printPage,
  setPageBlob
}) => {
  const [image, setImage] = useState({})
  const [ctx, setCtx] = useState(null)
  const [minHeight, setMinHeight] = useState({})

  const mainCanvas = useRef(null)

  const widthVariable = 1110

  useEffect(() => {
    let img = new Image()
    img.src = imageSource
    img.onload = () => {
      const canvas = mainCanvas.current
      const aspectRatio = img.naturalWidth / img.naturalHeight
      canvas.height = Math.floor(widthVariable / aspectRatio)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      setImage(img)
      setCtx(ctx)
      setMinHeight(canvas.height)
    }
  }, [imageSource])

  useEffect(() => {
    if (ctx !== null) {
      //Process Image
      const canvas = mainCanvas.current
      const scale = pageObject.size / 100
      const width = Math.floor(widthVariable * scale)
      const aspectRatio = image.naturalWidth / image.naturalHeight
      canvas.width = width
      canvas.height = Math.floor(width / aspectRatio)
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

      if (pageObject.gray) {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        pcbImage.grayScaleImage(imageData)
        ctx.putImageData(imageData, 0, 0)
      }

      if (pageObject.monoR) {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        pcbImage.monoImageR(imageData)
        ctx.putImageData(imageData, 0, 0)
      }

      if (pageObject.monoG) {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        pcbImage.monoImageG(imageData)
        ctx.putImageData(imageData, 0, 0)
      }

      if (pageObject.monoB) {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        pcbImage.monoImageB(imageData)
        ctx.putImageData(imageData, 0, 0)
      }

      if (pageObject.smooth) {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let newData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        pcbImage.gaussianSmooth(imageData, newData)
        ctx.putImageData(newData, 0, 0)
      }
      // Detect Edges

      let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      let newData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      switch (pageObject.edgeDetector) {
        case 'Sobel':
          pcbEdge.sobelImage(
            imageData,
            newData,
            pageObject.multiplier,
            pageObject.threshold
          )
          break
        case 'Laplace':
          pcbEdge.laplaceImage(
            imageData,
            newData,
            pageObject.multiplier,
            pageObject.threshold
          )
          break
        case 'Prewitt':
          pcbEdge.prewittImage(
            imageData,
            newData,
            pageObject.multiplier,
            pageObject.threshold
          )
          break
        case 'Robinson':
          pcbEdge.robinsonImage(
            imageData,
            newData,
            pageObject.multiplier,
            pageObject.threshold
          )
          break
        case 'Kirsch':
          pcbEdge.kirschImage(
            imageData,
            newData,
            pageObject.multiplier,
            pageObject.threshold
          )
          break
        case 'Roberts Cross':
          pcbEdge.robertsCrossImage(
            imageData,
            newData,
            pageObject.multiplier,
            pageObject.threshold
          )
          break
        default:
      }
      ctx.putImageData(newData, 0, 0)

      // Post Processing

      if (pageObject.invert) {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        pcbImage.invertImage(imageData)
        ctx.putImageData(imageData, 0, 0)
      }
      if (print) printPage(canvas.toDataURL())
      if (saving) {
        canvas.toBlob((blob) => {
          setPageBlob(blob)
        })
      }
    }
  }, [ctx, pageObject, image, print, saving, setPageBlob, printPage])

  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: minHeight }}
    >
      <canvas
        id='pageCanvas'
        className='mw-100'
        ref={mainCanvas}
        /*         width={1110}
        height={0} */
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  pages: state.pages
})

export default connect(mapStateToProps, { setPageBlob })(Canvas)
