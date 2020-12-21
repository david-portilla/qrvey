import {selectId} from '../helpers'
import Draw from './Draw'

/**
* Handle fetch comunication
* @author David Portilla <david_portilla@hotmail.com>
*/

class Fetch {
  /**
 * Constructor method
 */
  constructor () {
    this.loading = selectId('loading')
    this.showLoading = this.showLoading.bind(this)
    this.init()
  }

  /**
* Initialize method
*/
  init () {
    /* eslint-disable */
    this.fetchItem('all').then(res => {let sendData = new Draw({data: res})})
    this.showLoading(true)
    /* eslint-eneable */
  }

  /**
* Pull data data from https://restcountries.eu/
* @param {string} id the parameter for pulling the data
* @returns {solved Promise}
*/
  async fetchItem (id) {
    try {
      const params = {
        method: 'GET',
        mode: 'cors'
      }
      const url = `https://restcountries.eu/rest/v2/${ id }?fields=region;name;flag;capital;population;currencies;languages;borders`
      // const url = `https://restcountries.eu/rest/v2/${ id }/`
      /* eslint-disable-next-line */
      const response = await fetch(url, params)
      if (response.ok) {
        const data = await response.json()
        if (data) {
          this.showLoading(false)
          return data
        }
      } else {
        console.log('Server Error', response)
      }
    } catch (error) {
      console.log('Fetch Item Failed: ', error.message)
    }
  }

  /**
* Show loading animation
* @param {boolean} bol - The boolena to control dots animation
*/
  showLoading (bol) {
    if (bol === true) {
      this.loading.classList.add('show')
    } else {
      this.loading.classList.remove('show')
    }
  }
}
export default Fetch
