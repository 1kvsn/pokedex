import React, { Component } from 'react';
import './App.css';

class Parent extends Component {
  constructor() {
    super()
    this.state = {
      pokes: [],
      images: [],
      userSearch: "",
      filtered: [],
    }
  }
  imageIndex(string) {
    var newUse = string.split('/')
    return newUse[newUse.length-2];
  }

  componentDidMount = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=20").then(res => res.json()).then(data => this.setState({pokes: data.results}))
  }

  handleChange = (e) =>  {
    var arr = this.state.pokes.filter(poke => {
      return poke.name.startsWith(e.target.value.toLowerCase())
    })
    this.setState({
      filtered: arr,
    })
  }

  render() {
    if(this.state.filtered.length === 0) {
      return this.renderAll();
    } else {
      return this.renderFiltered();
    }
  }

  renderAll() {
    // console.log(this.state);
    return (
      <div className="container-super">
        <div className="header-container">
          <h1>Pokeverse</h1>
          <input onChange={this.handleChange} type='text' placeholder='Search Pokes...' />
        </div>

        <div className="poke-flex">
          {
            this.state.pokes.map((poke, index) => {
              const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.imageIndex(poke.url)}.png`
              return (
                <div className="poke">
                  <img className="pic" src={url} alt="pokemon" />
                  <p>{poke.name}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }

  renderFiltered() {
    return (
      <div className="container-super">
        <div className="header-container">
          <h1>Pokeverse</h1>
          <input onChange={this.handleChange} type='text' placeholder='Search Pokes...' />
        </div>
          <div className="poke-flex">
            {
              this.state.filtered.map((poke, index) => {
                const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.imageIndex(poke.url)}.png`
                return (
                  <div className="poke">
                    <img src={url} alt="pokemon" width="120px" height="120px"/>
                    <p>{poke.name}</p>
                  </div>
                )
              })
            }
          </div>
      </div>
      
    )
  }
}

export default Parent;

//Pokemon API link
// https://pokeapi.co/api/v2/pokemon/?limit=100

//Pokemon Image Link
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png