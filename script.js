var moduleName = "List View Addon"
var jsonData = []


if (Array.isArray(listData)) {
  jsonData = listData
}




//jsonData = listData
const tableBody = document.getElementById('tableBody');
const sibeBarContainer = document.getElementById('side-bar-container');
const sideBarHeader = document.getElementById('side-bar-header')
const companyName = document.getElementById('company-name')
const menu_item_names = document.querySelectorAll('.menu-item-name');
const menu_items = document.querySelectorAll('.menu-item');
const menu_items_arrow_icon = document.querySelectorAll('.menu-item-arrow-icon');
const sub_menu = document.querySelectorAll('.submenu');
const expand_sidebar_button = document.getElementById('expand-side-bar-button')


//for sidemenu operations





//this function is used for toggle the sidebar i.e expanding and collapsing the layout
function toggleSideMenu() {
  const menu_item_names = document.querySelectorAll('.menu-item-name');
  const menu_items = document.querySelectorAll('.menu-item');
  const menu_items_arrow_icon = document.querySelectorAll('.menu-item-arrow-icon');


  if (sibeBarContainer.classList.contains('sidebar-expand')) {
    sibeBarContainer.classList.remove('sidebar-expand')
    companyName.style.display = 'none'
    expand_sidebar_button.style.rotate = '0deg'
    menu_items.forEach(element => {

      element.classList.remove('menu-item-expanded')
    });
    menu_item_names.forEach(element => {

      element.classList.remove('expanded-state')
    });
    menu_items_arrow_icon.forEach(element => {
      element.classList.remove('expanded-state');
    });
    var subMenu = document.getElementsByClassName('submenu')
    for (var i = 0; i < subMenu.length; i++) {
      subMenu[i].style.display = 'none'
    }//use let instead of var


  }
  else {
    expand_sidebar_button.style.rotate = '180deg'
    sibeBarContainer.classList.add('sidebar-expand')
    setTimeout(() => {

      companyName.style.display = 'block'
      menu_items.forEach(element => {

        element.classList.add('menu-item-expanded')
      });
      menu_item_names.forEach(element => {

        element.classList.add('expanded-state')
      });
      menu_items_arrow_icon.forEach(element => {
        element.classList.add('expanded-state');
      });
    }, 400);


  }

}



//this function is used to toggle the submenu when clicked on any menu item when the sidebar is in expanded state
/* function toggleSubMenu(index) {
  console.log(index)
  if (sibeBarContainer.classList.contains('sidebar-expand')) {
    const submenu = document.getElementsByClassName('submenu')[index];
    submenu.style.display = submenu.style.display === 'none' ? 'flex' : 'none';
    console.log("if")
  }
  else {
    const submenu = document.getElementsByClassName('submenu')[pos];
    submenu.style.display = 'none';
    console.log("else")
  }


} */

  function changeModule(moduleName){
    //FileMaker.PerformScriptWithOption(`Go To Module`, moduleName, 0);
  }



//create some shadow for the popup to distinct it from list view

// for a global popmenu on any list item
const popup = document.createElement('div');
popup.classList.add('popup');
popup.innerHTML = `
      <div class='popup-content'>
       Select Columns. 
    `;
document.body.appendChild(popup);

// this function is used to handle the pop-up visibility and positioning
function togglePopup(event, item) {
  const button = event.target.closest('.cursor');
  if (!button) return;

  // Calculate position of the button
  const rect = button.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  popup.style.right = `20px`;
  popup.style.top = `${rect.top + scrollTop + rect.height}px`;

  // Toggle pop-up visibility
  popup.classList.toggle('active');
}










var allColumnNames = tableHeaders
//allColumnNames = Object.keys(listData[0])
//tableHeaders = Object.keys(listData[0])








//for list view and the table headers and the indexed

var sortColumn = '...'
var ascendingOrder = true
var isSorted = false




// Pagination constants
var table_size = listViewTableSize;
var current_index = 1;
var data_length = completeDataSize; // e.g., jsonData.length

// Derived values
var button_end_index = Math.ceil(data_length / table_size); // Total pages
var button_start_index = 1;
var max_index = 4; // Last visible pagination button





if (data_length % table_size > 0) {
  button_end_index++;
}


//checks for the conditions for the pagenation buttons so that it could be generated
function updatePaginationIndices() {
  // Recalculate start/end indices for current page
  start_index = (current_index - 1) * table_size + 1;
  end_index = Math.min(start_index + table_size - 1, data_length);

  // Define how many buttons to show (e.g., 4)
  const visibleButtons = 4;

  // Calculate button_start_index based on current page
  if (current_index <= 2) {
    button_start_index = 1;
  } else if (current_index >= button_end_index - 1) {
    button_start_index = Math.max(button_end_index - visibleButtons + 1, 1);
  } else {
    button_start_index = current_index - 1;
  }

  // Calculate max visible button index
  max_index = Math.min(button_start_index + visibleButtons - 1, button_end_index);
}








function displayIndexButtons() {
  updatePaginationIndices();

  // Clear existing buttons
  $('.index_buttons button').remove();
  $('.index_buttons span').remove();

  // Previous button
  $('.index_buttons').append(
    `<button class='inactive-nav-button' id='previous' onclick='showPreviousTableData()'>&lt</button>`
  );

  // Show "1 ..." if needed
  if (button_start_index > 2) {
    $('.index_buttons').append(
      `<button class='inactive-nav-button' onclick='showSelectedTableData(1)'>1</button>`
    );
    $('.index_buttons').append(`<span>...</span>`);
  }

  // Main page number buttons
  for (let i = button_start_index; i <= max_index; i++) {
    if (i === current_index) {
      $('.index_buttons').append(`<button class='active-nav-button'>${i}</button>`);
    } else {
      $('.index_buttons').append(
        `<button class='inactive-nav-button' onclick='showSelectedTableData(${i})'>${i}</button>`
      );
    }
  }

  // Show "... N" if needed
  if (max_index < button_end_index - 1) {
    $('.index_buttons').append(`<span>...</span>`);
    $('.index_buttons').append(
      `<button class='inactive-nav-button' onclick='showSelectedTableData(${button_end_index})'>${button_end_index}</button>`
    );
  }

  // Next button
  $('.index_buttons').append(
    `<button class='inactive-nav-button' id='next' onclick='showNextTableData()'>&gt</button>`
  );

  highlightIndexButtonAndSetFooter(); // your existing helper
}




//for highlighting current selected button
function highlightIndexButtonAndSetFooter() {
  start_index = (current_index - 1) * table_size + 1;
  end_index = Math.min(start_index + table_size - 1, data_length);
  $(
    '.footer span'
  )[0].textContent = `Showing Data ${start_index}-${end_index} of ${data_length}`;
  $(`.index_buttons button[index=${current_index}]`).removeClass(
    'active-nav-button'
  );
  $(`.index_buttons button[index=${current_index}]`).addClass(
    'inactive-nav-button'
  );

  // $('.index_buttons button[index=''+current_index+1+'']').removeClass('active-nav-button')
  createTableRows();
}



//function for creating table rows
function createTableRows() {
  //tableHeaders = Object.keys(jsonData[0])
  const tableBody = document.getElementById('tableBody');
  setTableHeaders();
  tableBody.innerHTML = '';

  // Validate indices
  let tab_start = Math.max(0, (current_index - 1) * table_size + 1);
  let tab_end = Math.min(completeDataSize, ((current_index - 1) * table_size) + table_size);
  console.log(`tab start:${tab_start}  tab_end: ${tab_end}`)

  // Create document fragment for better performance
  const fragment = document.createDocumentFragment();

  // Get column configuration
  const columnConfig = getColumnConfig();

  // Batch process rows
  for (let i = 0;i< Math.min(jsonData.length ,table_size); i++) {
    const item = jsonData[i];
    const row = createRow(item, columnConfig);
    fragment.appendChild(row);
  }

  tableBody.appendChild(fragment);

  // Add global click listener for popup (using event delegation)
  document.addEventListener('click', handleGlobalClick);

  // Initialize drag and drop
  initializeDragAndDrop();
}

// Column configuration for different types of data
function getColumnConfig() {
  return {
    status: {
      test: key => key.endsWith('Status'),
      render: value => `<td class='middle'><div class='status ${value}'>${value}</div></td>`
    },
    text: {
      test: key => ['NAME', 'EMAIL', 'DESCRIPTION', 'PRODUCT CODE'].includes(key.toUpperCase()),
      render: value => `<td>${value}</td>`
    },
    numeric: {
      test: key => ['price', 'order', 'rating', 'Order'].includes(key),
      render: value => `<td class='middle'>${formatNumber(value)}</td>`
    },
    default: {
      test: () => true,
      render: value => `<td class='middle'>${value}</td>`
    }
  };
}

// Create a single row
function createRow(item, columnConfig) {
  const row = document.createElement('tr');
  row.setAttribute('draggable', 'true');

  const columnOrder = tableHeaders.length ? tableHeaders : Object.keys(item);

  // Generate row content
  row.innerHTML = columnOrder
    .map(key => {
      const value = item[key] ?? '';
      const config = Object.values(columnConfig)
        .find(conf => conf.test(key));
      return config.render(value);
    })
    .join('') +
    `<td class='middle '><button class='edit-btn' onclick="openDetailsPageInFilemaker('${item.PrimaryKey}')">Edit</button></td>`;

  // Add click handler for actions
  //const actionCell = row.querySelector('.cursor');
  //actionCell.addEventListener('click', e => togglePopup(e, item));

  return row;
}

// Format numbers with locale and proper decimals
function formatNumber(value) {
  if (typeof value === 'number') {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }
  return value;
}

// Handle global clicks for popup
function handleGlobalClick(event) {
  const popup = document.querySelector('.popup');
  if (popup && !popup.contains(event.target) && !event.target.closest('.cursor')) {
    popup.classList.remove('active');
  }
}

// Initialize drag and drop functionality
function initializeDragAndDrop() {
  const headers = document.querySelectorAll('th');
  const rows = document.querySelectorAll('tbody tr');

  let draggedElement = null;
  let isDraggingHeader = false;

  // Add drag handlers
  function addDragHandlers(elements, isHeader) {
    elements.forEach(element => {
      element.addEventListener('dragstart', () => {
        draggedElement = element;
        isDraggingHeader = isHeader;
        element.classList.add('dragging');
      });

      element.addEventListener('dragend', () => {
        draggedElement = null;
        element.classList.remove('dragging');
      });

      element.addEventListener('dragover', e => {
        e.preventDefault();
        if (isDraggingHeader === isHeader) {
          element.classList.add('drag-over');
        }
      });

      element.addEventListener('dragleave', () => {
        element.classList.remove('drag-over');
      });

      element.addEventListener('drop', e => {
        e.preventDefault();
        if (draggedElement && draggedElement !== element && isDraggingHeader === isHeader) {
          if (isHeader) {
            swapColumns(draggedElement, element);
          } else {
            swapRows(draggedElement, element);
          }
        }
        element.classList.remove('drag-over');
      });
    });
  }

  addDragHandlers(headers, true);
  addDragHandlers(rows, false);
}

// ** Swap Columns **
function swapColumns(header1, header2) {
  const table = header1.closest('table');
  const colIndex1 = Array.from(header1.parentNode.children).indexOf(header1);
  const colIndex2 = Array.from(header2.parentNode.children).indexOf(header2);

  // Swap headers
  const temp = header1.innerHTML;
  header1.innerHTML = header2.innerHTML;
  header2.innerHTML = temp;

  // Swap column data for all rows
  Array.from(table.querySelectorAll('tbody tr')).forEach((row) => {
    const cell1 = row.children[colIndex1];
    const cell2 = row.children[colIndex2];
    const tempCell = cell1.innerHTML;
    cell1.innerHTML = cell2.innerHTML;
    cell2.innerHTML = tempCell;
  });
}

// ** Swap Rows **
function swapRows(row1, row2) {
  const tbody = row1.parentNode;

  // Insert the dragged row before/after the target row
  tbody.insertBefore(row1, row2.nextSibling);

}


// Close the pop-up if clicked outside

function showNextTableData() {
  if (current_index < button_end_index) {
    current_index++;
    fetchListViewDataFromFilemaker()
    //displayIndexButtons();
  }
}

function showPreviousTableData() {
  if (current_index < start_index) {
    current_index--;
    fetchListViewDataFromFilemaker()
    //displayIndexButtons();
  }
}

function showSelectedTableData(index) {
  if (index <= button_end_index && index >= 1) {
    current_index = index;
    fetchListViewDataFromFilemaker()
   // displayIndexButtons();
  }
}

function calculateTableData() {
  //searchAndFilterTableDataWithSearch();

  if (isSorted == true) {
    sortTableData();
  }

  button_end_index = parseInt(data_length / table_size);

  max_index = current_index + 3;

  if (data_length % table_size > 0) {
    button_end_index++;
  }
  if (tableHeaders[0] === '') {
    tableHeaders.shift(); // removes the first element
  }

  if (allColumnNames[0] === '') {
    allColumnNames.shift(); // removes the first element
  }
  displayIndexButtons();
}







function searchAndFilterTableDataWithSearch() {


  //console.log('inside filters')
  jsonData = listData
  //console.log(filters)
  //delete filters.title

 



  var search_text = $('#search-input').val();
  console.log(search_text)
  if (search_text != '') {

    jsonData = jsonData.filter(function (object) {
      // Get all searchable values from the object
      return Object.entries(object).some(([key, value]) => {
        // Skip null or undefined values
        if (value == null) {
          return false;
        }

        // Skip non-searchable fields (like ids, numbers, etc)
        const nonSearchableFields = ['id', 'price', 'rating', 'order', 'sku'];
        if (nonSearchableFields.includes(key)) {
          return false;
        }

        // Convert both the search text and value to strings and uppercase for comparison
        const stringValue = value.toString().toUpperCase();
        const searchValue = search_text.toUpperCase();

        return stringValue.includes(searchValue);
      });
    });
    console.log(jsonData)
  }

  data_length = jsonData.length;
  table_size = 100//parseInt($('#table_size').val());
  start_index = 1;
  button_start_index = 1;
  button_end_index = parseInt(data_length / table_size);
  end_index = start_index + table_size;
  current_index = 1;
  max_index = start_index + 3;

  if (data_length % table_size > 0) {
    button_end_index++;
  }
}

function sortTableData() {


  return jsonData.sort((a, b) => {
    let valueA = a[sortColumn];
    let valueB = b[sortColumn];

    // Handle cases where the data type could be numbers, strings, or dates
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      // If both are strings, compare them lexicographically
      return ascendingOrder ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else if (typeof valueA === 'number' && typeof valueB === 'number') {
      // If both are numbers, compare numerically
      return ascendingOrder ? valueA - valueB : valueB - valueA;
    } else if (valueA instanceof Date && valueB instanceof Date) {
      // If both are dates, compare them chronologically
      return ascendingOrder ? valueA - valueB : valueB - valueA;
    } else {
      // Fallback: In case of other data types or mixed types, default to string comparison
      return ascendingOrder ? String(valueA).localeCompare(String(valueB)) : String(valueB).localeCompare(String(valueA));
    }
  });

}


$('#searchButton').click(function () {
  current_index = 1;
  start_index = 1;
  calculateTableData();
});







function setTableHeaders() {

  if ($('.list-view thead').length === 0) {
    $('.list-view').prepend('<thead><tr></tr></thead>');
  }

  // Get headers from the first data item
  const headers = tableHeaders//Object.keys(jsonData[0]);
  //console.log(tableHeaders)


  // Store formatted headers for reuse


  // Clear existing headers
  $('.list-view thead tr').empty();

  // Create header cells
  headers.forEach((header, index) => {
    const th = $('<th>')
      .attr('columnName', header)
      .attr('draggable', true)
      .addClass('sortable')
      .addClass('middle')
      .on("click", function () {
        console.log("Clicked on:", header);
        // Call your function
        RegisterSorting(header);
      });
    //console.log(header)
    if (header === "Name" || header === "Email" || header === "Description" || header === "Product Code") {
      console.log(header)
      th.removeClass("middle")
    }

    if (header === sortColumn) {
      th.html(tableHeaders[index] + (ascendingOrder ? '&#8593;' : '&#8595;'));
    } else {
      th.text(tableHeaders[index]);
    }

    th.oncl

    $('.list-view thead tr').append(th);
  });

  // Add actions header
  var item = $('.list-view thead tr').append($('<th>').addClass('middle').text('Actions'));


  




}













function openDetailsPageInFilemaker(recordId) {
  let openDetailsPageJson = {
    "recordId" :recordId 
  }
    
    FileMaker.PerformScriptWithOption(`Open_Details_Page`, JSON.stringify(openDetailsPageJson), 0);
    
  
}







function showNoDataFound() {
  let warningContainer = document.getElementById("warning-container")
  warningContainer.style.display = 'flex'

  let listViewContainer = document.getElementById("list-view-container")
  let footerSection = document.getElementById("footer")
  listViewContainer.style.display = 'none'
  footerSection.style.display = 'none'

}

function ShowDataContainer() {
  let warningContainer = document.getElementById("warning-container")
  warningContainer.style.display = 'none'

  let dataContainer = document.getElementById("data-container")
  let listViewContainer = document.getElementById("list-view-container")
  let footerSection = document.getElementById("footer")
  listViewContainer.style.display = 'flex'
  footerSection.style.display = 'flex'
}

function RegisterSearchBarButtonClick() {
  /* document.getElementById("#search-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Check if Enter key is pressed
      event.preventDefault(); // Prevents form submission if inside a form
      searchAndFilterTableDataWithSearch();
    }
  }); */




  
  $(document).ready(function () {
    $("#search-input").keydown(function (event) {
        if (event.key === "Enter") { // Check if Enter key is pressed
            event.preventDefault(); // Prevent default behavior (like form submission)
            //searchAndFilterTableDataWithSearch();
            //console.log("enter")
            current_index = 1;
            fetchListViewDataFromFilemaker()
        }
    });

    $("#search-input").blur(function (event) {

        current_index = 1;
        fetchListViewDataFromFilemaker()

    });

});

}


function RegisterSorting(colName) {

  if (isSorted == false)
    isSorted = true
  ascendingOrder = (sortColumn == colName) ? !ascendingOrder : true
  sortColumn = colName
  setTableHeaders()
  calculateTableData()

}





//jsonData = []

if (listData.length == 0) {
  showNoDataFound()

}
else {
  jsonData = listData
  if (Object.keys(jsonData[0]).length < tableHeaders.length) {
    if (tableHeaders[0] == '') {
      tableHeaders.shift()
    }
  }
  ShowDataContainer()
  displayIndexButtons()

}

RegisterSearchBarButtonClick()



function fetchListViewDataFromFilemaker() {
  var jsonData = {
    "listSize": listViewTableSize,
    "startIndex": (current_index - 1) * listViewTableSize + 1,
    "search": $('#search-input').val(),
    
  };
  //current_index++
  //ENVIRONMENT == "CODING"?getDataFromFilemaker(JSON.stringify( generateData())):FileMaker.PerformScriptWithOption(`FetchSelectedRow`, JSON.stringify(jsonData) , 0);


    FileMaker.PerformScriptWithOption(`Refresh_List_View_With_Search`, JSON.stringify(jsonData), 0);
  
}


function getDataFromFilemaker(newJsonData) {
  //console.log(newJsonData)
  try {
    let v = JSON.parse(newJsonData)
    ShowDataContainer()
    console.log(v)
    listData = JSON.parse(v.listData)
    jsonData = listData
    completeDataSize = v.completeDataLength
    data_length = completeDataSize; // e.g., jsonData.length
    button_end_index = Math.ceil(data_length / table_size); // Total pages
    calculateTableData()
  }
  catch (err) {
    console.log(err)
  }
  //console.log(newJsonData)
  // let tempData = JSON.parse(newJsonData);

  //console.log(tempData)
  //listData = tempData
  //jsonData = newJsonData
  //calculateTableData()


}