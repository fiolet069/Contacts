import React from "react";
import $ from "jquery";

export default class ContactListComp extends React.Component {
    constructor(props) {
        super(props);
        this.deleteContact = this.deleteContact.bind(this);
    }

    deleteContact(id) {
        $.ajax({
            url: "/api/contact",
            type: "DELETE",
            data: { id: id },
            context: this,
            success: () => this.props.updateContacts()
        });
    }

    render() {
        return (
            <div>
                {this.props.contacts.length > 0 &&
                <div>

                    <div className="row">
                        {this.props.contacts.map(item =>
                            <div key={item.id} className="col-6 py-2">
                                <div className="card">
                                    <div className="card-body">

                                        <table className="table table-sm table-borderless font-weight-bold m-0">
                                            <tbody>
                                                <tr>
                                                    <td>Number phone</td>
                                                    <td className="text-info">{item.numberPhone}</td>   
                                                </tr>
                                                {item.contactData.map(data =>
                                                    <tr key={item.id + "_" + data.id}>
                                                        <td>{data.name}</td>    
                                                        <td className="text-info">{data.value}</td>    
                                                    </tr>                           
                                                )}
                                                <tr>
                                                    <td></td>
                                                    <td className="text-right"><button className="btn btn-sm btn-danger" onClick={this.deleteContact.bind(this, item.id)}>Удалить</button></td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                
                </div>
                }
            </div>
        );
    }
}