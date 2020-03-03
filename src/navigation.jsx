class NavigationPage extends React.Component {

  constructor(props) {
    super(props);
    this.requestJSONData();
    this.state = { 
      dataHasLoaded : false,
      showSlider : false,
      sliderWidth : 0,
      sliderOffsetLeft: 0,
      city : "",
      cityTimeZone : "UTC",
      isResizing : false,
    };
  }

  citiesData = [];

  componentDidMount() {
    window.addEventListener("resize", () => this.updateSlider(this.state.city, true));
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
  cityOnClick(city) {
    if (! this.state.showSlider) {
      this.setState({ showSlider : true });
    }

    this.setState({ city: city });

    this.updateSlider(city);
  }

  // update in the state the slider's width, offsetLeft, and whether browser is resizing
  updateSlider(city, resizing) {
    let cityClicked = document.getElementById(city);

    resizing ? this.setState({isResizing : true}) : this.setState({isResizing : false});

    this.setState({
      sliderWidth : cityClicked ? cityClicked.offsetWidth : 0,
      sliderOffsetLeft : cityClicked ? cityClicked.offsetLeft : 0,
    });
  }

  // use for loop to loop through citiesData and display each city 
  displayCities() {
    const cities = [];
    const numberCities = this.citiesData.length;

    if (numberCities > 0) {
      for (let i = 0; i < numberCities; i++) {
        const city = this.citiesData[i];
        const cityName = city.section;  // the city name in camel-case
        cities.push(<CityItem 
          cityID={cityName}
          cityClassName={cityName}
          cityClicked={this.state.city}
          cityLabel={city.label}
          key={`city-${i}`}
          onClick={() => {
            this.cityOnClick(cityName); 
            this.setState({cityTimeZone : city.label});}
          } />) 
      }
    }
    return cities;
  }

  render() {
    const {showSlider, sliderWidth, sliderOffsetLeft, isResizing} = this.state;

    return (
      <div className="navigation-page">
        <div className="navigation-container">
          <div className="cities-list">
            {this.displayCities()}
          </div>

          <BottomBar showSlider={showSlider} sliderWidth={sliderWidth} sliderOffsetLeft={sliderOffsetLeft} noTransition={isResizing} />

        </div>

        {showSlider ?
          <LocalTime cityTimeZone={this.state.cityTimeZone} />
          : null
        }

      </div>
    )
  }
}


// normally I would use FlowJS to check typing; I am not using Flow here, but I thought I would provide PropTypes anyway
type CityItemPropsType = {
  cityID : string,
  cityClassName : string,
  cityClicked : string,
  cityLabel : string,
  onClick : () => void,
}

class CityItem extends React.Component<CityItemPropsType> {

  render() {
    const {cityID, cityClassName, cityClicked, cityLabel, onClick} = this.props;

    return (
      <div className={`city-item ${cityClassName == cityClicked ? "black-highlight" : ""}`} id={cityID} onClick={onClick} >
        {cityLabel}
      </div>
    )
  }
}

type BottomBarPropsType = {
  showSlider : boolean,
  sliderWidth : number,
  sliderOffsetLeft : number,
  noTransition : boolean,
}

class BottomBar extends React.Component<BottomBarPropsType> {

  render() {

    const {showSlider, sliderWidth, sliderOffsetLeft, noTransition} = this.props;

    const clickStyle = {
      width: sliderWidth,
      transform : `translateX(${sliderOffsetLeft - 20}px)`,  //subtract 20px because the navigation container has padding-left set at 20px,
      transition: noTransition ? null : "all 0.5s", // slider automatically adjusts position without transition time when user resizes browser window
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


type LocalTimePropsType = {
  cityTimeZone : string,
}

class LocalTime extends React.Component<LocalTimePropsType> {

  constructor(props) {
    super(props);
    this.state = {date : new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  computeTimeZone() {
    let timeZone = "";

    switch (this.props.cityTimeZone) {
      case "Cupertino":
        timeZone = "America/Los_Angeles";
        break;
      case "New York City":
        timeZone = "America/New_York";
        break;
      case "London":
        timeZone = "Europe/London";
        break;
      case "Amsterdam":
        timeZone = "Europe/Amsterdam";
        break;
      case "Tokyo":
        timeZone = "Asia/Tokyo";
        break;
      case "Hong Kong":
        timeZone = "Asia/Hong_Kong";
        break;
      case "Sydney":
        timeZone = "Australia/Sydney";
        break;
    }

    return timeZone;
  }

  timeZoneOptions = {
    timeZone : this.computeTimeZone(),
    hour: 'numeric', minute: 'numeric', second: 'numeric',
  }

  render() {

    let timeZoneOptions = {
      timeZone : this.computeTimeZone(),
      hour: 'numeric', minute: 'numeric', second: 'numeric',
    }

    return (
      <div className="local-time-container">
        Local Time: <span className="time">{this.state.date.toLocaleString([], timeZoneOptions)}</span>
      </div>
    )
  }
}








const domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(<NavigationPage />, domContainer);