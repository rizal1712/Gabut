class NetworkError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NetworkError';
    }
  }
  
  // TODO: 1
  const fetchingUserFromInternet = (isOffline) => {
    return new Promise((resolve,reject)=>{
    setTimeout(() => {
      if (isOffline) {
        reject(new NetworkError('Gagal mendapatkan data dari internet'), null);
      }
      else {
      resolve(null, { name: 'John', age: 18 });}
    }, 500);
});
  };
  
  
  // TODO: 2
  async function gettingUserName  () {
    try{
        const user=await fetchingUserFromInternet(false);
        return user.name;} 
    catch(error) {
        return error.message;}
  };
  gettingUserName();
  
  /**
   * Abaikan kode di bawah ini
   */
  
  module.exports = { fetchingUserFromInternet, gettingUserName, NetworkError };