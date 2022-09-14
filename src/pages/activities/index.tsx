import React from 'react';
import { Activity } from 'src/utils/interface';
import { SimpleGrid } from '@chakra-ui/react';
import { ActivityCard } from '../../components/ActivityCard';
import { getActivities } from 'src/utils/activities';
interface Props {
  activities: Activity[];
}
const Activities = ({ activities }: Props) => {
  return !activities.length ? (
    <div>
      <h1>There are no activities yet! </h1>
    </div>
  ) : (
    <SimpleGrid minChildWidth="330px" spacing={2}>
      {activities.map((a) => (
        <ActivityCard key={a.id} props={a} />
      ))}
    </SimpleGrid>
  );
};

export const getServerSideProps = async () => {
  const activities = await getActivities();
  console.log(activities);
  return {
    props: {
      activities: activities,
    },
  };
};
export default Activities;
