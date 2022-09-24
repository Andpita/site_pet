import React from 'react';
import { Nav } from './styled';
import {
  FaHome,
  FaSignInAlt,
  FaUserAlt,
  FaBug,
  FaCircle,
  FaPowerOff,
  FaLock,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());

    history.push('/');
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={30} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={28} />
      </Link>

      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={30} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={30} />
        </Link>
      )}

      <Link to="/test">
        <FaBug size={28} />
      </Link>

      <Link to="/users">
        <FaLock size={28} />
      </Link>

      {isLoggedIn ? (
        <FaCircle size={28} color="#55ff33" />
      ) : (
        <FaCircle size={28} color="#6f110a" />
      )}
    </Nav>
  );
}
