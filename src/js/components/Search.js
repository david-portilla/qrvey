// import {select, selectId} from '../helpers'

import {selectAll, selectId} from '../helpers'

class Search {

  constructor () {
    console.log('Search.js')
    this.searchBar = selectId('get-country')
    this.listItems = selectAll('.c-list__item')
    // bind methods
    this.init = this.init.bind(this)
    this.filterData = this.filterData.bind(this)
    this.init()
  }


  init () {
    this.searchBar.addEventListener('input', (e) => {
      this.filterData(e.target.value);
    });
  }

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
