import React, { useState, useEffect } from "react";
import "./styles.css";
import Axios from "axios";
import Collapsible from "react-collapsible";

function App() {
  const [fav, setFav] = useState([]);
  const [detail, setDetail] = useState([]);

  const fetchSeplls = async () => {
    const { data } = await Axios.get("https://www.dnd5eapi.co/api/spells");
    const allspells = data.results;

    for (let i = 0; i < 3; i++) {
      await Axios.get(
        `https://www.dnd5eapi.co${allspells[i].url}`
      ).then(res => detail.push(res.data));
    }
  };

  useEffect(() => {
    fetchSeplls();
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
          <div>{f}</div>
        ))}
      </div>
    </div>
  );
}

export default App;