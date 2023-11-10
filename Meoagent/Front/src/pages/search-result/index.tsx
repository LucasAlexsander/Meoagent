import { SearchResultContextType } from "@/types/SearchResultContextType"
import SearchContext from "context/SearchResultContext"
import { useContext } from "react"
import styled from "styled-components"
import Pagination from "components/Pagination"
import Link from "next/link"
import MainInfo from "components/MainInfo"
import { useEffect } from 'react';

const Container = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* transform: translateY(-15px); */

  .list{
    height: 80%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 4rem;
    gap: 2rem;

    &:last-child {
      margin-bottom: 390px;
    }
    .pagination {
      margin: 0 auto;
      @media (max-width: 768px) {
        padding-bottom: 30px; 
      }
    }
    a{
      width: 90%;
      .card{
        height: 100%;
        width: 100%;
        padding: 2rem;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }

  @media (max-width: 900px) {
    .list {
      padding: 0;
      align-items: center;
    }
  }
  @media (max-width: 768px) {
   font-size: 1.6rem;
   position: relative;

   .list {
    padding: 0 38px; 

    a {
        width: 100%;
      }
   }
  }
`

export default function SearchResult(){

  const { searchResult } = useContext(SearchContext) as SearchResultContextType

  return (
    <Container>

      <div className="list">
        {searchResult.list.map(item => (
          <Link href={'/profile/realtor/' + item.id} key={item.id }>
            <MainInfo lastExp={{
              name: item.agencyName,
              pic: item.agencyPic
            }} isRealtor={true} userSigned={item} isProfile={false} pdfPage={false}/>
          </Link>
        ))}
        <div className="pagination">
          <Pagination currentPage={searchResult.currentPage} totalOfPages={searchResult.totalOfPages}/>
        </div>
      </div>
    </Container>
  )
}