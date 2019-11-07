import "popper.js/dist/popper.min.js";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import ReactDOM from "react-dom";
import ContactBaseComp from "./Comps/ContactBaseComp";

if(document.getElementById("ContactBaseComp")) {
    ReactDOM.render(
        <ContactBaseComp />,
        document.getElementById("ContactBaseComp")
    );
}