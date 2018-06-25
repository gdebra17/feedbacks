import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom';

// import db  from './../../models/index';
// const operator = db.sequelize.Op;
// const uuid = require('uuid-v4');



const Sidebar = ({users}) => (
  <aside id="sidebar" className="sidebar">
    <ul>
      {users.map(user => (

          <Link to={`/IP/${user.id}`} onClick={window.location.reload} ><li key={user.id}>{user.name} <br/> {user.id}</li></Link>

      ))}
    </ul>
  </aside>
)

Sidebar.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
}

export default Sidebar
