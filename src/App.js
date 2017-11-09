import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';




class App extends Component {
  constructor(props) {
    super(props)
    // the initial application state
    this.state = {
      user: null,
      urlid: ""

  }
}
  
  

 

  handleSubmit(e) {
    console.log("hello onsubmit")
    var saml2 = require('saml2-js');
    var fs = require('fs');
    var sp_options= {
      
              //entity_id: "https://pure-dawn-17604.herokuapp.com/innskra/",
              entity_id: "http://127.0.0.1:8000/metadata.xml",
              private_key: fs.readFileSync("../public/Traust_audkenni.cer").toString(),
              certificate: fs.readFileSync("../public/Audkennisrot.cer").toString(),
              assert_endpoint: "http://127.0.0.1:8000/innskra/",
              force_authn: true,
              auth_context: { comparison: "exact", class_refs: ["urn:oasis:names:tc:SAML:1.0:am:password"] },
              nameid_format: "urn:oasis:names:tc:SAML:2.0:nameid-format:transient",
              sign_get_request: false,
              allow_unencrypted_assertion: true
      
          }
    var idp_options= {
            sso_login_url: "https://innskraning.island.is/?id=test.jafna.is",
            sso_logout_url: "https://idp.example.com/logout",
            certificates: [fs.readFileSync("../public/Audkennisrot.cer").toString(), fs.readFileSync("../public/Audkennisrot.cer").toString()],
            force_authn: true,
            sign_get_request: false,
            allow_unencrypted_assertion: false
          }

    e.preventDefault()
    
    console.log("hello onsubmit1")
     // Call service provider constructor with options
    var sp = new saml2.ServiceProvider(sp_options);
    console.log("hello onsubmi2")
    // Example use of service provider.
    // Call metadata to get XML metatadata used in configuration.
    var metadata = sp.create_metadata();
    console.log("hello onsubmit3")
    var idp = new saml2.IdentityProvider(idp_options)
    console.log("hello onsubmit4")
    var callback = "http://127.0.0.1:8000/innskra/"
    

    sp.post_assert(idp, {}, callback)
    
    console.log("hello onsubmit5")


    /* fetch('https://innskraning.island.is/?id=test.jafna.is', {
    //fetch('http://127.0.0.1:8000/backdoor/', {
      method: 'post',
      body: {"prufa":"bla"}
    })
    .then((result) => {
      // Get the result
      // If we want text, call result.text()
      console.log("svar: " + result)
      return result.json();
    }).then((jsonResult) => {
      // Do something with the result
      this.setState({urlid: jsonResult.urlToSide})            
    }).catch((error) => {
        this.setState({user: null})
    }) */
  }

  
  render() {
    // Here we pass relevant state to our child components
    // as props. Note that functions are passed using `bind` to
    // make sure we keep our scope to App
    return (
      <div>
          <form onSubmit={this.handleSubmit}>
            <input type="submit" value="Connect to Island.is" />
          </form>
      </div>
    )
  }
}

export default App;

