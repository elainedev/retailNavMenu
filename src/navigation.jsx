

class NavigationContainer extends React.Component {

  constructor(props) {
    super(props);
    this.requestJSONData();
    this.state = { citiesArr : [] };
  }

  requestJSONData() {    
    new Promise((resolve, reject) => {
      const citiesRequest = new XMLHttpRequest();

      citiesRequest.open('GET', 'https://raw.githubusercontent.com/elainedev/retailNavMenu/master/src/navigation.json');

      citiesRequest.onload = () => {
        let citiesData = JSON.parse(citiesRequest.responseText);

        if (citiesData) {
          resolve(citiesData.cities);
        }
        else {
          reject("failed to obtain data");
        }
      }
      citiesRequest.send();
    })
    .then(data => {
      console.log("data obtained:", data);
      this.setState({
        citiesArr : data
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
  
    let {citiesArr} = this.state;
    // console.log('render', this.state.citiesArr, cities)
    // if (cities.length > 0) {
    //   cities = this.state.citiesArr;
    //   console.log("if", cities[0].section)
    // }
    // console.log("outside", cities)
    
    return (
      <div className="navigation-container">
        <CitiesMenu cities={citiesArr.length > 0 ? citiesArr[0].section : ""} />
      </div>

    )
  }
}

class CitiesMenu extends React.Component {

  render() {
    
    return (
      <div>
      {this.props.cities}
      </div>
    )
  }

}





const domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(<NavigationContainer />, domContainer);