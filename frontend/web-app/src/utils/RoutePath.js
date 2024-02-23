const host = import.meta.env.VITE_HOST;

export const RoutePath = {
  home: host,
  userDetail: (id) => `${host}user/${id}`,
};
