import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Card, Image, Button } from 'react-bootstrap'
import {
  openDeleteModal,
  openEditModal,
  setCurrentPage
} from '../../redux/actions/pages'

import { updatePageList } from '../../redux/actions/books'

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
    maxWidth: '200px',
    maxHeight: '133px'
  })

  useEffect(() => {
    if (selected)
      setStyleObject({
        maxWidth: '200px',
        maxHeight: '133px',
        border: 'solid #007bff'
      })
    else
      setStyleObject({
        maxWidth: '200px',
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
          maxWidth: '200px',
          maxHeight: '133px',
          border: 'solid #007bff'
        })
      } else {
        //newPageList = newPageList.splice(page, 1)
        newPageList = pageList.filter((element) => element._id !== page._id)
        setStyleObject({
          maxWidth: '200px',
          maxHeight: '133px'
        })
      }
      updatePageList(newPageList)
    }
  }

  return (
    <>
      <Card style={{ maxHeight: '135px' }}>
        <Image
          thumbnail
          src={`/pages/${page.filename}`}
          className={'mr-3 mb-3'}
          style={styleObject}
          onClick={clickImage}
        />

        <div className='float-right mr-2'>
          <h6>{page.caption}</h6>
          <h6>{page.date.substring(0, 10)}</h6>

          <br />
          <br />
          <span className='float-right'>
            {' '}
            <Button variant='link' size='sm' onClick={clickEdit}>
              <i className='fa fa-edit'></i>
            </Button>
            <Button variant='link' size='sm' onClick={clickDelete}>
              <i className='fa fa-trash'></i>
            </Button>
          </span>
        </div>
      </Card>
    </>
  )
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
