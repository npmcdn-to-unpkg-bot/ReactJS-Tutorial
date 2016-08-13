var BugFilter = React.createClass({
  render: function() {
    return (
      <div className="bugFilter">
      Bug Filter here
      </div>
    );
  }
});

var BugRow = React.createClass({
  render: function() {
    return (
      <tr className="bugRow">
        <td className="id">{this.props.bug.id}</td>
        <td className="status">{this.props.bug.status}</td>
        <td className="priority">{this.props.bug.priority}</td>
        <td className="owner">{this.props.bug.owner}</td>
        <td className="title">{this.props.bug.title}</td>
      </tr>
    );
  }
});

var BugTable = React.createClass({
  render: function() {

    var bugRows = this.props.bugs.map(function(bug) {
      return (
        <BugRow bug={bug} />
      );
    });

    return (
      <table className="bugTable">
        <thead>
          <tr>
            <th>Id</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Owner</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {bugRows}
        </tbody>
      </table>
    );
  }
});

var BugAdd = React.createClass({
  handleOwnerChange: function(e) {
      this.setState({owner: e.target.value()});
  },
  handleTitleChange: function(e) {
      this.setState({title: e.target.value()});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var form = document.forms.bugAdd;
    var priority = "P2";
    var status = "New";
    var owner = form.owner.value.trim();
    var title = form.title.value.trim();
    this.props.onBugAdd({priority: priority, status: status, owner: owner, title: title});
    form.owner.value = "";
    form.title.value = "";
  },
  render: function() {
    return (
      <div className="bugAdd">
        <form name="bugAdd" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Owner"
            name="owner"/>
          <input
            type="text"
            placeholder="Title"
            name="title"/>
          <input type="submit" name="addBugg" value="Add Bug"/>
        </form>
      </div>
    );
  }
});

var bugData = [
  {id: 1, priority: "P1", status: "Open", owner: "Raven", title: "App crashes when open"},
  {id: 2, priority: "P2", status: "New", owner: "Eddie", title: "Misaligned border on panel"},
];

var BugList = React.createClass({
  getInitialState: function() {
    return {bugs: bugData};
  },
  render: function() {
    return (
      <div>
        <h1>Bug Tracker</h1>
        <BugFilter />
        <hr />
        <BugTable bugs={this.state.bugs} />
        <hr />
        <BugAdd onBugAdd={this.addBug}/>
      </div>
    )
  },
  addBug: function(bug) {
    var bugsModified = this.state.bugs.slice();
    var nextId = this.state.bugs.length + 1;
    bug.id = nextId;
    bugsModified.push(bug);
    this.setState({bugs: bugsModified});
  }
});

ReactDOM.render(
  <BugList />,
  document.getElementById('main')
);
