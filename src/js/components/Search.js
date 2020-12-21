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
    this.favoriteBtn = selectId('show-favorites')
    this.listItems = selectAll('.c-list__item')
    this.listCountries = selectAll('.c-list__countries')
    /* eslint-disable-next-line */
    this.storedItems = {...localStorage};
    // bind methods
    this.init = this.init.bind(this)
    this.showOnlyActiveRegion = this.showOnlyActiveRegion.bind(this)
    this.filterData = this.filterData.bind(this)
    this.checkIfFavorite = this.checkIfFavorite.bind(this)
    this.showOnlyFavorites = this.showOnlyFavorites.bind(this)
    // this.filterOnSubmit = this.filterOnSubmit.bind(this)
    this.init()
  }

  /**
* Initialize method
*/
  init () {
    this.searchBar.addEventListener('input', (e) => {
      this.filterData(e.target.value)
      this.favoriteBtn.classList.remove('is-active')
      this.favoriteBtn.firstElementChild.innerHTML = `Show only`
      this.showOnlyActiveRegion()
    })
    this.checkIfFavorite()
    this.favoriteBtn.addEventListener('click', (e) => {
      this.showOnlyFavorites(e)
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

  /**
* Verify if favorites were set previously
*/
  checkIfFavorite () {
    /* eslint-disable */
    if (Object.keys(localStorage).length > 1) {
      Object.keys(localStorage).forEach(id => {
        if (id === 'Qrvey') {
          this.favoriteBtn.classList.add('show')
        }
      })
    }
    /* eslint-eneable */
  }

  /**
* Show only favorite ones
*/
  showOnlyFavorites () {
    this.favoriteBtn.classList.toggle('is-active')
    if (this.favoriteBtn.classList.contains('is-active')) {
      this.favoriteBtn.firstElementChild.innerHTML = `Showing only`
      this.listItems.forEach(item => {
        item.parentElement.classList.add('hide')
      })
      // compare with favorites
      let favorites = Object.keys(localStorage)
      favorites.forEach(id => {
        if (selectId(id)) {
          let currentFav = selectId(id)
          currentFav.parentElement.classList.remove('hide')
        }
      })
    } else {
      this.favoriteBtn.firstElementChild.innerHTML = `Show only`
      this.listItems.forEach(item => {
        item.parentElement.classList.remove('hide')
      })
    }
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
