import { toast } from 'react-toastify';
import NewsCard from 'components/NewsCard/NewsCard';
import Section from 'components/Section';
import SearchForm from 'components/Ui-Kit/SearchForm/SearchForm';
import React, { useEffect, useState } from 'react';
import { CardList, Title, WrapperTitle } from './News.styled';
import { useGetNewsQuery } from '../../redux/api/newsApi';
import TitlePage from 'components/Ui-Kit/TitlePage';
import Loader from 'components/Loader';
import { useIntl } from 'react-intl';

const News = () => {
  const { data: news, error, isLoading } = useGetNewsQuery();
  const [filter, setFilter] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);
  const { formatMessage } = useIntl();

  const searchQuery = news => {
    const newsFilter = news.filter(el =>
      el.title.concat(el.description).toLowerCase().includes(filter)
    );
    if (newsFilter.length === 0) {
      toast.info(formatMessage({ id: 'toastNotFoundNews' }));
    }
    return newsFilter;
  };

  const filterUpdate = e => {
    const value = e.target.value;
    setFilter(value ? value.toLowerCase() : value);
  };

  const handleClean = () => {
    setFilter('');
  };

  useEffect(() => {
    if (news) {
      const visibleNews = searchQuery(news);
      setFilteredNews(visibleNews);
    }
  }, [news, filter]);

  return (
    <Section>
      <WrapperTitle>
        <TitlePage name={formatMessage({ id: 'news' })} />
        <SearchForm onChange={filterUpdate} onSubmit={handleClean} />
      </WrapperTitle>
      {isLoading && <Loader />}
      {error && <div>{error.message}</div>}
      <CardList>
        {filteredNews &&
          filteredNews.map(item => (
            <NewsCard
              key={item._id}
              title={item.title}
              url={item.url}
              description={item.description}
              date={item.date}
            />
          ))}
      </CardList>
    </Section>
  );
};

export default News;
