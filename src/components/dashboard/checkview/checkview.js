import React, { Component } from "react";
import axios from "axios";
import Card from "../card/card";
import CheckModal from "./checkmodal";
import languages from "../../../resources/languages.json";

class CheckView extends Component {
  constructor(props) {
    super(props);
    // let result = [];
    this.state = {
      name: "",
      course_id: this.props.courseId,
      language: "",
      languages: [],
      start_date: "",
      end_date: "",
      interval: "",
      csvFile: null,
      header: "",
    };
    this.getCard = this.getCard.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    for (var i in languages) this.state.languages.push(i);
  }

  getCard(check) {
    return (
      <Card
        key={check.id}
        id={check.id} 
        name={check.name}
        infoAttr="Start Date"
        infoVal={check.start_date}
        attr="Language:"
        attrVal={check.language}
        //   onViewPress={this.getChecks}
      />
    );
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    if (document.getElementById("header").checked) {
      this.setState({header: "True"});
    } else {
      this.setState({header: "False"});  
    }
    // this.state.csvFile = event.target.files[0];
    console.log(this.state);
  };

  uploadFile = (event) => {
    this.setState({
      csvFile: event.target.files[0],
      loaded: 0,
    });
  };

  handleSubmit = async () => {
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("course_id", this.state.course_id);
    data.append("language", this.state.language);
    data.append("start_date", this.state.start_date);
    data.append("end_date", this.state.end_date);
    data.append("interval", this.state.interval);
    data.append("header", this.state.header);
    data.append("file", this.state.csvFile);

    await axios
      .post("http://127.0.0.1:5000/check/new", data)
      .then((res) => {
        this.props.getChecks(this.state.course_id);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  render() {
    return (
      <div>
        <div class="container">
          <div class="card overflow-hidden mb-3">
            <div class="card-body p-2">
              <div class="row justify-content-between align-items-center pd">
                <div class="col">Checks</div>
                <div class="col">
                  <button
                    type="button"
                    class="btn btn-falcon-primary float-right"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    New Check
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row mr-1">
            {this.props.checks.map((check) => this.getCard(check))}
          </div>
        </div>
        <CheckModal
          handleChange={this.handleChange}
          uploadFile={this.uploadFile}
          handleSubmit={this.handleSubmit}
          languages={this.state.languages}
        />
      </div>
    );
  }
}
export default CheckView;
