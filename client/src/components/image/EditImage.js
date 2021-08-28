import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { setSaving } from '../../redux/actions/pages'
import { Card, Button } from 'react-bootstrap'
import Canvas from './Canvas'
import Controls from './Controls'
import PropTypes from 'prop-types'

const EditImage = ({
  auth: { isAuthenticated, user },
  pages: { gallery },
  setSaving,
  setShowLimitModal
}) => {
  const initialState = {
    image_id: 'public',
    title: '',
    threshold: 50,
    T2: 42,
    multiplier: 1,
    edgeDetector: 'Edge Detector',
    gray: false,
    smooth: false,
    invert: false,
    monoR: false,
    monoG: false,
    monoB: false,
    size: 100
  }

  const [pageObject, setPageObject] = useState(initialState)
  const [imageSource, setImageSource] = useState('/sample1.jpg')
  const [print, setPrint] = useState(false)

  const iframe = useRef(null)

  const upLoadImage = (event) => {
    const title = event.target.files[0].name
    let reader = new FileReader()
    reader.onload = (e) => {
      let image = e.target.result

      setImageSource(image)

      setPageObject({ ...initialState, title })
    }
    if (event.target.files[0]) reader.readAsDataURL(event.target.files[0])
  }

  const handleSave = () => {
    user.galleryLimit === gallery.length ? setShowLimitModal(true) : setSaving()
  }

  const handleButtons = (e) => {
    switch (e.currentTarget.id) {
      case 'reset':
        setPageObject(initialState)
        break
      case 'smooth':
      case 'invert':
        setPageObject({
          ...pageObject,
          [e.currentTarget.id]: !pageObject[e.currentTarget.id]
        })
        break
      case 'gray':
      case 'monoR':
      case 'monoG':
      case 'monoB':
        setPageObject({
          ...pageObject,
          gray: false,
          monoR: false,
          monoG: false,
          monoB: false,
          [e.currentTarget.id]: !pageObject[e.currentTarget.id]
        })
        break
      case 'plus':
        setPageObject({ ...pageObject, size: pageObject.size + 10 })
        break
      case 'minus':
        setPageObject({ ...pageObject, size: pageObject.size - 10 })
        break
      case 'save':
        handleSave()
        break
      default:
        setPageObject({ ...pageObject, size: 100 })
    }
  }

  const handleChange = (e) => {
    setPageObject({
      ...pageObject,
      [e.currentTarget.id]: e.target.value,
      invert: true
    })
  }

  const clickPrint = () => {
    setPrint(true)
  }

  const printPage = (srcUrl) => {
    setPrint(false)
    //    setPageSrcUrl(srcUrl)
    const iframe1 = iframe.current
    iframe1.srcdoc = `<html><body><img src='${srcUrl}'/></body></html>`
    iframe1.onload = () => {
      iframe1.focus()
      iframe1.contentWindow.print()
    }
  }

  return (
    <>
      <Card bg='dark' text='white' className='d-block mt-3'>
        <Card.Header>
          {pageObject.title || 'sample.jpg'}
          <Button
            className='float-right'
            variant='link'
            size='sm'
            onClick={clickPrint}
          >
            <i className='fa fa-print'></i>
          </Button>
        </Card.Header>
        <Canvas
          imageSource={imageSource}
          print={print}
          //saving={saving}
          printPage={printPage}
          //savePage={savePage}
          pageObject={pageObject}
        />
        {
          <Card.Footer>
            <Controls
              pageObject={pageObject}
              onClick={handleButtons}
              onChange={handleChange}
              upLoad={upLoadImage}
              isAuthenticated={isAuthenticated}
            />
          </Card.Footer>
        }
      </Card>
      <iframe ref={iframe} title='print' hidden />
    </>
  )
}

EditImage.propTypes = {
  auth: PropTypes.object.isRequired,
  pages: PropTypes.object.isRequired,
  setSaving: PropTypes.func.isRequired,
  setShowLimitModal: PropTypes.func
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  pages: state.pages
})

export default connect(mapStateToProps, { setSaving })(EditImage)
