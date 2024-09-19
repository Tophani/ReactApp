import axios from 'axios'
import React,{useEffect, useState} from 'react'
import '../styles/modal.css'
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function BookList() {
  const navigate = useNavigate();


  const [modal, setModal] = useState(true)
  
  const [genre, setGenre] = useState('')

  const [Loading, setLoading] = useState(false)

  const [books, setBooks] = useState([])

  const [FilteredBooks, setFilteredBooks] = useState([])

  const [SearchInput, setSearchInput] = useState('')
  
  const [searchBy, setSearchBy] = useState('Title')
  
  function switchSearcBy() {
    setSearchBy(searchBy=='Title'?"Author":"Title")
  }

  // get books api 
  async function GetApi(genre) {
    setLoading(true)
    try {
      let Intigration= await axios({
        url:`https://openlibrary.org/search.json?q=${genre?genre:"action"}&fields=author_name,key,title,first_publish_year,ratings_average,cover_i`,
        method:'get',
        headers:{
          Accept:'application/json'
        }
      })

      setBooks(Intigration.data.docs)
      setFilteredBooks(Intigration.data.docs)
    } catch (error) {
      console.log(error);
      alert("Error Occured")
    }finally{setLoading(false)}
  }

  //run api
  useEffect(() => {

    if (genre.length>1)setModal(false)
    
    GetApi(genre)
  }, [genre]);

  useEffect(() => {
    
    let filter= searchBy=='Title'?(
      books.filter(i=>((i.title).toLowerCase()).includes(SearchInput?.toLowerCase()))
    ):(
      books.filter(i => {
        let authorSearch = false;
      
        if (i.author_name) {
          i.author_name.forEach(x => {
            if (x.toLowerCase().includes(SearchInput?.toLowerCase())) {
              authorSearch = true;
            }
          });
        }
      
        return authorSearch;
      })
    )

    setFilteredBooks(filter)
  }, [SearchInput,searchBy, books]);

  return (
    <div className='bookContainer'>

      {/* genre modal */}
      {
        modal&&(<div className="modal-overlay" onClick={()=>setModal(false)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={()=>setModal(false)}>×</button>
          <div>
            <u><h3 style={{textAlign:'center',color:'white', }}>Select genre</h3></u>
            <br/>
            <select onChange={(e)=>setGenre(e.target.value)} style={{textAlign:'center',backgroundColor:'black',color:'white', width:'100%', borderRadius:5}}>
              <option value="">Select Genre</option>
              <option value="fiction">Fiction</option>
              <option value="mystery">Mystery</option>
              <option value="fantasy">Fantasy</option>
              <option value="science-fiction">Science Fiction</option>
              <option value="biography">Biography</option>
              <option value="non-fiction">Non-Fiction</option>
              <option value="historical">Historical</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="self-help">Self-Help</option>
              <option value="children">Children's</option>
              <option value="young-adult">Young Adult</option>
              <option value="poetry">Poetry</option>
              <option value="horror">Horror</option>
              <option value="graphic-novel">Graphic Novel</option>
              <option value="drama">Drama</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>

            </select>
          </div>
        </div>
        </div>)
      }


      <h1 style={{color:'white'}}>Book Collection</h1>
      {/* input search */}
      <div className='SearchSectionLibrary'>
        <input type='search' onChange={(e)=>setSearchInput(e.target.value)} placeholder={`Search by ${searchBy}..`} />
        
        <div className='searchOptionDiv'>
          <button onClick={()=>setModal(true)}>
            Search genre
          </button>
          <button value={genre} onClick={switchSearcBy}>
            Search {searchBy=='Title'?"Author":"Title"}
          </button>
        </div>
      </div>

      <div className='hr'/>
    
      {/* items */}
      {Loading?(
        <div style={{flex:1, display:'flex', justifyContent:"center", alignItems:'center', height:'100%'}}>
          <div className="loader"></div>
        </div>
      ):(
        FilteredBooks.length<1?(
          <div style={{flex:1, display:'flex', justifyContent:"center", alignItems:'center'}}>
            <h4 style={{color:'white'}}>No search result found</h4>
          </div>
        ):(
          <>
            <ul className='LibraryListStyle'>
            {FilteredBooks.map(i=>(
              
                <li onClick={()=>navigate(`/library/book/${i.title}`)}>
                  <img src={`https://covers.openlibrary.org/b/id/${i.cover_i}-L.jpg`} />
                  <div>
                    <h3>{i.title.length>18?`${i.title.slice(0,18)}...`:i.title}</h3>
                    <span>{i.first_publish_year} . {i.ratings_average?.toPrecision(2)} <span style={{color:'gold'}}>&#9733;</span> {
                      i?.author_name.map((i,index)=>`${index!=0?", ":""}${i}`)
                    }</span>
                  </div>
                </li>
              
            ))}
            </ul>
            <h5 style={{color:'white', textAlign:'center'}}>End of Result</h5>
          </>
        )
      )}
      

        


    </div>
  )
}
