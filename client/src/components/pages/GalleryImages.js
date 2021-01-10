import React from 'react'
import { CardColumns, Badge, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { filterPages, clearFilter } from '../../redux/actions/pages'
import GalleryImage from './GalleryImage'
import UpdatePageForm from '../pages/UpdatePageForm'
import DeletePageModal from '../pages/DeletePageModal'

const GalleryImages = ({
  pages: { gallery, filtered, taglist },
  pageList,
  bookMode,
  filterPages,
  clearFilter
}) => {
  const clickTag = (e) => {
    if (e.currentTarget.id === 'all') clearFilter()
    else filterPages(e.currentTarget.id)
  }
  return (
    <>
      <div className='d-inline'>
        {taglist &&
          taglist.map((tag, index) => {
            return (
              <Button variant='link' className='p-1' key={index}>
                <Badge
                  pill
                  variant='primary'
                  className=''
                  onClick={clickTag}
                  id={tag}
                >
                  {tag}
                </Badge>
              </Button>
            )
          })}
      </div>
      <CardColumns>
        {!filtered
          ? gallery.map((page) => {
              return (
                <GalleryImage
                  page={page}
                  key={page._id}
                  bookMode={bookMode}
                  selected={pageList.includes(page)}
                />
              )
            })
          : filtered.map((page) => {
              return (
                <GalleryImage
                  page={page}
                  key={page._id}
                  bookMode={bookMode}
                  selected={pageList.includes(page)}
                />
              )
            })}
      </CardColumns>
      <UpdatePageForm />
      <DeletePageModal />
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  pages: state.pages,
  pageList: state.books.current.pageList
})

export default connect(mapStateToProps, {
  filterPages,
  clearFilter
})(GalleryImages)
