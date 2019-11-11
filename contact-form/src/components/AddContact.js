import React, { Component } from "react";
import 'bulma/css/bulma.css';



class AddContact extends Component {

    state = {
        errors: {},
        password: '',
        confirmPassword: '',
        showPasswordError: false
    }

    handleReset = (e) => {
        e.preventDefault();
        document.getElementById("ContactForm").reset();

    }

    validate = (type, value) => {
        if (value) {
            switch (type) {
                case 'email':
                    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return re.test(value);
                case 'password':
                    re = /^[A-Za-z0-9!@#$%^&*()_]/;
                    return re.test(value);
                case 'name':
                    re = /^[a-zA-Z ]{2,30}/;
                    return re.test(value);
                case 'phone':
                    re = /^\d/;
                    return re.test(value);
                case 'pinCode':
                    re = /^\d/;
                    return re.test(value);
                case 'address':
                    re = /([^\s])/;
                    return re.test(value);
                default:
                    return false;
            }
        }
        return false;
    }

    handlePasswordChange = (e, id) => {
        this.setState({[id]: e.target.value}, () => {
            if (this.state.password && this.state.confirmPassword) {
                if (this.state.password !== this.state.confirmPassword) {
                    let errorCopy = Object.create(this.state.errors);
                    errorCopy['password'] = false;
                    errorCopy['confirmPassword'] = false;
                    this.setState({showPasswordError: true, errors: errorCopy})
                    
                } 
                else {
                    let errorCopy = Object.create(this.state.errors);
                    errorCopy['password'] = false;
                    errorCopy['confirmPassword'] = false;
                    this.setState({ showPasswordError: false, errors: errorCopy })
                }
            } else {
                let errorCopy = Object.create(this.state.errors);

                if (!this.state.password) {
                    errorCopy['password'] = true;

                } else if (!this.state.confirmPassword) {
                    errorCopy['confirmPassword'] = true;

                } else {
                    errorCopy['password'] = false;
                    errorCopy['confirmPassword'] = false;
                }             
                this.setState({ showPasswordError: false, errors: errorCopy })
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const target = event.target;
        let formValue = {};
        for (var i = 0; i < target.elements.length - 3; i++) {
            let id = target.elements[i].id,
                value = target.elements[i].value;
            formValue[id] = value;
        }
        const fname = this.validate('name', formValue.fname);
        const lname = this.validate('name', formValue.lname);
        const email = this.validate('email', formValue.email);
        const phone = this.validate('phone', formValue.phone);
        const password = this.state.showPasswordError ? true : this.validate('password', formValue.password);
        const cpassword = this.state.showPasswordError ? true : this.validate('password', formValue.confirmPassword);
        const address = this.validate('address', formValue.address);
        
        let valid = {
            fname,
            lname,
            email,
            phone,
            password,
            cpassword,
            address,
        };
        const { errors } = this.state;
        errors['fname'] = !fname;
        errors['lname'] = !lname;
        errors['email'] = !email;
        errors['phone'] = !phone;
        errors['password'] = !password;
        errors['confirmPassword'] = !cpassword;
        errors['address'] = !address;
        if (Object.keys(valid).every((k) => { return valid[k] === true; }) && !this.state.showPasswordError) {
            //props function
            this.props.addUser(formValue);
        }
        this.setState({ errors });
    }



    render() {
        const fieldDetails = [
            { type: 'text', id: 'fname', placeholder: 'Enter The First Name', text: 'First Name: ', errorText:'Please Enter First Name'},
            { type: 'text', id: 'lname', placeholder: 'Enter The Last Name', text: 'Last Name: ', errorText: 'Please Enter Last Name'}
        ];
        const emailPhone = [
            { type: 'email', id: 'email', placeholder: 'Enter The Email', text: 'Email: ', errorText: 'Please Enter Email'},
            { type: 'text', id: 'phone', placeholder: 'Enter The Mobile Number', text: 'Mobile No. : ', errorText: 'Please Enter Mobile Number'}
        ];
        const pcPassword = [
            { type: 'password', id: 'password', placeholder: 'Enter The Password', text: 'Password: ', errorText: 'Please Enter Password'},
            { type: 'password', id: 'confirmPassword', placeholder: 'Enter The Confirm Password', text: 'Confirm Password: ', errorText: 'Please Enter Confirm Password.'}
        ];

        return (
            <div className="ContactApp">
                <div className="box">
                    <form id="ContactForm" onSubmit={this.handleSubmit}>
                        <h1 className="title has-text-primary has-text-centered">Contact Form</h1>
                        <div className="columns">
                            {
                                fieldDetails.map((value, index) => (
                                    <div className="column" key={`${value.id}_${index}`}>
                                        <div className="field">
                                            <label className="label" htmlFor={value.id}>{value.text}</label>
                                            <div className="control">
                                                <input className="input" type={value.type} id={value.id} placeholder={value.placeholder} />
                                            </div>
                                            {
                                                this.state.errors[value.id] ? <p style={{ textAlign: 'left', marginTop: '10px', marginBottom: '10px' }} className="help is-danger level-left">{value.errorText}</p> : null
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="columns">
                            {
                                emailPhone.map((value, index) => (
                                    <div className="column" key={`${value.id}_${index}`}>
                                        <div className="field">
                                            <label className="label" htmlFor={value.id}>{value.text}</label>
                                            <div className="control">
                                                <input className="input" maxLength={value.type === 'email' ? undefined : "10"} type={value.type} id={value.id} placeholder={value.placeholder} />
                                            </div>
                                            {
                                                this.state.errors[value.id] ? <p style={{ textAlign: 'left', marginTop: '10px', marginBottom: '10px' }} className="help is-danger level-left">{value.errorText}</p> : null
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="columns">
                            {
                                pcPassword.map((value, index) => (
                                    <div className="column" key={`${value.id}_${index}`}>
                                        <div className="field">
                                            <label className="label" htmlFor={value.id}>{value.text}</label>
                                            <div className="control">
                                                <input className="input" type={value.type} id={value.id} onChange={(e) => this.handlePasswordChange(e, value.id)} placeholder={value.placeholder} />
                                            </div>
                                            {
                                                this.state.errors[value.id] ? <p style={{ textAlign: 'left', marginTop: '10px', marginBottom: '10px' }} className="help is-danger level-left">{value.errorText}</p> : null
                                            }
                                            {
                                                this.state.showPasswordError ? <p style={{ textAlign: 'left', marginTop: '10px', marginBottom: '10px' }} className="help is-danger level-left">Value not equal.</p> : null
                                            }

                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <label className="label" htmlFor="address">Address: </label>
                                    <div className="control">
                                        <textarea className="textarea" id="address"  placeholder="Enter The Address"></textarea>
                                    </div>
                                    {
                                        this.state.errors['address'] ? <p style={{ textAlign: 'left', marginTop: '10px', marginBottom: '10px' }} className="help is-danger level-left">Please Enter The Address.</p> : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button type="submit" className="button submit-button">Submit</button>
                                    </div>
                                    <div className="control">
                                        <button className="button is-link is-danger" onClick={this.handleReset} >Cancel</button>
                                    </div>
                                    <div className="control">
                                        <button className="button is-link is-info " onClick={this.props.showUserList} >Show User List</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddContact;