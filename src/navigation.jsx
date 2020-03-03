
class NavigationContainer extends React.Component {

  constructor(props) {
    super(props);
    this.requestJSONData();
    this.state = { 
      dataHasLoaded : false,
      sliderWidth : 0,
      sliderOffsetLeft: 0,
    };
  }

  citiesData = [];

  componentDidUpdate() {

    console.log('clicked state', this.state)

  }

  requestJSONData() {    
    new Promise((resolve, reject) => {
      const citiesRequest = new XMLHttpRequest();

      citiesRequest.open('GET', 'https://raw.githubusercontent.com/elainedev/retailNavMenu/master/src/navigation.json');

      citiesRequest.onload = () => {
        const citiesData = JSON.parse(citiesRequest.responseText);

        if (citiesData) {
          resolve(citiesData.cities);
        }
        else {
          reject("failed to obtain city list data");
        }
      }
      citiesRequest.send();
    })
    .then(data => {
      console.log("city list data obtained:", data);
      this.citiesData = data;
      this.setState({ dataHasLoaded : true});
    })
    .catch(error => {
      console.log(error);
    })
  }


  // click handler for when a city is clicked on
  cityOnClick(cityID) {
    console.log("clicky", document.getElementById(cityID).offsetWidth);
    const cityClicked = document.getElementById(cityID);
    this.setState({ 
      sliderWidth : cityClicked.offsetWidth,
      sliderOffsetLeft : cityClicked.offsetLeft,
    });
  }

  // use for loop to loop through citiesData and display each city 
  displayCities() {
    const cities = [];
    const numberCities = this.citiesData.length;

    if (numberCities > 0) {
      for (let i = 0; i < numberCities; i++) {
        const city = this.citiesData[i];
        cities.push(<CityItem cityLabel={city.label} cityID={city.section} key={`city-${i}`} onClick={() => this.cityOnClick(city.section)} />)
      }
    }
    return cities;
  }

  render() {

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

  // componentDidMount() {
  //   let city = document.getElementById(this.props.cityID);
  //   console.log("parent", city.offsetParent)
  //   console.log('mounted', city, city.offsetLeft)
  // }

  render() {
    const {cityLabel, cityID, onClick} = this.props;

    return (
      <div className="city-item" id={cityID} onClick={onClick} >
        {cityLabel}
      </div>
    )
  }
}

class BottomBar extends React.Component {


  render() {

    return (
      <div className="bottom-bar">
        <div className="slider" />
      </div>
    )
  }
}








const domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(<NavigationContainer />, domContainer);