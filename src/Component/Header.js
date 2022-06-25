import {Link} from 'react-router-dom'

function Header(){
    return (
        <div className="bg-blue-900 h-16 px-5 text-white flex">
            <h1 className="text-3xl font-bold py-3 pr-4">BGM Player</h1>
            <div className="text-xl pt-5 px-2"><Link to="/">Home</Link></div>
            <div className="text-xl pt-5 px-2"><Link to="/About">About</Link></div>
        </div>
    
    )
}

export default Header;