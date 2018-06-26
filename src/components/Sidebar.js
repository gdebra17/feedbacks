import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom';

// import db  from './../../models/index';
// const operator = db.sequelize.Op;
// const uuid = require('uuid-v4');



const Sidebar = ({users}) => (
  <aside id="sidebar" className="sidebar">
    <ul class="list-group">
      {users.map(user => {
        console.log(`/pe/${user.id}` === window.location.pathname);
        if(`/pe/${user.id}` === window.location.pathname){
          return(<Link style={{fontWeight: "bold", color:"white"}} to={`/pe/${user.id}`} onClick={window.location.reload} ><li class="list-group-item list-group-item-action active" key={user.id} style={{marginBottom:3}}>{user.name}</li></Link>)
        } else {
          return(<Link to={`/pe/${user.id}`} onClick={window.location.reload} ><li class="list-group-item list-group-item-action" key={user.id} style={{marginBottom:3}}>{user.name}</li></Link>)
        }
      })}
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
