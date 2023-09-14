import { Link } from 'react-router-dom'
import logo from '../../assets/images/default-dark.svg'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './sidenav.css'
const SideNav = () =>{
  
  const linkStyles = {
    color: "#5C5C5C",
    textDecoration: "none",
    fontSize: "15px",
    fontFamily: "Trebuchet MS",
    marginLeft: "8px"
  }


  return(
    <div className="side-nav">

        <div className='logo'> 
          <img src={logo} alt=""/>  
        </div>

        <div className='scroll-nav'> 
         <ul> 
          <li> <i class="bi bi-columns-gap"></i> <Link style={linkStyles}> Dashboard</Link></li>
         </ul>
         
         <p className='pages'> Pages </p>
        <ul>
          <li> <i class="bi bi-person-vcard"></i> <Link style={linkStyles}> Account </Link></li>
          <li> <i class="bi bi-person"></i> <Link style={linkStyles}> User Profile </Link></li>
          <li> <i class="bi bi-person-check"></i> <Link style={linkStyles}> Authentication </Link></li>
          <li> <i class="bi bi-building"></i> <Link style={linkStyles}> Corporate </Link></li>

          <li> <i class="bi bi-alexa"></i> <Link style={linkStyles}> Social </Link></li>
          <li> <i class="bi bi-pencil-square"></i>  <Link style={linkStyles}> Blog </Link></li>
          <li> <i class="bi bi-patch-question"></i>  <Link style={linkStyles}> FAQ </Link></li>
          <li> <i class="bi bi-tags"></i> <Link style={linkStyles}> Pricing </Link></li>

          <li> <i class="bi bi-briefcase"></i> <Link style={linkStyles}> Careers </Link></li>
          <li> <i class="bi bi-tools"></i> <Link style={linkStyles}> Utilities </Link></li>
          <li> <i class="bi bi-columns"></i> <Link style={linkStyles}> Widgets </Link></li>
        </ul>

        <p className='pages'> Apps </p>
        <ul>
          <li> <i class="bi bi-kanban"></i> <Link style={linkStyles}> Projects </Link></li>
          <li> <i class="bi bi-cart"></i> <Link style={linkStyles}> Ecommerce </Link></li>
          <li> <i class="bi bi-voicemail"></i> <Link style={linkStyles}> Contacts </Link></li>
          <li> <i class="bi bi-headset"></i> <Link style={linkStyles}> Support Center </Link></li>

          <li> <i class="bi bi-people"></i> <Link style={linkStyles}> User Management </Link></li>
          <li> <i class="bi bi-gem"></i><Link style={linkStyles}> Customers </Link></li>
          <li> <i class="bi bi-bell"></i><Link style={linkStyles}> Subscription </Link></li>
          <li> <i class="bi bi-receipt"></i> <Link style={linkStyles}> Invoice Manager </Link></li>

        </ul>

        <p className='pages'> Layouts </p>
        <ul>
          <li> <i class="bi bi-layout-text-window"></i><Link style={linkStyles}> Layout options </Link></li>
          <li> <i class="bi bi-nut"></i><Link style={linkStyles}> Toolbar </Link></li>
          <li> <i class="bi bi-layout-split"></i><Link style={linkStyles}> Asides </Link></li>
          <li> <i class="bi bi-window-sidebar"></i><Link style={linkStyles}> Layout Builder </Link></li>
        </ul>

        <p className='pages'> Help </p>
        <ul>
          <li> <i class="bi bi-columns"></i><Link style={linkStyles}> Components </Link></li>
          <li> <i class="bi bi-file-earmark"></i><Link style={linkStyles}> Documentation </Link></li>
          <li> <i class="bi bi-list-nested"></i><Link style={linkStyles}> Changelog </Link></li>
        </ul>

        </div>
        <button className='docs-comp'> Docs & Components </button>

        </div>
  )
}

export default SideNav