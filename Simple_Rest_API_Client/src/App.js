import React from "react";
import "./App.css";

class RepositorySelector extends React.Component {}

function singleCommit(jsonData, step) {
  return (
    <tr key={step}>
      <td>{jsonData.commit.committer.name}</td>
      <td>{jsonData.commit.committer.email}</td>
      <td>{jsonData.commit.committer.date}</td>
      <td>{jsonData.commit.message}</td>
    </tr>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getUrl: "https://api.github.com/repos/octocat/Hello-World/commits",
      jsonResponse: null
    };
  }
  getListOfCommits() {
    fetch(this.state.getUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({ jsonResponse: data });
      })
      .catch(error => console.log(error));
  }

  componentWillMount() {
    this.getListOfCommits();
  }

  render() {
    return (
      <div className="App">
        <div className="RepositorySelector">{/*<RepositorySelector />*/}</div>
        <div className="CommitLogs">
          <CommitLogs jsonData={this.state.jsonResponse} />
        </div>
      </div>
    );
  }
}

class CommitLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: this.props.jsonData
    };
  }

  render() {
    const data = this.props.jsonData;
    var table;
    if (data) {
      table = data.map((slice, step) => {
        return singleCommit(slice, step);
      });
    }
    return (
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Email</th>
            <th>Date</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
    );
  }
}

export default App;
