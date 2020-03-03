var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationContainer = function (_React$Component) {
  _inherits(NavigationContainer, _React$Component);

  function NavigationContainer(props) {
    _classCallCheck(this, NavigationContainer);

    var _this = _possibleConstructorReturn(this, (NavigationContainer.__proto__ || Object.getPrototypeOf(NavigationContainer)).call(this, props));

    _this.citiesData = [];

    _this.requestJSONData();
    _this.state = {
      dataHasLoaded: false,
      showSlider: false,
      sliderWidth: 0,
      sliderOffsetLeft: 0,
      city: ""
    };
    return _this;
  }

  _createClass(NavigationContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener("resize", function () {
        return _this2.updateSlider(_this2.state.city);
      });
    }
  }, {
    key: "requestJSONData",
    value: function requestJSONData() {
      var _this3 = this;

      new Promise(function (resolve, reject) {
        var citiesRequest = new XMLHttpRequest();

        citiesRequest.open('GET', 'https://raw.githubusercontent.com/elainedev/retailNavMenu/master/src/navigation.json');

        citiesRequest.onload = function () {
          var citiesData = JSON.parse(citiesRequest.responseText);

          if (citiesData) {
            resolve(citiesData.cities);
          } else {
            reject("failed to obtain city list data");
          }
        };
        citiesRequest.send();
      }).then(function (data) {
        console.log("city list data obtained:", data);
        _this3.citiesData = data;
        _this3.setState({ dataHasLoaded: true });
      }).catch(function (error) {
        console.log(error);
      });
    }

    // click handler for when a city is clicked on

  }, {
    key: "cityOnClick",
    value: function cityOnClick(city) {
      if (this.state.showSlider == false) {
        this.setState({
          showSlider: true
        });
      }

      this.setState({
        city: city
      });

      this.updateSlider(city);
    }
  }, {
    key: "updateSlider",
    value: function updateSlider(city) {
      var cityClicked = document.getElementById(city);

      this.setState({
        sliderWidth: cityClicked.offsetWidth,
        sliderOffsetLeft: cityClicked.offsetLeft
      });
    }

    // use for loop to loop through citiesData and display each city 

  }, {
    key: "displayCities",
    value: function displayCities() {
      var _this4 = this;

      var cities = [];
      var numberCities = this.citiesData.length;

      if (numberCities > 0) {
        var _loop = function _loop(i) {
          var city = _this4.citiesData[i];
          // console.log("city clicked", city.section)
          cities.push(React.createElement(CityItem, { cityLabel: city.label, cityID: city.section, key: "city-" + i, onClick: function onClick() {
              return _this4.cityOnClick(city.section);
            } }));
        };

        for (var i = 0; i < numberCities; i++) {
          _loop(i);
        }
      }
      return cities;
    }
  }, {
    key: "render",
    value: function render() {
      var _state = this.state,
          showSlider = _state.showSlider,
          sliderWidth = _state.sliderWidth,
          sliderOffsetLeft = _state.sliderOffsetLeft;


      return React.createElement(
        "div",
        { className: "navigation-container" },
        React.createElement(
          "div",
          { className: "cities-list" },
          this.displayCities()
        ),
        React.createElement(BottomBar, { showSlider: showSlider, sliderWidth: sliderWidth, sliderOffsetLeft: sliderOffsetLeft })
      );
    }
  }]);

  return NavigationContainer;
}(React.Component);

var CityItem = function (_React$Component2) {
  _inherits(CityItem, _React$Component2);

  function CityItem() {
    _classCallCheck(this, CityItem);

    return _possibleConstructorReturn(this, (CityItem.__proto__ || Object.getPrototypeOf(CityItem)).apply(this, arguments));
  }

  _createClass(CityItem, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          cityLabel = _props.cityLabel,
          cityID = _props.cityID,
          onClick = _props.onClick;


      return React.createElement(
        "div",
        { className: "city-item", id: cityID, onClick: onClick },
        cityLabel
      );
    }
  }]);

  return CityItem;
}(React.Component);

var BottomBar = function (_React$Component3) {
  _inherits(BottomBar, _React$Component3);

  function BottomBar() {
    _classCallCheck(this, BottomBar);

    return _possibleConstructorReturn(this, (BottomBar.__proto__ || Object.getPrototypeOf(BottomBar)).apply(this, arguments));
  }

  _createClass(BottomBar, [{
    key: "render",
    value: function render() {
      var _props2 = this.props,
          showSlider = _props2.showSlider,
          sliderWidth = _props2.sliderWidth,
          sliderOffsetLeft = _props2.sliderOffsetLeft;


      var clickStyle = {
        width: sliderWidth,
        transform: "translateX(" + (sliderOffsetLeft - 20) + "px)", //subtract 20px because the navigation container has padding-left set at 20px,
        transition: "all 0.5s"
      };

      return React.createElement(
        "div",
        { className: "bottom-bar" },
        showSlider ? React.createElement("div", { className: "slider", style: clickStyle }) : null
      );
    }
  }]);

  return BottomBar;
}(React.Component);

var domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(React.createElement(NavigationContainer, null), domContainer);