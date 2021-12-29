import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Navigator from "./components/AddNav";
import PageTitle from "./components/PageTitle";

function App() {
  const url = `${process.env.REACT_APP_API_URL}`;
  const [quoteObj, setQuoteObj] = useState(null);

  // Function GET request new quote from MongoDB
  const getNewQuote = () => {
    axios.get(url).then((res) => {
      var randObjIndex = Math.floor(Math.random() * res.data.length); // Get a random index position in quote' objects
      setQuoteObj(res.data[randObjIndex]);
    });
  };

  
  // Onload the quote object is not yet exist then do get-request and create a quote object
  if (!quoteObj) {
    axios.get(url).then((res) => {
      var randObjIndex = Math.floor(Math.random() * res.data.length); // Get a random index position in quote' objects
      setQuoteObj(res.data[randObjIndex]);
    });
    return (
      <></> // Return no JSX Component ?? and it worked?? idk wtf is going here!!
    );
  }

  // JSX Component
  return (
    <>
      <Navigator />

      <PageTitle title="Generate Quote"/>

      <div className="quote-box">
        <div className="display-quote">
          <p className="quote">"{quoteObj.quote}"</p>
          <p className="author">- {quoteObj.author}</p>
        </div>
        <div className="button-options">
          <Link to={`/edit/${quoteObj._id}`}>
            <button className="submit-btn">
              <i className="fas fa-edit" /> Edit
            </button>
          </Link>
          <button onClick={getNewQuote} className="submit-btn">
            Next <i className="fas fa-angle-double-right" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
