
class NavigationContainer extends React.Component {

  constructor(props) {
    super(props);
    this.requestJSONData();
    this.state = { 
      dataHasLoaded : false,
      showSlider : false,
      sliderWidth : 0,
      sliderOffsetLeft: 0,
      cityID : "",
    };
  }

  citiesData = [];

  // componentDidUpdate() {
  //   console.log('clicked state', this.state)
  // }

  componentDidMount() {
    // if (this.state.showSlider) {
      window.addEventListener("resize", () => {
        this.updateSlider(this.state.cityID);
        console.log("width", document.documentElement.clientWidth)});
      // window.addEventListener("resize", () => {console.log("width", document.documentElement.clientWidth)});
    // }
    // this.updateSlider(this.state.cityID
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
    if (this.state.showSlider == false) {
      this.setState({
        showSlider : true,
      })
    }

    this.setState({cityID : cityID});

    this.updateSlider(cityID);
    // const cityClicked = document.getElementById(cityID);
    // this.setState({ 
    //   sliderWidth : cityClicked.offsetWidth,
    //   sliderOffsetLeft : cityClicked.offsetLeft,
    // });
  }

  updateSlider(cityID) {
    // this.setState({cityID : cityID});

    let cityClicked = document.getElementById(cityID);
    this.setState({
      cityID : cityID,
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
        // console.log("city clicked", city.section)
        cities.push(<CityItem cityLabel={city.label} cityID={city.section} key={`city-${i}`} onClick={() => this.cityOnClick(city.section)} />)
      }
    }
    return cities;
  }

  render() {
    const {showSlider, sliderWidth, sliderOffsetLeft} = this.state;

    return (
      <div className="navigation-container">
        <div className="cities-list">
          {this.displayCities()}
        </div>

        <BottomBar showSlider={showSlider} sliderWidth={sliderWidth} sliderOffsetLeft={sliderOffsetLeft}/>
      </div>
    )
  }
}

class CityItem extends React.Component {

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

    const {showSlider, sliderWidth, sliderOffsetLeft} = this.props;

    const clickStyle = {
      width: sliderWidth,
      transform : `translateX(${sliderOffsetLeft - 20}px)`,  //subtract 20px because the navigation container has padding-left set at 20px,
      transition: "all 0.5s",
    }

    return (
      <div className="bottom-bar">
        {showSlider ? 
          <div className="slider" style={clickStyle}/> 
          : null
        }
      </div>
    )
  }
}








const domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(<NavigationContainer />, domContainer);