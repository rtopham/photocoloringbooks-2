import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  openDeleteModal,
  openEditModal,
  setCurrentPage
} from '../../redux/actions/pages'

import { updatePageList } from '../../redux/actions/books'
import PropTypes from 'prop-types'

const GalleryImage = ({
  page,
  bookMode,
  setCurrentPage,
  openEditModal,
  openDeleteModal,
  updatePageList,
  pageList,
  selected
}) => {
  const [styleObject, setStyleObject] = useState({
    maxWidth: '196px',
    maxHeight: '133px'
  })

  useEffect(() => {
    if (selected)
      setStyleObject({
        maxWidth: '196px',
        maxHeight: '133px',
        border: 'solid #007bff'
      })
    else
      setStyleObject({
        maxWidth: '196px',
        maxHeight: '133px'
      })
  }, [selected])

  const clickEdit = () => {
    setCurrentPage(page)
    openEditModal()
  }

  const clickDelete = () => {
    setCurrentPage(page)
    openDeleteModal()
  }

  const clickImage = () => {
    if (bookMode) {
      let imageSelected = pageList.includes(page)
      let newPageList = pageList
      if (!imageSelected) {
        newPageList.push(page)
        setStyleObject({
          maxWidth: '196px',
          maxHeight: '133px',
          border: 'solid #007bff'
        })
      } else {
        newPageList = pageList.filter((element) => element._id !== page._id)
        setStyleObject({
          maxWidth: '196px',
          maxHeight: '133px'
        })
      }

      updatePageList(newPageList)
    }
  }

  return (
    <>
      <Card style={{ maxHeight: '135px', minHeight: '135px' }}>
        {!bookMode ? (
          <Link to={`/pages/${page._id}`}>
            <Image
              thumbnail
              src={`${process.env.REACT_APP_IMAGE_URL}${page.filename}`}
              className={'mr-3 mb-3'}
              style={styleObject}
              onClick={clickImage}
            />
          </Link>
        ) : (
          <Image
            thumbnail
            src={`${process.env.REACT_APP_IMAGE_URL}${page.filename}`}
            className={'mr-3 mb-3'}
            style={styleObject}
            onClick={clickImage}
          />
        )}

        <div className='galleryText'>
          <h6 style={{ maxWidth: '70px' }}>{page.caption.substring(0, 18)}</h6>
          {/* <h6>{page.date.substring(0, 10)}</h6> */}
          <h6>
            {new Date(page.date).toLocaleString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric'
            })}
          </h6>
        </div>
        <span>
          {' '}
          <Button
            variant='link'
            size='sm'
            onClick={clickEdit}
            className='editIcon'
          >
            <i className='fa fa-edit'></i>
          </Button>
          <Button
            variant='link'
            size='sm'
            onClick={clickDelete}
            className='deleteIcon'
          >
            <i className='fa fa-trash'></i>
          </Button>
        </span>
      </Card>
    </>
  )
}

GalleryImage.propTypes = {
  page: PropTypes.object.isRequired,
  bookMode: PropTypes.bool.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  updatePageList: PropTypes.func.isRequired,
  pageList: PropTypes.array.isRequired,
  selected: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  pages: state.pages,
  pageList: state.books.current.pageList
})

export default connect(mapStateToProps, {
  setCurrentPage,
  openEditModal,
  openDeleteModal,
  updatePageList
})(GalleryImage)
