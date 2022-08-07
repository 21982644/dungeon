import React, { useState, useEffect } from "react";
import "./styles.css";
import Axios from "axios";
import Collapsible from "react-collapsible";

function App() {
  const [fav, setFav] = useState([]);
  const [detail, setDetail] = useState([]);

  const fetchSeplls = async () => {
    if(localStorage.getItem('allspells') === null) {
      const { data } = await Axios.get("https://www.dnd5eapi.co/api/spells");
      const allspells = data.results;
      localStorage.setItem('allspells', JSON.stringify(allspells));  
    }
  };

  useEffect(() => {
    fetchSeplls();
  },[]);

  useEffect(() => {
    const fetchDesc = async () => {
      const spell = JSON.parse(localStorage.getItem('allspells'));
      const all = []
      for (let i = 0; i < spell.length; i++) {
        const desc = await Axios.get(`https://www.dnd5eapi.co${spell[i].url}`);
        all.push(desc.data);
      }
      setDetail(all);
      console.log(all);
    };  
    fetchDesc();
  },[]);

  const addToFavorite = (spell) => {
    const uniq_s = spell.name;
    if (!fav.includes(uniq_s)) {
      setFav([...fav, uniq_s]);
    }
  };

  return (
    <div>
      <div className="left">
        <h3>All Spells</h3>
        {detail.map((d) => (
          <Collapsible trigger={d.name} key={d.name}>
            <button onClick={() => addToFavorite(d)}> 
              Add to favourite
            </button>
            <p>{d.desc}</p>
          </Collapsible>
        ))}
      </div>

      <div className="right">
        <h3>Favourite</h3>
        {fav.map((f) => (
          <div className="fav">{f}</div>
        ))}
      </div>
    </div>
  );
}

export default App;