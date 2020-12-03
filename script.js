class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      author: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // When component first loads.
  componentDidMount() {
    this.handleChange();
  }

  async handleChange() {
    let quote = await getQuote();
    this.setState({
      text: quote["text"],
      author: quote["author"]
    });
  }

  render() {
    return React.createElement(
      "div",
      {
        className:
          "jumbotron rounded-pill shadow w-50 mx-auto my-auto px-5 py-4",
        id: "quote-box"
      },
      React.createElement(
        "p",
        { className: "blockquote text-primary m-2", id: "text" },
        React.createElement("i", { class: "fas fa-quote-left" }),
        " ",
        this.state.text,
        " ",
        React.createElement("i", { class: "fas fa-quote-right" })
      ),
      React.createElement(
        "p",
        {
          className: "blockquote-footer text-secondary text-right",
          id: "author"
        },
        this.state.author
      ),
      React.createElement(
        "div",
        { className: "text-center" },
        React.createElement(
          "button",
          {
            type: "button",
            className: "btn btn-primary btn-sm mx-5",
            id: "new-quote",
            onClick: this.handleChange
          },
          React.createElement("i", { class: "fas fa-redo" }),
          " Refresh"
        )
      )
    );
  }
}

async function getQuote() {
  const url =
    "https://raw.githubusercontent.com/skolakoda/programming-quotes-api/master/backup/quotes.json";
  let response = await fetch(url);
  let json = await response.json();

  json = json[Math.floor(Math.random() * (json.length + 1))];

  return {
    text: json["en"],
    author: json["author"]
  };
}

ReactDOM.render(
  React.createElement(Application, null),
  document.getElementById("app")
);
