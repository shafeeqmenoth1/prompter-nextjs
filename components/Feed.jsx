"use client"
import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data,handleTagClick})=>{
  return (
    <div className='mt-16 prompt_layout'>
     {data.map((post)=>(
       <PromptCard key={post._id} handleTagClick={handleTagClick} post={post}/>
     ))}
    </div>  
  )
}
const Feed = () => {
const [searchText, setSearchText] = useState("")
const [searchResult, setSearchResults] = useState([])
const [searchTimeout,setSearchTimeout] = useState(null)
const [posts, setPosts] = useState([])

const filterPrompts = (searchtext) => {
  const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
  return posts.filter(
    (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
  );
};

  const handleSearchChange = (e)=>{
    clearTimeout(searchTimeout)
      setSearchText(e.target.value)

      setSearchTimeout(
        setTimeout(()=>{
          const searchResult = filterPrompts(e.target.value)
          setSearchResults(searchResult)
        },500)
      )

  }

  const handleTagClick = (tagName)=>{
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName);
    setSearchResults(searchResult);
  }
  useEffect(()=>{
    const fetchPost = async()=>{
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }
    fetchPost()
  },[])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center '>
        <input type="text" placeholder='Serach for a tag or user name'
        value={searchText} onChange={handleSearchChange} required className='search_input peer' />

      </form>
   {searchText? (<PromptCardList 
      data={searchResult}
      handleTagClick={handleTagClick}

    />):
    (<PromptCardList 
      data={posts}
      handleTagClick={handleTagClick}
    />)
    }
    </section>
  )
}

export default Feed