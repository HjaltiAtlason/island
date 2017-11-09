import React from 'react';


class LoginForm extends React.Component {
  
  // Using a class based component here because we're accessing DOM refs
 
  handleSignIn(e) {
    e.preventDefault()
    let email = this.refs.email.value
    let password = this.refs.password.value
    this.props.onSignIn(email, password)
  }
  
  render() {
    return (
      <form onSubmit={this.handleSignIn.bind(this)}>
        <h3>Vinsamlegast sláðu inn email og lykilorð</h3>
        <input type="text" ref="email" placeholder="enter you email" />
        <br></br>
        <input type="password" ref="password" placeholder="enter password" />
        <br></br>
        <input type="submit" value="Login" />
      </form>
    )
  }

}

export default LoginForm