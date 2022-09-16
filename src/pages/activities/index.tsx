import React, { useState } from 'react';
import { Activity } from 'src/utils/interface';
import { SimpleGrid } from '@chakra-ui/react';
import { ActivityCard } from '../../components/ActivityCard';
import { getActivities } from 'src/utils/activities';
import { useQuery, dehydrate, QueryClient } from 'react-query';
import { ActivityFilters } from '../../components/ActivityFilters';
import Layout from 'src/components/layout/Layout';
interface Props {
  activities: Activity[];
}
const Activities = ({ activities }: Props) => {
  const [city, setCity] = useState<string>(undefined);
  const [name, setName] = useState<string>(undefined);
  const [maxPrice, setMaxPrice] = useState<number>(undefined);
  const [sort, setSort] = useState<string>('desc');
  const [sortBy, setSortBy] = useState<string>('name');
  const [input, setInput] = useState<string>(undefined);
  const { data } = useQuery(
    ['activities', city, name, maxPrice, sort, sortBy], //dependencies: React is going to re-render when one of these changes
    () => getActivities(city, name, maxPrice, sort, sortBy)
  );
  const cities = activities.map((a) => a.city.name);
  const citiesUnique: string[] = Array.from(new Set(cities)).sort(); // remove duplicates, sort alphabetically
  if (city === 'All Cities') setCity(undefined);
  if (sort === 'Sort Order') setSort('desc');
  if (sortBy === 'Sort By') setSortBy('name');
  const handleCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleMaxPrice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMaxPrice(parseInt(input));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return !data ? (
    <div>
      <Layout>
        <h1>There are no activities yet! </h1>
      </Layout>
    </div>
  ) : (
    <div>
      <Layout>
        <ActivityFilters
          city={city}
          handleCity={handleCity}
          handleInput={handleInput}
          sort={sort}
          handleSort={handleSort}
          sortBy={sortBy}
          handleSortBy={handleSortBy}
          maxPrice={maxPrice}
          handleMaxPrice={handleMaxPrice}
          setMaxPrice={setMaxPrice}
          citiesUnique={citiesUnique}
          input={input}
          setInput={setInput}
        />
        <SimpleGrid minChildWidth="330px" spacing={2}>
          {data.map((a: Activity) => (
            <ActivityCard key={a.id} props={a} />
          ))}
        </SimpleGrid>
      </Layout>
    </div>
  );
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient(); //https://tanstack.com/query/v4/docs/guides/ssr

  await queryClient.prefetchQuery(['activities'], await getActivities());
  const activities = await getActivities();
  return {
    props: {
      activities: activities,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
export default Activities;
