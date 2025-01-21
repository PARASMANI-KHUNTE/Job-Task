import { Link } from "react-router-dom"
const Navbar = () => {
  return (
    <>
    <nav className="flex justify-between p-4 bg-white "    >
        <div className="flex gap-3 items-center">
            <img src="catLogo.png" width={20} alt="Logo" />
            <h1>Collector</h1>
        </div>
        <ul className="flex gap-4 ">
            <li><Link className=" hover:text-purple-800    text-purple-600" to="/form">Form</Link></li>
            <li><Link className=" hover:text-purple-800    text-purple-600" to="/admin">Admin</Link></li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar
