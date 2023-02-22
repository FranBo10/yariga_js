import { useGetIdentity , useOne } from '@pankod/refine-core'
import { Profile } from 'components';
import { Typography } from '@pankod/refine-mui'; 

const MyProfile = () => {

  const { data: user } = useGetIdentity();

  const { data, isLoading, isError } = useOne({
    resource:'users',
    id: user?.userid,
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <Typography>Traitement en cours......</Typography>
  if (isError) return <Typography>Un erreur est survenue...</Typography>

  return (
    <Profile
    type='Mon'
    name={myProfile.name}
    email={myProfile.email} 
    avatar={myProfile.avatar}
    properties={myProfile.allProperties}
    
    />
  )
}

export default MyProfile