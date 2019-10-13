const clientId = process.env.REACT_APP_CLIENT_ID
const redirectURI = 'http://localhost:3000/';

let accessToken;

let Spotify = {
  getAccessToken() {
    checkClientId()
    //first condition
    if(accessToken){
      return accessToken;
    } 
    // Check access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    //second condition
    if(accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      //this clears the parameters allowing us to grab a new access token when it expires
      window.setTimeout( () => accessToken = '', expiresIn * 1000);
      window.history.pushState( 'Access Token', null, '/' );
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  }, 
  search(query) {
    console.log("Test search in Spotify");
    const accessToken = Spotify.getAccessToken();
    const url = `https://api.spotify.com/v1/search?type=track&q=${query}`;
    const httpOptions = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
    return fetch(url, httpOptions)
      .then(response => {
        if (response.ok) {
          return response.json(); 
        } else {
          console.log('API Request failed');
        }
      })
      .then(jsonResponse => {
        if(!jsonResponse.tracks){
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  }
}

// error handling if no clientId
const checkClientId = () => {
  if(process.env.REACT_APP_CLIENT_ID === undefined) {
    console.error('No Client Id Key\nAdd `REACT_APP_CLIENT_ID=<KEY>` in `.env` file');
    alert('No Client Id Key\nAdd `REACT_APP_CLIENT_ID=<KEY>` in `.env` file');
  }
}

export default Spotify; 