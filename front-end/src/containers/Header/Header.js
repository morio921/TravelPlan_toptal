import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { canManageUsers } from '../../helpers/roleHelpers';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropdownOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleDropDown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  handleLogout = (e) => {
    const { signout } = this.props;
    signout();
  }

  render() {
    const { auth } = this.props;

    return (
      <div>
        <Navbar className='navbar-backcolor' light expand='md'>
          <NavbarBrand href='/records'>
            <h3>Travel Plans</h3>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {auth.me
            ? <Nav className="ml-auto" navbar>
              {canManageUsers(auth.me) && <NavItem>
                <Link to='/users' className='nav-link'>
                  <strong>Users</strong>
                </Link>
              </NavItem>}
              <NavItem>
                <Link to='/records' className='nav-link'>
                  <strong>Plans</strong>
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/dashboard' className='nav-link'>
                  <strong>Future Plans</strong>
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <strong>{auth.me.firstName} {auth.me.lastName}</strong>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to='/profile' className='nav-link'>Profile</Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to='/' onClick={this.handleLogout} className='nav-link'>
                      Sign out
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            : <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/signin' className='nav-link'><strong>Log In</strong></Link>
              </NavItem>
              <NavItem>
                <Link to='/signup' className='nav-link'><strong>Sign Up</strong></Link>
              </NavItem>
            </Nav>}
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Header;
