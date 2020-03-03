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
    // this.state = { citiesArr : [] };
    return _this;
  }

  _createClass(NavigationContainer, [{
    key: 'requestJSONData',
    value: function requestJSONData() {
      var _this2 = this;

      new Promise(function (resolve, reject) {
        var citiesRequest = new XMLHttpRequest();

        citiesRequest.open('GET', 'https://raw.githubusercontent.com/elainedev/retailNavMenu/master/src/navigation.json');

        citiesRequest.onload = function () {
          var citiesData = JSON.parse(citiesRequest.responseText);

          if (citiesData) {
            resolve(citiesData.cities);
          } else {
            reject("failed to obtain data");
          }
        };
        citiesRequest.send();
      }).then(function (data) {
        console.log("data obtained:", data);
        _this2.citiesData = data;
        _this2.setState({});
      }).catch(function (error) {
        console.log(error);
      });
    }
  }, {
    key: 'displayCities',
    value: function displayCities() {
      var cities = [];
      var numberCities = this.citiesData.length;

      if (numberCities > 0) {
        for (var i = 0; i < numberCities; i++) {
          cities.push(React.createElement(CityItem, { cityName: this.citiesData[i].section, key: 'city-' + i }));
        }
      }

      return cities;
    }
  }, {
    key: 'render',
    value: function render() {

      console.log('JSONData', this.citiesData);

      return React.createElement(
        'div',
        { className: 'navigation-container' },
        this.displayCities()
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
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        null,
        this.props.cityName
      );
    }
  }]);

  return CityItem;
}(React.Component);

var domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(React.createElement(NavigationContainer, null), domContainer);