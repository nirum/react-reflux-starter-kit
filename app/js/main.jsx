var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Reflux = require("reflux");

var user = {
    name: "Niru",
    date: new Date().toString(),
    age: 25
};

var actions = Reflux.createActions(
    ["updateAge"]
);

var store = Reflux.createStore({
    listenables: [actions],

    onUpdateAge(){
        user.age += 1;
        this.trigger({user})
    },

    getInitialState() {
        return {user};
    }
});

var App = React.createClass({

    mixins: [Reflux.connect(store)],

    render: function () {
        var u = this.state.user;
        return (
            <div className="container">
                <h1>Hello, {u.name}! :)</h1>
                <h3>{u.date}</h3>
                <h2>Age: <button onClick={actions.updateAge}>{u.age}</button></h2>
            </div>
        )
    }
});

var routes = (
    <Route name="app" path="/" handler={App}></Route>
);

Router.run(routes, Handler => React.render(<Handler/>, document.getElementById('app')));
