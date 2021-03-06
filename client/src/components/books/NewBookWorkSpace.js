import React from 'react'
import { connect } from 'react-redux'
import { Image, Card } from 'react-bootstrap'

const NewBookWorkSpace = ({
  books: {
    current: { pageList }
  }
}) => {
  return (
    <>
      <Card className='mb-2'>
        <div style={{ minHeight: 140, lineHeight: '8em' }}>
          {pageList.length === 0 ? (
            <span className='ml-2'>
              Click images in gallery to add pages to coloring book.
            </span>
          ) : null}
          {pageList.map((page) => (
            <Image
              key={page._id}
              thumbnail
              className='mr-1 mb-1'
              style={{
                maxWidth: '200px',
                maxHeight: '133px'
              }}
              src={`/pages/${page.filename}`}
            />
          ))}
        </div>
      </Card>
    </>
  )
}

const mapStateToProps = (state) => ({
  books: state.books
})

export default connect(mapStateToProps, {})(NewBookWorkSpace)
