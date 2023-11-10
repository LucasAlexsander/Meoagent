import { SearchContextType } from '@/types/SearchContextType';
import { SearchResultContextType } from '@/types/SearchResultContextType';
import { UserCard } from '@/types/UserCard';
import SearchContext from 'context/SearchContext';
import SearchResultContext from 'context/SearchResultContext';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  gap: 2rem;
  margin: auto;

  p{
    cursor: pointer;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    font-weight: bold;
    user-select: none;
  }

  .current-page{
    color: var(--base);
    background-color: var(--surface-2);
  }

  .prev{
    transform: rotate(180deg);
  }
`

type PaginationProps = {
  currentPage: number
  totalOfPages: number
}

const Pagination = ({ currentPage, totalOfPages}: PaginationProps) => {

  const list = []
  for(let i = 0; i < totalOfPages; i++){
    list.push(i + 1)
  }

  const router = useRouter()

  const { search } = useContext(SearchContext) as SearchContextType
  const { setSearchResult } = useContext(SearchResultContext) as SearchResultContextType

  const fetchData = async (page:number) => {
    let url = process.env.NEXT_PUBLIC_API_URL + '/realtor?'
    if(search) url += 'search=' + search
    if(page) url += '&page=' + page
    const response = await fetch(url, {
      method:'GET'
    })
    const json = await response.json()
    setSearchResult({
      list: json.list,
      currentPage: json.currentPage,
      totalOfPages: json.totalOfPages
    })
    router.push('/search-result')
  }
  const handlePageClick = async (e:React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    const page = Number(target.innerHTML)
    await fetchData(page)
  }

  const handlePrevClick = async () => {
    if(currentPage - 1 > 1) return
    const page = currentPage - 1
    await fetchData(page)
  }

  const handleNextClick = async () => {
    if(currentPage + 1 > totalOfPages) return
    const page = currentPage + 1
    await fetchData(page)
  }

  return (
    <Container className='card'>

      <p onClick={() => handlePrevClick()} className='prev'> ➤ </p>

      {
        list.map((item) => (
          <p onClick={(e) => handlePageClick(e)} className={item === currentPage ? 'current-page' : ''} key={item}>{item}</p>
        ))
      }

      <p onClick={() => handleNextClick()}> ➤ </p>
    </Container>
  );
};

export default Pagination;