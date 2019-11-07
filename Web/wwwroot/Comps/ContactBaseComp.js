import React from "react";
import $ from "jquery";
import ContactAddComp from "./ContactAddComp";
import ContactListComp from "./ContactListComp";

export default class ContactBaseComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { contacts: [] };

        this.updateContacts = this.updateContacts.bind(this);
        this.processAnswer = this.processAnswer.bind(this);

        this.updateContacts();
    }

    updateContacts() {
        $.ajax({
            url: "/api/contact",
            type: "GET",
            context: this,
            success: (answer) => this.processAnswer(answer)
        });
    }
    
    processAnswer(answer) {
        this.setState({ contacts: answer });
    }

    render() {
        return (
            <div>
                <h4 className="mb-3">List of contacts</h4>
                <ContactAddComp updateContacts={this.updateContacts}></ContactAddComp>
                <ContactListComp updateContacts={this.updateContacts} contacts={this.state.contacts}></ContactListComp>
            </div>
        );
    }
}