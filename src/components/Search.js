import React from 'react';

class Search extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    
    let apiKey = '2bd9981ce2544b157c8f5b06d7e0161d';
    let searchKeyword = this.refs.photoKeyword.value;
    function spaceRemove (x){
      let temp = "";
      for (let i = 0; i < x.length; i++) {
        if(x[i] == " " && x[i+1] == " "){
          continue;
        }
        temp += x[i];
      }
      return temp;
    }    
    let searchValues = spaceRemove(searchKeyword).split(" ")
    this.refs.photoKeyword.value = '';
    this.temp = []
    let _this = this
    this.getImage = function(value){
      let url = `https://api.flickr.com/services/rest/?api_key=${apiKey}&method=flickr.photos.search&format=json&nojsoncallback=1&&per_page=5&page=2&text=${value}`;

    return fetch(url)
      .then(response => {return response.json()} )
      .then(data => { 
        return data.photos.photo
      })
      .catch(error => {
        throw error;
      });
    };
    this.getImage(searchValues[0]).then(function(result){
      result.forEach(elm => {
        elm.type = "one"
        elm.url =  `https://farm${elm.farm}.staticflickr.com/${elm.server}/${elm.id}_${elm.secret}.jpg`;
        _this.temp.push(elm)
      })
    })
    this.getImage(searchValues[1]).then(function(result){
      result.forEach(elm => {
        elm.type = "two" 
        elm.url =  `https://farm${elm.farm}.staticflickr.com/${elm.server}/${elm.id}_${elm.secret}.jpg`;
        
        _this.temp.push(elm)
      })
      _this.props._getPhotos(_this.temp);
    })

  }

  render(){
    return (
      <div className="">
        {/* <h2 className="title">React <img className="heartIconTop" src={require("./iconmonstr-favorite-4-icon-24.png")} alt="heart icon" /> Flickr</h2> */}
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" 
            className="searchInput"
            placeholder="Search keyword..." 
            ref="photoKeyword"
            required
            autoFocus />
          <button 
            type="submit" 
            ref="button"
            className="searchButton">Search on Flickr</button>
        </form>
      </div>
    )
  }
};

export default Search;