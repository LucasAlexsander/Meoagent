import { useForm } from "react-hook-form";
import styled from "styled-components";
import SearchContext from "context/SearchContext";
import { SearchContextType } from "@/types/SearchContextType";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import SearchResultContext from "context/SearchResultContext";
import { SearchResultContextType } from "@/types/SearchResultContextType";
import { SearchForm } from "@/types/SearchForm";
import LoadingContext from "context/LoadingContext";
import { ModalOpenContextType } from "@/types/ModalOpenContextType";
import locales from "../../locales";

const SearchRealtor = styled.div`
  width: 100%;
  height: auto;
  padding: 0 37px;
  margin-bottom: 60px;
  margin-top: 12rem;

  form {
    background: #e9e9e985;
    max-width: 45%;
    width: fit-content;
    margin: auto;
    height: fit-content;
    margin-top: 20vh;
    backdrop-filter: blur(5px);
    padding: 2rem 3rem;

    h4 {
      font-weight: 600;
      margin-top: 10px;
    }
    .search-row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      /* padding: 2rem 5rem; */
      gap: 2rem;
      width: 100%;

      @media only screen and (max-width: 1190px) {
        flex-direction: column;
        input {
        }
      }
      @media (max-width: 768px) {
        padding: 2rem 0rem;
        gap: 3rem;
      }
    }

    @media only screen and (max-width: 1000px) {
      width: 90%;
      height: 40rem;
      padding: 2rem;
      text-align: center;
      margin-top: 0;
    }
    @media only screen and (max-width: 768px) {
      width: calc(100% - 4rem);
      max-width: 90%;
      height: 136px;
      input {
        border: 1px solid #3a2e2c5a;
      }
      input,
      .searchButton {
        background: #fff;
      }
      .searchButton,
      h4 {
        color: #3a2e2c;
        opacity: 1;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 0 27px;

    .card {
      width: 100%;
      height: 332px;
      padding: 0 27px;
    }
  }
`;

export default function Home() {
  const { register, handleSubmit } = useForm<SearchForm>();

  const [cities, setCities] = useState<Array<string>>();

  const router = useRouter();

  const { locale } = router;

  const t = locales[locale as keyof typeof locales];

  const { setSearch } = useContext(SearchContext) as SearchContextType;
  const { setSearchResult } = useContext(
    SearchResultContext
  ) as SearchResultContextType;

  const { setOpen: setLoadingOpen } = useContext(
    LoadingContext
  ) as ModalOpenContextType;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/city");
      const data = await response.json();
      setCities(data);
    };

    fetchData();
  }, []);

  const onSubmit = async (data: SearchForm) => {
    const fetchData = async () => {
      let url = process.env.NEXT_PUBLIC_API_URL + "/realtor?";
      if (data.search) {
        url += "search=" + data.search;
        setSearch(data.search);
      } else {
        setSearch("");
      }
      const response = await fetch(url, {
        method: "GET",
      });
      const json = await response.json();
      setSearchResult(json);
      router.push("/search-result");
    };
    setLoadingOpen(true);
    await fetchData();
    setLoadingOpen(false);
  };

  return (
    <SearchRealtor>
      <form className="card" onSubmit={handleSubmit(onSubmit)}>
        <div className="search-row">
          <input
            type="text"
            className="input-realtor"
            placeholder={t.home.searchRealtorNamePlaceholder}
            {...register("search")}
          />

          <input
            list="cities"
            type="text"
            className="input-city-cep"
            placeholder={t.home.searchRealtorCityPlaceholder}
            {...register("zipCode")}
          />
          <datalist id="cities">
            {cities?.map((item, index) => (
              <option key={index} value={item} />
            ))}
          </datalist>

          <button className="searchButton">{t.home.searchButton}</button>
        </div>
        <h4>{t.home.welcome}</h4>
      </form>
    </SearchRealtor>
  );
}
