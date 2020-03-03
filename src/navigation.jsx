
class NavigationContainer extends React.Component {

  constructor(props) {
    super(props);
    this.requestJSONData();
    this.state = { dataHasLoaded : false };
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
          reject("failed to obtain city data");
        }
      }
      citiesRequest.send();
    })
    .then(data => {
      console.log("city data obtained:", data);
      this.citiesData = data;
      this.setState({ dataHasLoaded : true});
    })
    .catch(error => {
      console.log(error);
    })
  }

  displayCities() {
    let cities = [];
    let numberCities = this.citiesData.length;

    if (numberCities > 0) {
      for (let i = 0; i < numberCities; i++) {
        cities.push(<CityItem cityLabel={this.citiesData[i].label} cityID={this.citiesData[i].section} key={`city-${i}` } />)
      }
    }
    return cities;
  }

  render() {
    // console.log('JSONData', this.citiesData);

    return (
      <div className="navigation-container">
        <div className="cities-list">
          {this.displayCities()}
        </div>

        <BottomBar />
      </div>
    )
  }
}

class CityItem extends React.Component {

  constructor(props) {
    super(props);
    this.cityRef = React.createRef();
  }

  componentDidMount() {
    let city = document.getElementById(this.props.cityID);
    console.log('mounted', city, city.offsetWidth, city.offsetLeft)
  }

  render() {
    const {cityLabel, cityID} = this.props;

    return (
      <div className="city-item" id={cityID}>
        {cityLabel}
        {this.cityRef.current}
      </div>
    )
  }
}

class BottomBar extends React.Component {


  render() {

    return (
      <div className="bottom-bar">

      </div>
    )
  }

}








const domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(<NavigationContainer />, domContainer);