import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner.js";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) =>{

 const[articles, setArticles] = useState([0]);
 const[loading, setloading] = useState(true);
 const [page, setPage] = useState(1)
 const [TotalResults, setTotalResults] = useState(0)
//  document.title = `${this.capitalizeFirstLetter(
//   props.category
// )}- NewsMonkey`;
 const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  

  const updateNews = async() =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b63de4d9b16d41b6afdea90aa00097b4&page=${page}pageSize=${props.pageSize}`;
    setloading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setloading(false)
    
    props.setProgress(100);
  }
    
  useEffect(() => {
   
    updateNews();
     document.title = `${capitalizeFirstLetter(
  props.category
)}- NewsMonkey`;
    // eslint-disable-next-line
  }, []) 
  
  
    // console.log("cdm");
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b63de4d9b16d41b6afdea90aa00097b4&page=1&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);
    // this.setState({articles : parsedData.articles,
    // totalResults: parsedData.totalResults,
    // loading:false
    //  });
    

  const handlePrevClick = async () => {
    console.log("Previous");

    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b63de4d9b16d41b6afdea90aa00097b4&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);

    // this.setState({
    //   page:this.state.page-1,
    //   articles : parsedData.articles,
    //   loading:false
    // })
    setPage(page-1)
    updateNews();
  };

  const handleNextClick = async () => {
    console.log("Next");
    // if(!(this.state.page + 1> Math.ceil(this.state.totalResults/props.pageSize))){

    // }

    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b63de4d9b16d41b6afdea90aa00097b4&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()

    // this.setState({
    //   page: this.state.page+1,
    //   articles : parsedData.articles,
    //   loading: false
    // })
    setPage(page+1)
    updateNews();
  };

  const fetchMoreData = async() => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b63de4d9b16d41b6afdea90aa00097b4&page=${page+1}pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
   setArticles(articles.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)
  }
  
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px 0px" , marginTop: '90px'}}>
          NewsMonkey - The Top {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== TotalResults}
          loader={<Spinner/>}
          
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    
                  />
                </div>
              
              );
            })}
          </div>
          </div>
      </InfiniteScroll>
        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            class="btn btn-dark"
            onClick={handlePrevClick}
          >
            {" "}
            &larr; Previous
          </button>
          <button
            disabled={
              page+ 1 >
              Math.ceil(TotalResults / props.pageSize)
            }
            type="button"
            class="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </>
    );
  }


 News.contextTypedefaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

 News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
