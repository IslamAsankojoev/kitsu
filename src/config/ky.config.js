import ky from 'ky';

export const kyConfig = {
  prefixUrl: 'https://kitsu.io/api/edge',
  timeout: 5000,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Content-Type', 'application/vnd.api+json');
        request.headers.set('Accept', 'application/vnd.api+json');
      },
    ],
  },
};

export default ky.extend(kyConfig);