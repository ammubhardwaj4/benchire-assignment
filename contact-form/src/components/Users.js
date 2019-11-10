import React from "react";
import 'bulma/css/bulma.css';

const Users = ({ users, back }) => {
    const UserList = users.length ? (
        users.map((user, index) => { 
            return(
                <tr key={`user_${user.id}`}>
                    <td>{user.fname + ' ' + user.lname}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                </tr>
            )
     })
     ) : (
                <tr>
                    <td colSpan="5" className="has-text-danger has-text-centered">Sorry! No Data Found.</td>
                </tr>
    )

    return(
        <div className="box" style={{ marginTop: '50px' }}>
            <h2 className="subtitle has-text-info has-text-centered">Result</h2>
            <div className="table-container">
                <table className="table is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {UserList}
                    </tbody>                  
                </table>
            </div>
            <div className="columns">
                <div className="column">
                    <div className="field">
                        <div className="control">
                            <button className="button submit-button" onClick={back}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Users;