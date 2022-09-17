export const getUserDetail = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  const profileDetail = await res.json();
  return profileDetail;
};
