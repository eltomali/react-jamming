const clientId = process.env.ClientId;
const redirectURI = 'http://localhost:3000/';
const accessToken;
Spotify = {
  getAccessToken() {
    //first condition
    if(accessToken){
      return accessToken;
    } 
    // Check access token match
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
    //second condition
    if(accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expires_in = Number(expiresInMatch[1]);
      //this clears the parameters allowing us to grab a new access token when it expires
      window.setTimeout( () => accessToken = '', expiresIn * 1000);
      window.history.pushState( 'Access Token', null, '/' );
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${clientSecret}`;
      window.location = accessUrl;
    }
    
}

export default Spotify; 