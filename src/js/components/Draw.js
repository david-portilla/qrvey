import {selectId, selectAll} from '../helpers'
import Dialog from './Dialog'
import Search from './Search'
/**
* Draw data component
* @author David Portilla <david_portilla@hotmail.com>
*/

class Draw {
  /**
  * Constructor method
  * @param {Object} data the Object with the data
  */
  constructor ({data}) {
    if (!data) {
      return console.log('Data Error: no object recived from Fetch')
    }
    this.data = data
    this.Africa = []
    this.Africa = []
    this.America = []
    this.Asia = []
    this.Europa = []
    this.Ocenania = []

    this.groupByRegion = this.groupByRegion.bind(this)
    this.addDataToDOM = this.addDataToDOM.bind(this)
    this.roundPopulation = this.roundPopulation.bind(this)
    this.getCurrencies = this.getCurrencies.bind(this)
    this.getLanguages = this.getLanguages.bind(this)
    this.getCountries = this.getCountries.bind(this)
    this.templateString = this.templateString.bind(this)
    this.init()
  }

  /**
* Initialize method
*/
  init () {
    this.groupByRegion()
    this.addDataToDOM().then(res => {
      // let createDialog = new Dialog({items: res})
      // let getDialogEl = select(".c-dialog")
      /* eslint-disable-next-line */
      const dialog = new Dialog({
        elems: res,
        dialogEl: 'c-dialog',
        overlayEl: 'c-dialog__overlay'
      })
      /* eslint-disable-next-line */
      const searchBar = new Search()
      // let getCountryBtns = selectAll(".js-open-dialog");
      // // console.log(getDialogEl)
      // // console.log(getCountryBtns)
      // let getAllDialogEls = selectAll(".c-dialog");
      // Array.prototype.forEach.call(getAllDialogEls, function(dialogEl, i) {
      //   // getAllDialogEls.forEach((dialogEl,i) => {
      //   const EachDialog = new Dialog({
      //     dialogEl: "c-dialog",
      //     overlayEl: "c-dialog__overlay"
      //   });
      //   EachDialog.addEventListeners(".js-open-dialog", ".js-close-dialog");
      // })
    })
  }

  /**
 * Create groups and rrder by region
 */
  groupByRegion () {
    for (let k = 0;k < this.data.length;k++) {
      if (this.data[k].region && this.data[k].name && this.data[k].flag) {
        // console.log(this.data[ k ].region.toLowerCase().trim())
        if (this.data[k].region.toLowerCase().trim() === 'africa') {
          this.Africa.push(this.data[k])
        }
        if (this.data[k].region.toLowerCase().trim() === 'americas') {
          this.America.push(this.data[k])
        }
        if (this.data[k].region.toLowerCase().trim() === 'asia') {
          this.Asia.push(this.data[k])
        }
        if (this.data[k].region.toLowerCase().trim() === 'europe') {
          this.Europa.push(this.data[k])
        }
        if (this.data[k].region.toLowerCase().trim() === 'oceania') {
          this.Ocenania.push(this.data[k])
        }
      } else {
        // countries without region
        console.log(`country without region; ${ this.data[k].name }`)
      }
    }
  }

  /**
* Adding data list to DOM
*/
  async addDataToDOM () {
    if (selectId('africa')) {
      selectId('africa').innerHTML = ``
      this.Africa.forEach(ctr => {
        selectId('africa').appendChild(this.templateString(ctr))
      })
    }

    if (selectId('americas')) {
      selectId('americas').innerHTML = ``
      this.America.forEach(ctr =>
        selectId('americas').appendChild(this.templateString(ctr))
      )
    }

    if (selectId('asia')) {
      selectId('asia').innerHTML = ``
      this.Asia.forEach(ctr => {
        selectId('asia').appendChild(this.templateString(ctr))
      })
    }

    if (selectId('europe')) {
      selectId('europe').innerHTML = ``
      this.Europa.forEach(ctr => {
        selectId('europe').appendChild(this.templateString(ctr))
      })
    }

    if (selectId('oceania')) {
      selectId('oceania').innerHTML = ``
      this.Ocenania.forEach(ctr => {
        selectId('oceania').appendChild(this.templateString(ctr))
      })
    }

    let getAllDialogEls = selectAll('.js-open-dialog')
    return getAllDialogEls
  }

  /**
* Template String to creates Regions list
 * @param {Object} ctr - The object to iterate
 * @returns {HTML_string}
*/
  templateString (ctr) {
    let country = document.createElement('li')
    if (ctr.name && ctr.flag) {
      country.innerHTML = `
      <a
        href="#"
        class="c-list__item js-open-dialog"
        id="${ ctr.name }"
        data-name="${ ctr.name }"
        data-region="${ ctr.region }"
        data-flag="${ ctr.flag }"
        data-capital="${ ctr.capital }"
        data-population="${ this.roundPopulation(ctr.population) }"
        data-currency="${ this.getCurrencies(ctr.currencies) }"
        data-languages="${ this.getLanguages(ctr.languages) }"
        data-borders="${ this.getCountries(ctr.borders) }"
      >
        <div class="c-list__item-flag u-bgimg-cover-ctr" style="background-image: url(${ ctr.flag })"></div>
        <span class="c-list__item-name">${ ctr.name }</span>
      </a>
      `
    }
    return country
  }

  /**
* Round amount of population in million units
* @param {number} num - The number to round
* @returns {number} population
*/
  roundPopulation (num) {
    let population = ''
    if (num >= 1000000) {
      population = `${ Math.round(num / 1000000) } M`
    } else {
      population = '< 1M'
    }
    return population
  }

  /**
* Round amount of population in million units
* @param {object} obj - The object to iterate
* @returns {string} currency
*/
  getCurrencies (obj) {
    let currency = ''
    if (obj.length > 1) {
      for (let j = 0;j < obj.length;j++) {
        if (obj[j].name !== null) {
          currency += `${ obj[j].name }, `
        }
      }
      // remove last ', ' from multiple currencies
      if (currency.slice(-1) === ' ') {
        currency = `${ currency.slice(0, -2) }`
      }
    } else {
      currency = `${ obj[0].name } `
    }
    return currency
  }

  /**
* Return lenguages list
* @param {object} obj - The object to iterate
* @returns {string} lenguages
*/
  getLanguages (obj) {
    let lenguages = ''
    if (obj.length > 1) {
      for (let j = 0;j < obj.length;j++) {
        if (obj[j].name !== null) {
          lenguages += `${ obj[j].name }, `
        }
      }
      // remove last ', ' from multiple lenguages
      if (lenguages.slice(-1) === ' ') {
        lenguages = `${ lenguages.slice(0, -2) }`
      }
    } else {
      lenguages = `${ obj[0].name } `
    }
    return lenguages
  }

  /**
* Return list of borders countries
* @param {object} obj - The object to iterate
* @returns {string} countries
*/
  getCountries (obj) {
    let countries = ''
    if (obj.length > 0) {
      for (let j = 0;j < obj.length;j++) {
        countries += `${ obj[j] }, `
      }
      // remove last ',' from multiple countries
      if (countries.slice(-1) === ' ') {
        countries = `${ countries.slice(0, -2) }`
      }
    } else {
      countries = `${ obj[0] } `
    }
    return countries
  }

  /**
* @todo Implement this function.
 * @todo Get the full name of border countries.
 */
  // async getLimitNames (id) {
  //   const url = `https://restcountries.eu/rest/v2/alpha/${ id }/`;
  //   let countryName = ''
  //   try {
  //     let ccObjt = await fetch(url)
  //     let resName = await ccObjt.json()
  //     countryName = resName.name
  //     console.log(countryName)
  //   } catch (error) {
  //     console.log("Fetch Related countri Name Failed: ", error.message);
  //   }
  //   return countryName;
  // }
}

export default Draw
