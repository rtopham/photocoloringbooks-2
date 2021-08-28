import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { Card, Button, Image } from 'react-bootstrap'
import PropTypes from 'prop-types'

const ViewImage = ({ pageId, pages: { gallery } }) => {
  const iframe = useRef(null)

  const clickPrint = () => {
    //    setPrint(true)
    printPage(`${process.env.REACT_APP_IMAGE_URL}${currentPage.filename}`)
  }

  const printPage = (srcUrl) => {
    const iframe1 = iframe.current
    iframe1.srcdoc = `<html><body><img src='${srcUrl}'/></body></html>`
    //iframe1.srcdoc = `${process.env.REACT_APP_IMAGE_URL}${currentPage.filename}`

    iframe1.onload = () => {
      iframe1.focus()
      iframe1.contentWindow.print()
    }
  }

  if (gallery === null) return null

  const currentPage = gallery.find((page) => pageId === page._id)

  return (
    <>
      <Card bg='dark' text='white' className='d-block mt-3'>
        <Card.Header>
          {currentPage.caption}
          <Button
            className='float-right'
            variant='link'
            size='sm'
            onClick={clickPrint}
          >
            <i className='fa fa-print'></i>
          </Button>
        </Card.Header>

        <Image
          src={`${process.env.REACT_APP_IMAGE_URL}${currentPage.filename}`}
          fluid
        />
      </Card>
      <iframe ref={iframe} title='print' hidden />
    </>
  )
}

ViewImage.propTypes = {
  pages: PropTypes.object.isRequired,
  pageId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  pages: state.pages
})

export default connect(mapStateToProps, {})(ViewImage)
