import {Link} from 'react-router-dom'
function NoMatch() {
    return( 
      <div>
        <h2>このページは存在しません。</h2>
        <Link to="/">Home</Link>
      </div>
      
      
    );
  }
  
  export default NoMatch;