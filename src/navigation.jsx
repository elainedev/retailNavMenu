

class Navigation extends React.Component {



  render() {
    const testCondition = true;

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://raw.githubusercontent.com/elainedev/retailNavMenu/master/src/navigation.json');
    ourRequest.onload = function() {
      console.log('finally', ourRequest.responseText);
    }
    ourRequest.send();

    return (
      <div className="parent">
        
          new test
      </div>

    )
  }
}



const domContainer = document.querySelector("#navigation-menu");

ReactDOM.render(<Navigation />, domContainer);