import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        
          <Link to="/hotels/1" className="linkList">
          <PropertyList/>   
    
    </Link>
    
   
       
        <h1 className="homeTitle">Homes guests love</h1>
        <Link to="/hotels/1" className="linkList">
        <FeaturedProperties/> 
    
    </Link>
       
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
