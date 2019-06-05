import React from "react";
import "./App.css";

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

class SingleRepo extends React.Component {

  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick(){
    this.props.onClick(this.props.jsonData.owner, this.props.jsonData.name)
  }
  render () {
  return (
    <tr key={this.props.step}>
      <td><input type="radio" name="pick" onClick = {this.onClick}/> </td>
      <td>{this.props.jsonData.owner}</td>
      <td>{this.props.jsonData.name}</td>
    </tr>
  );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      getUrl: "https://api.github.com/repos/davidbguo/React_Sample_Project/commits",
      commitJSON: null,
      repoJSON: [],
      repoList: [],
      collabList: ["axk737", "davidbguo"]
    };
    this.setURL = this.setURL.bind(this);
    this.getListOfCommits = this.getListOfCommits.bind(this);
    this.getListOfRepos = this.getListOfRepos.bind(this);
  }

  setURL(owner, repo) {
    console.log(owner, repo)
    const git = "https://api.github.com/repos/";
    var url = git + owner + "/" + repo + "/commits";
    this.setState({ getUrl: url });
  }

  getListOfRepos() {
    const gitURL = "https://api.github.com/users/"
    for (var user in this.state.collabList) {
      var fetchURL = gitURL + this.state.collabList[user] + "/repos";
      fetch(fetchURL)
      .then(response => response.json())
      .then(data => {
        var singleRepoJSON = {
          name: null,
          owner: null
        };
        var repoJSONList = [];
        for (var repo in data) {
          singleRepoJSON = {
            name: data[repo].name,
            owner: data[repo].owner.login
          }
          repoJSONList = repoJSONList.concat([singleRepoJSON]);
        }
        this.setState({ repoJSON: this.state.repoJSON.concat(repoJSONList) })
      })
      .catch(error => console.log(error));
    }
  }

  getListOfCommits() {
    fetch(this.state.getUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({ commitJSON: data });
      })
      .catch(error => console.log(error));
  }

  componentWillMount() {
    this.getListOfRepos();
    this.getListOfCommits();
  }

  componentWillUpdate(){
    this.getListOfCommits();
  }

  render() {
    return (
      <div className="App">
        <div className="RepositorySelector" >
         <RepoSelecter jsonData={this.state.repoJSON} onClick = {(owner, name) => this.setURL(owner, name)} />
        </div>
        <div className="CommitLogs" >
          <CommitLogs jsonData={this.state.commitJSON} />
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

class RepoSelecter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: null
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ fullData: nextProps.jsonData });
   }

  render() {
    const data = this.props.jsonData;
    var table;
    if (data) {
      table = data.map((slice, step) => {
        return (
          <SingleRepo
            jsonData = {slice}
            step = {step}
            onClick = {(owner,name) => this.props.onClick(owner,name)}
          />
        )
      });
    }
    return (
      <table>
        <thead>
          <tr>
            <th colspan="1"></th>
            <th>Owner</th>
            <th>Repo</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
    );
  }
}

export default App;
