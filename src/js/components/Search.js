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
    // this.searchBtn = selectId('submitBtn')
    this.listItems = selectAll('.c-list__item')
    this.listCountries = selectAll('.c-list__countries')
    // bind methods
    this.init = this.init.bind(this)
    this.showOnlyActiveRegion = this.showOnlyActiveRegion.bind(this)
    this.filterData = this.filterData.bind(this)
    // this.filterOnSubmit = this.filterOnSubmit.bind(this)
    this.init()
  }

  /**
* Initialize method
*/
  init () {
    this.searchBar.addEventListener('input', (e) => {
      this.filterData(e.target.value)
      this.showOnlyActiveRegion()
    })
  }

  /**
  * Filter countries by searchTerm on change value
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

  /**
* Show only columns with countries
*/
  showOnlyActiveRegion () {
    this.listCountries.forEach(regions => {
      let liItems = Array.from(regions.querySelectorAll('li'))
      let result = liItems.filter(item => item.classList.contains('hide'))
      if (result.length === (regions.querySelectorAll('li').length - 1)) {
        regions.classList.add('is-empty')
      } else {
        regions.classList.remove('is-empty')
      }
    })
  }

  // /**
  // * Filter countries by searchTerm on click
  // * @param {String} searchTerm the string to check
  // */
  // filterOnSubmit (searchTerm) {
  //   this.listItems.forEach(item => {
  //     if (item.id.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())) {
  //       item.parentElement.classList.remove('hide')
  //     } else {
  //       item.parentElement.classList.add('hide')
  //     }
  //   })
  // }
}

export default Search
