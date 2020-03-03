

class Navigation extends React.Component {

  constructor(props) {
    super(props)
    this.requestJSONData();
  }

  requestJSONData() {
    const citiesRequest = new XMLHttpRequest();
    citiesRequest.open('GET', 'https://raw.githubusercontent.com/elainedev/retailNavMenu/master/src/navigation.json');
    citiesRequest.onload = () => {
      let citiesArr = JSON.parse(citiesRequest.responseText);
      this.getJSONData(citiesArr);  // pass data to fn getJSONData
    }
    citiesRequest.send();
  }

  getJSONData(data) {
    console.log(data);
  }

  render() {

    // var ourRequest = new XMLHttpRequest();

    // ourRequest.open('GET', 'https://raw.githubusercontent.com/elainedev/retailNavMenu/master/src/navigation.json');
    // ourRequest.onload = function() {
    //   console.log('json', ourRequest.responseText);
    //   this.jsonData = JSON.parse(ourRequest.responseText);
    //   console.log('json parsed', this.jsonData.cities[0].section);
    // }
    // ourRequest.send();

    return (
      <div className="parent">
        
          new test
      </div>

    )
  }
}

class Cities extends React.Component {


}





const domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(<Navigation />, domContainer);