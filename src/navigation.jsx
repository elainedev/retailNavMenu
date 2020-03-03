
class NavigationContainer extends React.Component {

  constructor(props) {
    super(props);
    this.requestJSONData();
    // this.state = { citiesArr : [] };
  }

  citiesData = [];

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
      this.citiesData = data;
      this.setState({});
    })
    .catch(error => {
      console.log(error);
    })
  }



  render() {
  
    // let {citiesArr} = this.state;
    console.log('JSONData', this.citiesData);

    let cities = [];
    if (this.citiesData.length > 0) {
      for (let i = 0; i < this.citiesData.length; i++) {
        cities.push(<CityItem cityName={this.citiesData[i].section} key={`city-${i}`} />)
      }
    }
    

    return (
      <div className="navigation-container">
        {cities}
      </div>

    )
  }
}

class CityItem extends React.Component {

  render() {
    
    return (
      <div>
      {this.props.cityName}
      </div>
    )
  }

}





const domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(<NavigationContainer />, domContainer);