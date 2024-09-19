import React,{useEffect, useState} from 'react'
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";
  import img2 from '../assets/images/file.jpg'

import axios from 'axios';

export default function SingleBook() {
    const navigate = useNavigate();
    
    const { id } = useParams();

    //images

    // selected movie data 
    const [BookData, setBookData] = useState( {})
    const [modal, setmodal] = useState(true)
    const [Books, setBooks] = useState([])

    const handleNavigate = (id) => {
        navigate(`/library/book/${id}`)
        window.location.reload()
    }

    //get book data
    async function GetBookData() {
        // setLoading(true)
        setmodal(true)
        try {
            let Intigration= await axios({
                url:`https://openlibrary.org/search.json?q=${id}&fields=subject_key,ratings_average,time,place,first_sentence,edition_count,author_name,key,title,first_publish_year,ratings_average,cover_i,author_key,author_name`,
                method:'get',
                headers:{
                Accept:'application/json'
                }
            })

           
            setBookData(Intigration.data.docs[0])
            await GetApi(Intigration.data.docs[0].author_name[0])
        } catch (error) {
            console.log(error.response.data);
            alert("Error Occured")
        }
    }

    // get books api 
    async function GetApi(author) {
        // setLoading(true)
        try {
        let Intigration= await axios({
            url:`https://openlibrary.org/search.json?author=${author}&sort=new&fields=key,title,first_publish_year,cover_i&limit=20`,
            method:'get',
            headers:{
            Accept:'application/json'
            }
        })

        setBooks(Intigration.data.docs)
        } catch (error) {
            console.log(error.response.data);
            alert("Error Occured")
        }finally{
            setmodal(false)
        }
    }

    useEffect(() => {
        GetBookData()
    }, []);

    
    return (
    <div className='singleMovieBody'>

        {
        modal&&(<div className="modal-overlay" >
        <div className="modal-content" style={{width:'auto'}} onClick={(e) => e.stopPropagation()}>
        <div style={{flex:1, display:'flex', justifyContent:"center", alignItems:'center', height:'100%'}}>
          <div className="loader"></div>
        </div>
        </div>
        </div>)
      }
        
        {/* top tab */}
        <div className='topTab-single'>
            <div style={{width:'100%', height:'300px', position:'absolute', backgroundColor:'black', opacity:0.8,zIndex:0,left:0 }}/>
            {/* left */}
            <div style={{zIndex:2}} className='topLeft-single'>

                
                    <div className='top-topLeft-single'>
                        <button onClick={()=> navigate(-1)}>Back</button>
                        <h3>{BookData?.title}</h3>
                        <span>{BookData?.first_publish_year} . Editions({BookData?.edition_count}) {BookData?.place?`. Place(${BookData?.place[0]})`:''} {BookData?.time?`. ${BookData?.time[0]}`:''}</span>
                    </div>

                    <div className='bottom-topLeft-single'>
                        <h3>First Sentence</h3>
                        <p>{BookData?.first_sentence?`${BookData?.first_sentence[0]}`:''}</p>
                    </div>
            </div>

            {/* right */}
            <div style={{zIndex:2}} className='topRight-single'>
                <img src={`https://covers.openlibrary.org/b/id/${BookData.cover_i}-L.jpg`} />
                <p className='movieFloater'>{((BookData?.ratings_average/5)*100)?.toPrecision(2)}</p>
            </div>
        </div>

        <div className='movieBody'>
            {/* author */}
            <div >
                <h3 style={{fontWeight:400}}>Authors</h3>
                
                <br/>
                {/* list */}
                <ul>
                    
                    {BookData?.author_name?.map((i,index)=>(
                        <li key={index} >

                            <img src={`https://covers.openlibrary.org/a/olid/${BookData.author_key[index]}-M.jpg`} className='authorImg' style={{height:120,borderRadius:'100px'}} />

                            <div className='movieNameContainer' >
                                <h4 style={{height:'auto', lineHeight:'normal', textAlign:'center' }}>{i}</h4>
                            </div>
                            {/* <p className='movieFloater'>90</p> */}

                        </li>
                    ))}
                        
                </ul>
            </div>

            {/* toprated */}
            <div>
                <h3>Authors Books</h3>
                <br/>

                {/* list */}
                <ul >
                    
                    {Books.map(i=>(
                        <li  onClick={()=> handleNavigate(i.title)}  key={i.imdbID}>

                            <img src={`https://covers.openlibrary.org/b/id/${i.cover_i}-L.jpg`} />

                            <div className='movieNameContainer'>
                                <h4>{i?.title?.length>10?`${i.title.slice(0,10)}...`:i.title}</h4>
                                <span>Year: {i?.first_publish_year}</span>
                            </div>
                            {/* <p className='movieFloater'>90</p> */}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}
