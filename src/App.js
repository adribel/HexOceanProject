import React from 'react';
import FormCode from './FormCode';
import background from './background.jpg'

class App extends React.Component {
  submit = (values) => {
    fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    })
    .then(response => response.json())
    .then(response => {
      console.log(response);
      let messageBox = document.getElementById("serverResponse");
      if (response.id) {
        messageBox.innerHTML = "Your dish has been successfully added.";
      } else {
        messageBox.innerHTML = "Error: " + JSON.stringify(response);
      }
    });
  }
  render() {
    return (
      <div className="container">
        <img className="img-fluid container m-3" src={background} alt="background" />
        <div id="serverResponse"></div>
        <FormCode onSubmit={this.submit} />
      </div>
      
    )
  }
}

export default App;