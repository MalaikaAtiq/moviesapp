import './dashboard.css'
import SideNav from '../../components/nav/sidenav'
const Dashboard = () =>{



  return(
    <div>
        <SideNav />
        <div className="default-dashboard">

          <div className='table-container'>
          <table className='movies-table'>
    <thead>
        <th>Movie id</th>
        <th>Release Date</th>
        <th> Movie Title</th>
        <th> Production Budget</th>
        <th>Domestic Gross</th>
        <th> Worldwide Gross </th>
    </thead>

    <tr>
        <td>65035efb1cde97f944f21d97</td>
        <td>4/23/2019</td>
        <td>Avengers: Endgame</td>
        <td>$400,000,000</td>
        <td>$858,373,000</td>
        <td>$2,797,800,564</td>
    </tr>
    <tr>
        <td>65035efb1cde97f944f21d97</td>
        <td>4/23/2019</td>
        <td>"Pirates of the Caribbean: On Stranger Tides"</td>
        <td>$400,000,000</td>
        <td>$858,373,000</td>
        <td>$2,797,800,564</td>
    </tr>
</table>



          </div>
  



        </div>
      

    </div>
  )
}

export default Dashboard