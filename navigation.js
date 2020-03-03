var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationPage = function (_React$Component) {
  _inherits(NavigationPage, _React$Component);

  function NavigationPage(props) {
    _classCallCheck(this, NavigationPage);

    var _this = _possibleConstructorReturn(this, (NavigationPage.__proto__ || Object.getPrototypeOf(NavigationPage)).call(this, props));

    _this.citiesData = [];

    _this.requestJSONData();
    _this.state = {
      dataHasLoaded: false,
      showSlider: false,
      sliderWidth: 0,
      sliderOffsetLeft: 0,
      city: "",
      cityTimeZone: "UTC",
      isResizing: false
    };
    return _this;
  }

  _createClass(NavigationPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      window.addEventListener("resize", function () {
        return _this2.updateSlider(_this2.state.city, true);
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
      if (!this.state.showSlider) {
        this.setState({ showSlider: true });
      }

      this.setState({ city: city });

      this.updateSlider(city);
    }

    // update in the state the slider's width, offsetLeft, and whether browser is resizing

  }, {
    key: "updateSlider",
    value: function updateSlider(city, resizing) {
      var cityClicked = document.getElementById(city);

      resizing ? this.setState({ isResizing: true }) : this.setState({ isResizing: false });

      this.setState({
        sliderWidth: cityClicked ? cityClicked.offsetWidth : 0,
        sliderOffsetLeft: cityClicked ? cityClicked.offsetLeft : 0
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
          var cityName = city.section; // the city name in camel-case
          cities.push(React.createElement(CityItem, {
            cityID: cityName,
            cityClassName: cityName,
            cityClicked: _this4.state.city,
            cityLabel: city.label,
            key: "city-" + i,
            onClick: function onClick() {
              _this4.cityOnClick(cityName);
              _this4.setState({ cityTimeZone: city.label });
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
          sliderOffsetLeft = _state.sliderOffsetLeft,
          isResizing = _state.isResizing;


      return React.createElement(
        "div",
        { className: "navigation-page" },
        React.createElement(
          "div",
          { className: "navigation-container" },
          React.createElement(
            "div",
            { className: "cities-list" },
            this.displayCities()
          ),
          React.createElement(BottomBar, { showSlider: showSlider, sliderWidth: sliderWidth, sliderOffsetLeft: sliderOffsetLeft, noTransition: isResizing })
        ),
        showSlider ? React.createElement(LocalTime, { cityTimeZone: this.state.cityTimeZone }) : null
      );
    }
  }]);

  return NavigationPage;
}(React.Component);

// normally I would use FlowJS to check typing; I am not using Flow here, but I thought I would provide PropTypes anyway


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
          cityID = _props.cityID,
          cityClassName = _props.cityClassName,
          cityClicked = _props.cityClicked,
          cityLabel = _props.cityLabel,
          onClick = _props.onClick;


      return React.createElement(
        "div",
        { className: "city-item " + (cityClassName == cityClicked ? "black-highlight" : ""), id: cityID, onClick: onClick },
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
          sliderOffsetLeft = _props2.sliderOffsetLeft,
          noTransition = _props2.noTransition;


      var clickStyle = {
        width: sliderWidth,
        transform: "translateX(" + (sliderOffsetLeft - 20) + "px)", //subtract 20px because the navigation container has padding-left set at 20px,
        transition: noTransition ? null : "all 0.5s" // slider automatically adjusts position without transition time when user resizes browser window
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

var LocalTime = function (_React$Component4) {
  _inherits(LocalTime, _React$Component4);

  function LocalTime(props) {
    _classCallCheck(this, LocalTime);

    var _this7 = _possibleConstructorReturn(this, (LocalTime.__proto__ || Object.getPrototypeOf(LocalTime)).call(this, props));

    _this7.state = { date: new Date() };
    return _this7;
  }

  _createClass(LocalTime, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this8 = this;

      this.timerID = setInterval(function () {
        return _this8.tick();
      }, 1000);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: "tick",
    value: function tick() {
      this.setState({
        date: new Date()
      });
    }
  }, {
    key: "computeTimeZone",
    value: function computeTimeZone() {
      var standardTimeZone = "UTC";
      var cityTimeZone = this.props.cityTimeZone;
      var formattedTimeZone = cityTimeZone.indexOf(" ") > -1 ? cityTimeZone.split(" ").join("_") : cityTimeZone;

      switch (cityTimeZone) {
        case "Cupertino":
          standardTimeZone = "America/Los_Angeles";
          break;
        case "New York City":
          standardTimeZone = "America/New_York";
          break;
        case "London":
          standardTimeZone = "Europe/" + formattedTimeZone;
          break;
        case "Amsterdam":
          standardTimeZone = "Europe/" + formattedTimeZone;
          break;
        case "Tokyo":
          standardTimeZone = "Asia/" + formattedTimeZone;
          break;
        case "Hong Kong":
          standardTimeZone = "Asia/" + formattedTimeZone;
          break;
        case "Sydney":
          standardTimeZone = "Australia/" + formattedTimeZone;
          break;
      }

      return standardTimeZone;
    }
  }, {
    key: "render",
    value: function render() {

      var timeZoneOptions = {
        timeZone: this.computeTimeZone(),
        hour: 'numeric', minute: 'numeric', second: 'numeric'
      };

      return React.createElement(
        "div",
        { className: "local-time-container" },
        "Local Time: ",
        React.createElement(
          "span",
          { className: "time" },
          this.state.date.toLocaleString([], timeZoneOptions)
        )
      );
    }
  }]);

  return LocalTime;
}(React.Component);

var domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(React.createElement(NavigationPage, null), domContainer);