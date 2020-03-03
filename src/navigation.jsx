class NavigationContainer extends React.Component {

  constructor(props) {
    super(props);
    this.requestJSONData();
    this.state = { 
      dataHasLoaded : false,
      showSlider : false,
      sliderWidth : 0,
      sliderOffsetLeft: 0,
      city : "",
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
        cities.push(<CityItem cityLabel={city.label} cityID={city.section} key={`city-${i}`} onClick={() => this.cityOnClick(city.section)} />)
      }
    }
    return cities;
  }

  render() {
    const {showSlider, sliderWidth, sliderOffsetLeft, isResizing} = this.state;

    return (
      <div className="navigation-container">
        <div className="cities-list">
          {this.displayCities()}
        </div>

        <BottomBar showSlider={showSlider} sliderWidth={sliderWidth} sliderOffsetLeft={sliderOffsetLeft} noTransition={isResizing} />
      </div>
    )
  }
}

// normally I would use FlowJS to check typing; I am not using Flow here, but I thought I would provide PropTypes anyway
type CityItemPropsType = {
  cityLabel : string,
  cityID : string,
  onClick : () => void,
}

class CityItem extends React.Component<CityItemPropsType> {

  render() {
    const {cityLabel, cityID, onClick} = this.props;

    return (
      <div className="city-item" id={cityID} onClick={onClick} >
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








const domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(<NavigationContainer />, domContainer);