import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate , Link } from "react-router-dom";
import {initializeApp } from 'firebase/app';
import {getDatabase,ref,set,push} from 'firebase/database';
import { getAnalytics } from "firebase/analytics";
import  {database} from './Firebase'


const firebaseConfig = {
  apiKey: "AIzaSyDDrkOAagEgBKnlla-qZTgSNNcu2Tdh3HA",
  authDomain: "hotelbook-4737b.firebaseapp.com",
  databaseURL: "https://hotelbook-4737b-default-rtdb.firebaseio.com",
  projectId: "hotelbook-4737b",
  storageBucket: "hotelbook-4737b.appspot.com",
  messagingSenderId: "967922101864",
  appId: "1:967922101864:web:404359727f97a8cb6b15dd",
  measurementId: "G-JCG34ZTXCD"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const Header = ({ type }) => {

    


  
   
  const [valid, setvalid] = useState(true)
  const [hide, sethide] = useState(true)
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const handleDateRangeChange = (item) => {
    setDate([item.selection]);

    const startDateString = item.selection.startDate.toISOString().slice(0, 10);
    const endDateString = item.selection.endDate.toISOString().slice(0, 10);

    const data = {
      startDate: startDateString,
      endDate: endDateString,
    };

    const dataRef = ref(db, "data");
    set(dataRef, data);
  };

  const handleSearch = (e) => {

    e.preventDefault();
    
    // Create a new reference to the database node where you want to store the data
    const dataRef = ref(db, "path/to/data");

    // Use the push function to generate a unique key for the new data
    push(dataRef, {
      destination: destination,
      date: date
    }).then(() => {
      console.log("Data written successfully");
    }).catch((error) => {
      console.error(error);
    });

   

    navigate("/list", { state: { destination, date, options } });

  };
//   const handleSubmit = (e) => {
    
// }

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">

          <Link to="/hotels/:id" className="linkList">
          <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
    </Link>
            
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Travel account
            </p>
            <button className="headerBtn">Sign in / Register</button>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                  value={destination}
                  
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    // onChange={(item) => setDate([item.selection])}
                    onChange={handleDateRangeChange}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                    id='date'
                    value={date}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
