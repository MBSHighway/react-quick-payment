import React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

class Layout extends React.Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}

export default Layout;