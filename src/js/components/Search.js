import {selectAll, selectId} from '../helpers'
/**
* Dialog modal component
* @author David Portilla <david_portilla@hotmail.com>
*/
class Search {
  /**
* Constructor method
*/
  constructor () {
    this.searchBar = selectId('get-country')
    this.listItems = selectAll('.c-list__item')
    // bind methods
    this.init = this.init.bind(this)
    this.filterData = this.filterData.bind(this)
    this.init()
  }

  /**
* Initialize method
*/
  init () {
    this.searchBar.addEventListener('input', (e) => {
      this.filterData(e.target.value)
    })
  }

  /**
* Add information to modal
* @param {String} searchTerm the string to check
*/
  filterData (searchTerm) {
    this.listItems.forEach(item => {
      if (item.id.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())) {
        item.parentElement.classList.remove('hide')
      } else {
        item.parentElement.classList.add('hide')
      }
    })
  }
}

export default Search
