var dragContainer = document.querySelector('.drag-container');
var itemContainers = [].slice.call(document.querySelectorAll('.board-column-content'));
var columnGrids = [];
var boardGrid;
var input = document.getElementById('task');
var input1 = document.getElementById('task1');
var input2 = document.getElementById('task2');

// Init the column grids so we can drag those items around.
itemContainers.forEach(function (container) {
  var grid = new Muuri(container, {
    items: '.board-item',
    dragEnabled: true,
    dragSort: function () {
      return columnGrids;
    },
    dragContainer: dragContainer,
    dragAutoScroll: {
      targets: (item) => {
        return [
          { element: window, priority: 0 },
          { element: item.getGrid().getElement().parentNode, priority: 1 },
        ];
      }
    },
  })
  .on('dragInit', function (item) {
    item.getElement().style.width = item.getWidth() + 'px';
    item.getElement().style.height = item.getHeight() + 'px';
  })
  .on('dragReleaseEnd', function (item) {
    item.getElement().style.width = '';
    item.getElement().style.height = '';
    item.getGrid().refreshItems([item]);
  })
  .on('layoutStart', function () {
    boardGrid.refreshItems().layout();
  });

  columnGrids.push(grid);
});

// Init board grid so we can drag those columns around.
boardGrid = new Muuri('.board', {
  dragEnabled: true,
  dragHandle: '.board-column-header',
});


function generateBoardItem(item) {
  var itemElem = document.createElement('div');
  var itemTemplate = '' +
      '<div class="board-item" id="'+ item.id + '">' +
      '<div class="board-item-content">' +
      '<span class="board-title">' + item.name + '</span>' +
      '</div>' +
      '</div>';

  itemElem.innerHTML = itemTemplate;
  return itemElem.firstChild;
}
function addEvent() {
  console.log(input.value)
    var event = {
      id: 1,
      name: input.value
    }
    
    var item = generateBoardItem(event);
    columnGrids[0].add([item])
    input.value=""
}

function addEvent1() {
  console.log(input1.value)
    var event = {
      id: 1,
      name: input1.value
    }
    
    var item = generateBoardItem(event);
    columnGrids[1].add([item])
    input1.value=""
}
function addEvent2() {
  console.log(input2.value)
    var event = {
      id: 1,
      name: input2.value
    }
    
    var item = generateBoardItem(event);
    columnGrids[2].add([item])
    input2.value=""
}