// editable info

const publicSpreadsheetUrl =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTSL7xFijPpq7-IseyKEVnE1k0cDW-LHERb0-b5vxT4yOSg3neXgyC5cljBStGvb9kJ3h9QTlWrGGdZ/pub?output=csv'

const categoryStartNum = 3 // let the program know where the categoy begins on the spreadsheet column. Default value is 3.
const sheetName = 'Sheet1' // this has to match your google doc sheet name
const punctuation = ',' // this changes the punctuation between the title and the description. In most cases you'd want to use "," or "-" or ":"

// Papa parse
function init() {
  Papa.parse(publicSpreadsheetUrl, {
    download: true,
    header: true,
    complete: showInfo,
  })
}

function showInfo(results) {
  const data = results.data

  const checked = 'x'
  const columnArray = Object.keys(data[0])

  const columnName = [columnArray.length]

  for (let j = 0; j < columnArray.length; j++) {
    columnName[j] = columnArray[j]
  }

  // create sorting buttons
  for (let j = categoryStartNum; j < columnArray.length; j++) {
    addButton(columnName[j])
  }

  for (let i = categoryStartNum; i < columnArray.length; i++) {
    for (let j = 0; j < data.length; j++) {
      var category = columnArray[i]
      var columnData = data[j][category]

      if (columnData == checked) {
        addElement(
          columnName[i],
          data[j][columnName[0]],
          data[j][columnName[1]],
          data[j][columnName[2]],
        )
      }
    }
  }
  // alert("Successfully processed!"); // check if data is imported
}

function addButton(columnName) {
  const newButton = document.createElement('BUTTON')
  const newButtonContent = document.createTextNode(columnName)

  newButton.appendChild(newButtonContent)
  newButton.className = 'btn'
  newButton.addEventListener('click', function () {
    filterSelection(columnName)
    btnOff() // turns off all active buttons
    newButton.classList.add('active') // turn this button on
  })
  document.getElementById('myBtnContainer').appendChild(newButton)
}

function btnOff() {
  let btnClassArray = document.getElementsByClassName('btn')
  for (let i = 0; i < btnClassArray.length; i++) {
    if (btnClassArray[i].classList.contains('active')) {
      btnClassArray[i].classList.remove('active')
    }
  }
}

function addElement(columnName, person, url, description) {
  const hashtag1 = ['filterDiv']
  const hashtag2 = [columnName]
  const hashtagArray = hashtag1.concat(hashtag2)
  const hashtagString = hashtagArray.join(' ')
  const newDiv = document.createElement('div')
  newDiv.className = hashtagString

  // place individual link inside individual div
  for (let i = 0; i < 1; i++) {
    let link = document.createElement('a')
    let linkContent = document.createTextNode(person)
    link.appendChild(linkContent)
    link.title = person
    link.href = url
    link.className = 'itemLink'

    let para = document.createElement('p')
    let paraContent = document.createTextNode(`${punctuation} ${description}`)
    para.appendChild(paraContent)
    para.className = 'itemPara'

    para.appendChild(link) // put <a> into <p>
    link.after(paraContent) // put <p> description after <a>
    newDiv.appendChild(para) // put <p> into newDiv
  }
  document.getElementsByClassName('container')[0].appendChild(newDiv)
}

window.addEventListener('DOMContentLoaded', init)

// filter script
function filterSelection(c) {
  var x, i
  x = document.getElementsByClassName('filterDiv')
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], 'show')
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], 'show')
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2
  arr1 = element.className.split(' ')
  arr2 = name.split(' ')
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += ' ' + arr2[i]
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2
  arr1 = element.className.split(' ')
  arr2 = name.split(' ')
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1)
    }
  }
  element.className = arr1.join(' ')
}
