import React from "react";
import $ from "jquery";

export default class ContactAddComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errors: [] };

        this.addContact = this.addContact.bind(this);
        this.formContact = this.formContact.bind(this);
        this.sendContactToServer = this.sendContactToServer.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
    }

    addContact() {
        var contact = this.formContact();
        this.sendContactToServer(contact); 
    }

    formContact() {
        return {
            numberPhone: $("#numberPhone").val(),
            data: [
                { key: "Name", value: $("#name").val() },
                { key: "Town", value: $("#town").val() },
                { key: "Date of birth", value: $("#birthDate").val() },
                { key: "Gender", value: $("input[name=gender]:checked").val()},
                { key: "Citizen of the RF", value: $("#isRussian").is(":checked") ? "Yes" : "No" }
            ]
        };
    }

    sendContactToServer(contact) {
        this.setState({ errors: [] });
        $.ajax({
            url: "/api/contact",
            type: "PUT",
            data: contact,
            dataType: "json",
            context: this,
            success: (answer) => this.processAnswer(answer)
        });
    }

    processAnswer(answer) {
        if(answer.ok)
        {
            this.props.updateContacts();
            $("input").val(""); // Reset value
        }
        else
            this.setState({ errors: answer.errors });
    }

    onChangeGender() {}

    render() {
        return (
            <div className="my-2">
                <button className="btn btn-primary mb-2" type="button" data-toggle="collapse" data-target="#contactAddCollapse">Add contact</button>
                <div className="collapse" id="contactAddCollapse">
                    <div className="card card-body">

                        <div className="form-group">
                            <label>Number phone</label>
                            <input className="form-control" type="text" id="numberPhone"></input>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" type="text" id="name"></input>
                        </div>
                        <div className="form-group">
                            <label>Town</label>
                            <select className="form-control" id="town">
                                <option>Tomsk</option>
                                <option>Moskva</option>
                                <option>Vladivostok</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date of birth</label>
                            <input type="date" className="form-control" id="birthDate"></input>
                        </div>
                        <hr></hr>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="genderMale" value="Male" checked onChange={this.onChangeGender}></input>
                            <label className="form-check-label" htmlFor="genderMale">Male</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="gender" id="genderFemale" value="Female"></input>
                            <label className="form-check-label" htmlFor="genderFemale">Female</label>
                        </div>
                        <hr></hr>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="isRussian" id="isRussian"></input>
                            <label className="form-check-label" htmlFor="isRussian">Citizen of the RF?</label>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6">

                                {this.state.errors.length > 0 &&
                                    <ul className="text-danger">
                                        {this.state.errors.map((item, index) =>
                                            <li key={index}>{item}</li>
                                        )}
                                    </ul>
                                }

                            </div>
                            <div className="col-6 text-right">
                                <button className="btn btn-success" onClick={this.addContact}>Save</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}