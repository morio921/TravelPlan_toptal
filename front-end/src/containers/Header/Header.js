import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import { canManageUsers } from '../../helpers/roleHelpers';
import { signout } from '../../redux/modules/auth';

class Header extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    signout: PropTypes.func
  }

  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleLogout = (e) => {
    const { signout } = this.props
    signout()
  }

  render() {
    const { auth } = this.props

    return (
      <div>
        <Navbar color='info' light expand='md'>
          <NavbarBrand href='/'>Travel Plans</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            {auth.me
            ? <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/dashboard' className='nav-link'>Dashboard</Link>
              </NavItem>
              {canManageUsers(auth.me) && <NavItem>
                <Link to='/users' className='nav-link'>Users</Link>
              </NavItem>}
              <NavItem>
                <Link to='/records' className='nav-link'>Records</Link>
              </NavItem>
              <NavItem>
                <Link to='/' onClick={this.handleLogout} className='nav-link'>
                  <FaSignOutAlt />
                </Link>
              </NavItem>
            </Nav>
            : <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to='/signin' className='nav-link'>Sign in</Link>
              </NavItem>
              <NavItem>
                <Link to='/signup' className='nav-link'>Sign up</Link>
              </NavItem>
            </Nav>}
          </Collapse>
        </Navbar>
        {auth.me && <Container fluid className='text-right mt-2 mb-2'>
          Welcome <strong>{auth.me.firstName} {auth.me.lastName}</strong>!
        </Container>}
      </div>
    )
  }
}

const selector = (state) => ({
  auth: state.auth
})

const actions = {
  signout
}

export default connect(selector, actions)(Header)
