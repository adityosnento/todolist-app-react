import React, {Component} from 'react';  
import MainPage from "./components/layout/Mainpage"
import {library} from "@fortawesome/fontawesome-svg-core"
import {faTrash, faStar, faEdit} from "@fortawesome/free-solid-svg-icons"


library.add(faTrash, faStar);
library.add(faEdit);

class App extends Component {

  render() {
    return(
      <div>
        <MainPage/>
      </div>
   )
  }
}
  
export default App;
