import jsPDF from 'jspdf'

export const bookPDF = (book, pageArray) => {
  const { title, captions, pageNumbers } = book

  const {
    coverPage: {
      coverPageType,
      imageNumber,
      footer,
      textLine1,
      textLine2,
      textLine3
    }
  } = book

  let pdf = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'letter'
  })

  //letter= 215.9 mm x 279.4 mm

  pdf.setFontSize(10)

  const gridLines = false
  const leftMargin = 5.95
  const topMargin = 3.7
  const gridSize = 17
  const pageLength = 272
  const pageWidth = 204

  let i
  const horizontalCenter = 215.9 / 2
  const landscapeHorizontalCenter = 279.4 / 2

  //GridLines
  let col = [],
    row = []
  for (i = 0; i < 13; i++) {
    col[i] = i * gridSize + leftMargin
  }
  for (i = 0; i < 17; i++) {
    row[i] = i * gridSize + topMargin
  }

  if (gridLines) {
    pdf.setFillColor(200, 200, 200)
    pdf.setLineWidth(0)
    for (i = 0; i < gridSize * 12; i = i + gridSize) {
      pdf.rect(leftMargin + i, topMargin, gridSize, pageLength)
    }
    for (i = 0; i < gridSize * 16; i = i + gridSize) {
      pdf.rect(leftMargin, topMargin + i, pageWidth, gridSize)
    }
  }

  //Cover Page

  //Add designated single image if cover page type is single-image

  if (coverPageType === 'single-image') {
    const image = pdf.getImageProperties(
      `${process.env.REACT_APP_IMAGE_URL}${pageArray[imageNumber - 1].filename}`
    )
    const { height, width } = image
    let targetHeight = 100
    let targetWidth = 100
    const aspectRatio = width / height

    targetWidth = targetHeight * aspectRatio

    pdf.addImage(
      `${process.env.REACT_APP_IMAGE_URL}$pageArray[imageNumber - 1].filename}`,
      'JPEG',
      horizontalCenter - targetWidth / 2,
      20,
      targetWidth,
      targetHeight
    )
  }

  //Add up to three images if cover page type is collage

  if (coverPageType === 'collage') {
    const collageArray = pageArray.filter((page, index) => index < 3)

    const imageArray = collageArray.map((page, index) => {
      const image = pdf.getImageProperties(
        `${process.env.REACT_APP_IMAGE_URL}${page.filename}`
      )
      console.log(`${process.env.REACT_APP_IMAGE_URL}${page.filename}`)

      const { height, width } = image

      const aspectRatio = width / height

      let targetHeight = 50
      let targetWidth = 50
      let x, y

      targetWidth = targetHeight * aspectRatio

      switch (index) {
        case 0:
          x = horizontalCenter - targetWidth
          y = 20
          break
        case 1:
          x = horizontalCenter
          y = 20
          break
        case 2:
          x = horizontalCenter - targetWidth / 2
          y = 20 + targetHeight
          break
        default:
          x = horizontalCenter
      }

      return {
        filename: page.filename,
        aspectRatio: width / height,
        x: x,
        y: y,
        targetWidth: targetWidth,
        targetHeight: targetHeight
      }
    })

    //Fix centering if top two images are differnt widths

    if (
      imageArray.length > 1 &&
      imageArray[0].targetWidth !== imageArray[1].targetWidth
    ) {
      const combinedWidths =
        imageArray[0].targetWidth + imageArray[1].targetWidth
      imageArray[0].x = horizontalCenter - combinedWidths / 2
      imageArray[1].x =
        horizontalCenter - combinedWidths / 2 + imageArray[0].targetWidth
    }

    imageArray.map((image) =>
      pdf.addImage(
        `${process.env.REACT_APP_IMAGE_URL}${image.filename}`,
        'JPEG',
        image.x,
        image.y,
        image.targetWidth,
        image.targetHeight
      )
    )
  }

  //Handle Cover Page Text Lines

  pdf.setFontSize(32)
  pdf.text(title, horizontalCenter, row[8], { align: 'center' })
  pdf.setFontSize(16)
  pdf.text(textLine1, horizontalCenter, row[10], {
    align: 'center'
  })
  pdf.text(textLine2, horizontalCenter, row[12], {
    align: 'center'
  })
  pdf.text(textLine3, horizontalCenter, row[14], {
    align: 'center'
  })

  pdf.setFontSize(10)
  pdf.text(footer, horizontalCenter, row[16] - 8, {
    align: 'center'
  })

  //Handle Coloring Book Pages

  //letter= 215.9 mm x 279.4 mm

  pageArray.map((page, index) => {
    const image = pdf.getImageProperties(
      `${process.env.REACT_APP_IMAGE_URL}${page.filename}`
    )
    const { height, width } = image

    const aspectRatio = width / height
    let orientation = 'portrait'
    let imageWidth = 195
    let imageHeight = 259
    let pageCenter = horizontalCenter
    let captionY = 259
    let pageNumberY = 264

    if (captions || pageNumbers) {
      imageHeight = 239
      imageWidth = imageHeight * aspectRatio
    }

    if (height < width) {
      orientation = 'landscape'

      imageWidth = 259

      imageHeight = imageWidth / aspectRatio
      pageCenter = landscapeHorizontalCenter
      captionY = 200
      pageNumberY = 205
      if (imageHeight > 185 && (captions || pageNumbers)) {
        imageHeight = 185
        imageWidth = imageHeight * aspectRatio
      }
    }
    let margin = (215.9 - imageWidth) / 2
    if (orientation === 'landscape') margin = (279.4 - imageWidth) / 2

    pdf.addPage('letter', orientation)
    pdf.addImage(
      `${process.env.REACT_APP_IMAGE_URL}${page.filename}`,
      'JPEG',
      margin,
      10,
      imageWidth,
      imageHeight
    )
    if (captions) {
      pdf.text(page.caption, pageCenter, captionY, {
        align: 'center'
      })
    }
    if (pageNumbers) {
      const pageNumber = index + 1
      pdf.text(pageNumber.toString(), pageCenter, pageNumberY, {
        align: 'center'
      })
    }
    return null
  })

  pdf.save('PhotoColoringBook' + book.title + '.pdf')
}
